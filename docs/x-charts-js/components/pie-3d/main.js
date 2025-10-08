//      strict
             
                    
                        
import XCharts, { registerComponent, } from '../../main.js';
                                                          
import { draw, } from './draw.js';
import * as AddMethodArgumentValidator from './validation/add-method-arg.js';

class Pie3d                              {
  static  _type = 'pie-3d'
  _container                
  _ctx                          

  constructor(arg                        , container                ) {
    this._container = container;
    const that = this;
    createCanvas();
    draw({ ctx: this._ctx, addMethodArg: arg, });

    function createCanvas() {
      const canvas = document.createElement('canvas');
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.position = 'absolute';
      canvas.style.zIndex = '100';
      canvas.width = that._container.offsetWidth;
      canvas.height = that._container.offsetHeight;
      that._container.appendChild(canvas);
      that._ctx = canvas.getContext('2d');
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
//correctly: RefToPie3dClass.validateXChartsAddMethodArgument() So the logical
//decision was just to suppress here.
//$FlowFixMe[method-unbinding]
registerComponent(Pie3d);
