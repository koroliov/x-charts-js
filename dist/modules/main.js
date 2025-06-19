//      strict
             
                             
                 
                    
                       
                    
import {
  validate as validateAddComponentArgumentOnXChartsLevel,
} from './add-component-argument-validator.js';

const componentsRegistry                              = new Map();

export function registerComponent(componentClass                )       {
  componentsRegistry.set(componentClass._type, componentClass);
}

export default class XCharts {
  _shadowRoot            
  _componentsContainer                
  _constructorArgument                            

  constructor(arg                            ) {
    Object.freeze(arg.options);
    Object.freeze(arg);
    this._constructorArgument = arg;
    const that = this;
    initDom();

    function initDom()       {
      that._shadowRoot = that._constructorArgument.containerDiv
          .attachShadow({ mode: 'open', });
      that._shadowRoot.innerHTML = `
        <div style="
          background-color: ${
            that._constructorArgument.options.backgroundColor };
          width: 100%;
          height: 100%;
          position: relative;
        ">
          <canvas style="
            position: absolute;
            z-index: 1;
            width: 100%;
            height: 100%;
          "></canvas>
          <div style="
            width: 100%;
            height: 100%;
            position: relative;
            z-index: 0;
          " id="x-charts--components-container"></div>
        </div>
      `;
      const componentsContainer = that._shadowRoot
          .getElementById('x-charts--components-container');
      if (!(componentsContainer instanceof HTMLDivElement)) {
        throw new Error([
          'ERR_X_CHARTS_INTERNAL:',
          'Internal Flow required XCharts error',
        ].join('\n'));
      }
      that._componentsContainer = componentsContainer;
    }
  }

  add(argProvided       )                    {
    const that = this;
    const componentPropsToCheck =
      doXChartsLevelArgumentValidation([...arguments]);
    //At this point we should be sure that it has necessary properties, so no
    //need to have many suppressions below, just have 1 suppressed cast.
    //$FlowFixMe[incompatible-type]
    const argTypeVerified                       = argProvided;
    const componentClass = getComponentClass();
    doComponentLevelArgumentValidation();
    const container = createContainer();
    //At this point is should be of type expected by the component's class
    //$FlowFixMe[invalid-constructor]
    return new componentClass(argTypeVerified, container);

    function getComponentClass()                 {
      const componentClass = componentsRegistry.get(argTypeVerified.type);
      if (!componentClass) {
        const msg = getNoRegisteredComponentErrorMsg();
        that._showError(msg);
        throw new Error(msg);
      }
      return componentClass;
    }

    function getNoRegisteredComponentErrorMsg() {
      return [
        'ERR_X_CHARTS_COMPONENT_NOT_REGISTERED:',
        `Component of type '${ argTypeVerified.type
          }' has not been registered,`,
        `registered components are:`,
        Array.from(componentsRegistry.keys()).join(),
      ].join('\n');
    }

    function createContainer() {
      const container = document.createElement('div');
      container.setAttribute('class', `${ argTypeVerified.type }--container`);
      container.style.zIndex = argTypeVerified.zIndex;
      container.style.position = 'absolute';
      container.style.width = '100%';
      container.style.height = '100%';
      that._componentsContainer.appendChild(container);
      return container;
    }

    function doComponentLevelArgumentValidation() {
      const invalidArgumentErrorMsg = componentClass
        .validateAddComponentArgument(componentPropsToCheck, argTypeVerified);
      if (invalidArgumentErrorMsg) {
        that._showError(invalidArgumentErrorMsg);
        throw new Error(invalidArgumentErrorMsg);
      }
    }

    function doXChartsLevelArgumentValidation(addComponentArgs              ) {
      const { errorMsg, propsToCheck, } =
        validateAddComponentArgumentOnXChartsLevel(addComponentArgs);
      if (errorMsg) {
        that._showError(errorMsg);
        throw new Error(errorMsg);
      }
      return propsToCheck;
    }
  }

  _showError(msg        ) {
    this._componentsContainer.innerHTML =
      `<div style="color: red; font-size: 2em;">${ msg }</div>`;
  }
}
