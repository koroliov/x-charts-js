//@flow strict
import type { XChartsJsConstructorArgument, ComponentClass, ComponentInstance, }
  from '../types.js';
import { process as processAddMethodArg, }
  from './process-external-values/add-method-arg.js';
import { process as processConstructorArg, }
  from './process-external-values/constructor-arg.js';

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
    const constructorArgValidated = doArgumentProcessing([...arguments]);
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
          " id="x-charts-js--components-container"></div>
        </div>
      `;
      const componentsContainer = that._shadowRoot
          .getElementById('x-charts-js--components-container');
      if (!(componentsContainer instanceof HTMLDivElement)) {
        throw new Error([
          'ERR_X_CHARTS_JS_INTERNAL:',
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

    function doArgumentProcessing(constructorArguments: Array<mixed>):
        XChartsJsConstructorArgument {
      const { validationErrorMessage: e, valueToUse, } =
        processConstructorArg(constructorArguments, HTMLDivElement);
      if (e) {
        throw new Error(e);
      }
      return valueToUse;
    }
  }

  add(argProvided: mixed): ComponentInstance {
    const that = this;
    const valueToUseOnMainLevel =
      doMainLevelArgumentProcessing(Array.from(arguments));
    const componentClass: ComponentClass =
      //Here it's validated and we are sure that the component has been
      //registered
      //$FlowFixMe[incompatible-type]
      componentsRegistry.get(valueToUseOnMainLevel.type);
    const argTypeVerified: { type: string, zIndex: string, [string]: mixed, } =
      //At this point the type and zIndex properties are supposed to be valid
      //$FlowFixMe[incompatible-type]
      argProvided;
    doComponentLevelArgumentValidation();
    const container = createContainer();
    //At this point it should be a component class
    //$FlowFixMe[invalid-constructor]
    return new componentClass(argTypeVerified, container);

    function createContainer() {
      const container = document.createElement('div');
      container.setAttribute('class', `${ valueToUseOnMainLevel.type
        }--container`);
      container.style.zIndex = valueToUseOnMainLevel.zIndex;
      container.style.position = 'absolute';
      container.style.width = '100%';
      container.style.height = '100%';
      that._componentsContainer.appendChild(container);
      return container;
    }

    function doComponentLevelArgumentValidation() {
      const invalidArgumentErrorMsg = componentClass
        .validateAddMethodArgument(
          //Despite the argTypeVerified is guaranteed at that point to have
          //props like: type, zIndex, I WANT to ignore them and treat the value
          //as the cast to value.
          //$FlowFixMe[incompatible-type]
          argTypeVerified as { [string]: mixed, });
      if (invalidArgumentErrorMsg) {
        that._attemptToShowError(invalidArgumentErrorMsg);
        throw new Error(invalidArgumentErrorMsg);
      }
    }

    function doMainLevelArgumentProcessing(addMethodArgs: Array<mixed>) {
      const registeredTypes = new Set(componentsRegistry.keys());
      const { validationErrorMessage: e, valueToUse, } =
        processAddMethodArg(addMethodArgs, registeredTypes);
      if (e) {
        that._attemptToShowError(e);
        throw new Error(e);
      }
      return valueToUse;
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
