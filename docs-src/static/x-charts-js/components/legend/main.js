//      strict
             
                    
                        
import XCharts, { registerComponent, } from '../../main.js';
                                                           
import * as AddMethodArgumentValidator from './validation/add-method-arg.js';

class Legend                              {
  static  _type = 'legend'
  _container                
  _shadowRootInContainer            

  constructor(arg                         , container                ) {
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
    arg                      
  )         {
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
