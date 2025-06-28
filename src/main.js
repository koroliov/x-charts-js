//@flow strict
import type {
  XChartsConstructorArgument,
  ComponentClass,
  ComponentInstance,
  AddComponentArgument,
} from './types.js';
import {
  validate as validateAddComponentArgumentOnXChartsLevel,
  getDictionary as getValidationDictionaryOnXChartsLevel,
} from './validation/add-method-arg.js';

const componentsRegistry: Map<string, ComponentClass> = new Map();

export function registerComponent(componentClass: ComponentClass): void {
  componentsRegistry.set(componentClass._type, componentClass);
}

export default class XCharts {
  _shadowRoot: ShadowRoot
  _componentsContainer: HTMLDivElement
  _constructorArgument: XChartsConstructorArgument

  constructor(arg: XChartsConstructorArgument) {
    this._constructorArgument = arg;
    const that = this;
    initDom();

    function initDom(): void {
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

  add(argProvided: mixed): ComponentInstance {
    const that = this;
    doXChartsLevelArgumentValidation([...arguments]);
    const argTypeVerified: { type: string, zIndex: string, [string]: mixed, } =
      //At this point the type and zIndex properties are supposed to be valid
      //$FlowFixMe[incompatible-type]
      argProvided;
    const componentClass = getComponentClass();
    doComponentLevelArgumentValidation();
    const container = createContainer();
    //At this point is should be of type expected by the component's class
    //$FlowFixMe[invalid-constructor]
    return new componentClass(argTypeVerified, container);

    function getComponentClass(): ComponentClass {
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
        .validateAddComponentArgument(
          //Despite the argTypeVerified is guaranteed at that point to have
          //props like: type, zIndex, I WANT to ignore them and treat the value
          //as the cast to value.
          //$FlowFixMe[incompatible-cast]
          argTypeVerified as { [string]: mixed, });
      if (invalidArgumentErrorMsg) {
        that._showError(invalidArgumentErrorMsg);
        throw new Error(invalidArgumentErrorMsg);
      }
    }

    function doXChartsLevelArgumentValidation(addComponentArgs: Array<mixed>) {
      const dict = getValidationDictionaryOnXChartsLevel();
      const errorMsg =
        validateAddComponentArgumentOnXChartsLevel(dict, addComponentArgs);
      if (errorMsg) {
        that._showError(errorMsg);
        throw new Error(errorMsg);
      }
    }
  }

  _showError(msg: string) {
    this._componentsContainer.innerHTML =
      `<div style="color: red; font-size: 2em;"></div>`;
    //It must exist, b/c we set it on the previous line
    //$FlowFixMe[incompatible-use]
    this._componentsContainer.querySelector('div').innerText = msg;
  }
}
