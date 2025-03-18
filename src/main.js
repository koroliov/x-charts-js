//@flow strict
import type {
  XChartsConfig,
  Component,
  AddComponentConfig,
} from './types.js';

const componentsRegistry: Map<string, Class<Component>> = new Map();

export function registerComponent(
  componentType: string,
  componentClass: Class<Component>
): void {
  if (componentsRegistry.has(componentType)) {
    throw new Error(`Component of componentType ${ componentType
        } has been already registered`);
  }
  componentsRegistry.set(componentType, componentClass);
}

export default class XCharts {
  _shadowRoot: ShadowRoot
  _componentsContainer: HTMLDivElement
  _config: XChartsConfig

  constructor(config: XChartsConfig) {
    Object.freeze(config.options);
    Object.freeze(config);
    this._config = config;
    const that = this;
    initDom();

    function initDom(): void {
      that._shadowRoot = that._config.containerDiv
          .attachShadow({ mode: 'open', });
      that._shadowRoot.innerHTML = `
        <div style="
          background-color: ${ that._config.options.backgroundColor };
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
        throw new Error('Internal XCharts error');
      }
      that._componentsContainer = componentsContainer;
    }
  }

  add(config: AddComponentConfig): Component {
    freezeConfig();
    const ComponentClass = componentsRegistry.get(config.type);
    if (!ComponentClass) {
      throw new Error(getNoRegisteredComponentErrorMsg());
    }
    const that = this;
    const container = createContainer();

    //$FlowExpectedError[prop-missing]
    return new ComponentClass(config, container);

    function getNoRegisteredComponentErrorMsg() {
      return [
        `Component of type ${ config.type } has not been registered,`,
        `registered components are:`,
        Array.from(componentsRegistry.keys()).join(),
      ].join('\n');
    }

    function freezeConfig() {
      Object.freeze(config);
      Object.freeze(config.options);
      Object.freeze(config.data);
    }

    function createContainer() {
      const container = document.createElement('div');
      container.setAttribute('class', `${ config.type }--container`);
      container.style.zIndex = config.zIndex;
      container.style.position = 'absolute';
      container.style.width = '100%';
      container.style.height = '100%';
      that._componentsContainer.appendChild(container);
      return container;
    }
  }
}
