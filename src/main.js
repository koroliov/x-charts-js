//@flow strict
import type { XChartsConfig } from './types.js';

export default class XCharts {
  _shadowRoot: ShadowRoot
  _componentsContainer: HTMLDivElement
  _config: XChartsConfig

  constructor(config: XChartsConfig) {
    this._config = config;
    this._initDom();
  }

  _initDom(): void {
    this._shadowRoot = this._config.containerDiv
        .attachShadow({ mode: 'open', });
    this._shadowRoot.innerHTML = `
      <div style="
        background-color: ${ this._config.options.backgroundColor };
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
    const componentsContainer = this._shadowRoot
        .getElementById('x-charts--components-container');
    if (!(componentsContainer instanceof HTMLDivElement)) {
      throw new Error('Internal XCharts error');
    }
    this._componentsContainer = componentsContainer;
  }
}
