//@flow strict
import type {
  XChartsConstructorArgument,
  ComponentClass,
  ComponentInstance,
} from './types.js';
import {
  validate as validateXChartsAddMethodArgumentOnXChartsLevel,
  getDictionary as getValidationDictionaryOnXChartsLevel,
} from './validation/add-method-arg.js';
import {
  validate as validateConstructorArgument,
  getDictionary as getValidationDictionaryForContructorArgument,
} from './validation/constructor-arg.js';

const componentsRegistry: Map<string, ComponentClass> = new Map();

export function registerComponent(componentClass: ComponentClass): void {
  componentsRegistry.set(componentClass._type, componentClass);
}

export default class XCharts {
  _shadowRoot: ShadowRoot
  _containerDiv: HTMLDivElement
  _componentsContainer: HTMLDivElement

  constructor(arg: mixed) {
    const that = this;
    //The idea is to store it now, although we are not sure if it's an
    //HTMLDivElement or not. Then we do validation, if it's not an error will be
    //thrown and shown (attempted) to the user. In the _attemptToShowError() we
    //check if it's a div or not. Looks acceptable.
    //$FlowFixMe[incompatible-use]
    this._containerDiv = arg.containerDiv;
    const constructorArgValidated = doValidation([...arguments]);
    initDom();

    function initDom(): void {
      that._shadowRoot = that._containerDiv
        .attachShadow({ mode: 'open', });
      const coverCanvasHtml = getCoverCanvasHtml();
      that._shadowRoot.innerHTML = `
        <div style="
          background-color: ${
            constructorArgValidated.options.backgroundColor };
          width: 100%;
          height: 100%;
          position: relative;
        ">
          ${ coverCanvasHtml }
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

      function getCoverCanvasHtml() {
        if (constructorArgValidated.options.isComponentInspectMode) {
          return '';
        }
        return `
          <canvas style="
            position: absolute;
            z-index: 1;
            width: 100%;
            height: 100%;
          "></canvas>
        `;
      }
    }

    function doValidation(constructorArguments: Array<mixed>):
      XChartsConstructorArgument {
      const dict = getValidationDictionaryForContructorArgument(HTMLDivElement);
      const errorMsg = validateConstructorArgument(dict, constructorArguments);
      if (errorMsg) {
        that._attemptToShowError(errorMsg);
        throw new Error(errorMsg);
      }
      //After the validation we should be sure it's guaranteed to be
      //XChartsConstructorArgument
      //$FlowFixMe[incompatible-cast]
      return arg as XChartsConstructorArgument;
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
        that._attemptToShowError(msg);
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
        .validateXChartsAddMethodArgument(
          //Despite the argTypeVerified is guaranteed at that point to have
          //props like: type, zIndex, I WANT to ignore them and treat the value
          //as the cast to value.
          //$FlowFixMe[incompatible-cast]
          argTypeVerified as { [string]: mixed, });
      if (invalidArgumentErrorMsg) {
        that._attemptToShowError(invalidArgumentErrorMsg);
        throw new Error(invalidArgumentErrorMsg);
      }
    }

    function doXChartsLevelArgumentValidation(addComponentArgs: Array<mixed>) {
      const dict = getValidationDictionaryOnXChartsLevel();
      const errorMsg =
        validateXChartsAddMethodArgumentOnXChartsLevel(dict, addComponentArgs);
      if (errorMsg) {
        that._attemptToShowError(errorMsg);
        throw new Error(errorMsg);
      }
    }
  }

  _attemptToShowError(msg: string) {
    const el = this._componentsContainer || this._containerDiv;
    if (el instanceof HTMLDivElement) {
      el.style.color = 'red';
      el.style.backgroundColor = 'white';
      el.style.fontSize = '2em';
      el.innerText = msg;
    }
  }
}
