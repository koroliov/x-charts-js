//      strict
             
                             
                 
                    
                       
                    

const componentsRegistry                              = new Map();

export function registerComponent(
  componentType        ,
  componentClass                ,
)       {
  if (componentsRegistry.has(componentType)) {
    throw new Error([
      `ERR_X_CHARTS_COMPONENT_REGISTERED:`,
      `Component of componentType ${ componentType
        } has been already registered`,
    ].join('\n'));
  }
  componentsRegistry.set(componentType, componentClass);
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

  add(arg                      )                    {
    const ComponentClass = componentsRegistry.get(arg.type);
    if (!ComponentClass) {
      const msg = getNoRegisteredComponentErrorMsg();
      this._showError(msg);
      throw new Error(msg);
    }
    const that = this;
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
  }

  _showError(msg        ) {
    this._componentsContainer.innerHTML =
      `<div style="color: red; font-size: 2em;">${ msg }</div>`;
  }
}
