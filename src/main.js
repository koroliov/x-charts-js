//@flow strict
import type {
  XChartsConstructorArgument,
  ComponentClass,
  ComponentInstance,
  AddComponentArgument,
} from './types.js';

const componentsRegistry: Map<string, ComponentClass> = new Map();

export function registerComponent(ComponentClass: ComponentClass): void {
  componentsRegistry.set(ComponentClass._type, ComponentClass);
}

export default class XCharts {
  _shadowRoot: ShadowRoot
  _componentsContainer: HTMLDivElement
  _constructorArgument: XChartsConstructorArgument

  constructor(arg: XChartsConstructorArgument) {
    Object.freeze(arg.options);
    Object.freeze(arg);
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

  add(arg: AddComponentArgument): ComponentInstance {
    const that = this;
    checkArgumentIsObject();
    checkComponentType();
    const ComponentClass = componentsRegistry.get(arg.type);
    if (!ComponentClass) {
      const msg = getNoRegisteredComponentErrorMsg();
      this._showError(msg);
      throw new Error(msg);
    }
    const invalidArgumentErrorMsg =
      ComponentClass.validateAddComponentArgument(arg);
    if (invalidArgumentErrorMsg) {
      this._showError(invalidArgumentErrorMsg);
      throw new Error(invalidArgumentErrorMsg);
    }
    const container = createContainer();

    //$FlowFixMe[invalid-constructor] See commit message
    return new ComponentClass(arg, container);

    function getNoRegisteredComponentErrorMsg() {
      return [
        'ERR_X_CHARTS_COMPONENT_NOT_REGISTERED:',
        `Component of type ${ arg.type } has not been registered,`,
        `registered components are:`,
        Array.from(componentsRegistry.keys()).join(),
      ].join('\n');
    }

    function createContainer() {
      const container = document.createElement('div');
      container.setAttribute('class', `${ arg.type }--container`);
      container.style.zIndex = arg.zIndex;
      container.style.position = 'absolute';
      container.style.width = '100%';
      container.style.height = '100%';
      that._componentsContainer.appendChild(container);
      return container;
    }

    function checkArgumentIsObject() {
      if (arg === undefined || arg === null) {
        handleError();
      }
      const p = Object.getPrototypeOf(arg);
      if (p !== null && p !== Object.getPrototypeOf({})) {
        handleError();
      }

      function handleError() {
        const msg = [
          'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
          `Must be an instance of Object`,
          `Provided ${ typeof arg }`,
        ].join('\n');
        that._showError(msg);
        throw new Error(msg);
      }
    }

    function checkComponentType() {
      if (arg.hasOwnProperty) {
        if (!arg.hasOwnProperty('type')) {
          handleErrorTypeMissing();
        }
      } else if (!('type' in arg)) {
        handleErrorTypeMissing();
      }
      if (!arg.type || typeof arg.type !== 'string') {
        handleErrorTypeInvalid();
      }

      function handleErrorTypeMissing() {
        const msg = [
          'ERR_X_CHARTS_MISSING_COMPONENT_TYPE_ON_ADD:',
          `Property .type is missing on the provided argument`,
          'to the .add() method (JSON stringified):',
          JSON.stringify(arg, null, 2),
        ].join('\n')
        that._showError(msg);
        throw new Error(msg);
      }

      function handleErrorTypeInvalid() {
        const msg = [
          'ERR_X_CHARTS_INVALID_COMPONENT_TYPE_ON_ADD:',
          `.type must be a non-empty string`,
          `Provided ${ typeof arg.type } ${ arg.type } in argument`,
          'to the .add() method (JSON stringified):',
          JSON.stringify(arg, null, 2),
        ].join('\n');
        that._showError(msg);
        throw new Error(msg);
      }
    }
  }

  _showError(msg: string) {
    this._componentsContainer.innerHTML =
      `<div style="color: red; font-size: 2em;">${ msg }</div>`;
  }
}
