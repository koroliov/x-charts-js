//@flow strict
import type {
  ComponentInstance,
} from '../../types.js';
import XCharts, { registerComponent, } from '../../main.js';
import type { AddMethodArgumentLegend, } from './types.js';
import * as AddMethodArgumentValidator from './validation/add-method-arg.js';

class Legend implements ComponentInstance {
  static +_type = 'legend'
  _container: HTMLDivElement
  _shadowRootInContainer: ShadowRoot

  constructor(arg: AddMethodArgumentLegend, container: HTMLDivElement) {
    this._container = container;
    const that = this;
    initShadowDom();

    function initShadowDom() {
      that._shadowRootInContainer = that._container
        .attachShadow({ mode: 'open', });
      that._shadowRootInContainer.innerHTML = arg.htmlFragment;
    }
  }

  static validateXChartsAddMethodArgument(
    arg: { [string]: mixed, }
  ): string {
    const dict = AddMethodArgumentValidator.getDictionary();
    return AddMethodArgumentValidator.validate(dict, arg);
  }
}

//This error is due to some 'unbindig' of the static
//validateXChartsAddMethodArgument() method. The method is placed correctly (I
//don't want to declare it outside of the class declaration) and it's used
//correctly: RefToLegendClass.validateXChartsAddMethodArgument() So the logical
//decision was just to suppress here.
//$FlowFixMe[method-unbinding]
registerComponent(Legend);
