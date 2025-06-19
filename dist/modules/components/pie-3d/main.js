//      strict
             
                       
                    
                        
import XCharts, { registerComponent, } from '../../main.js';
                                                             
import { draw, } from './draw.js';
import * as AddComponentArgumentValidator from
  './add-component-argument-validator.js';

class Pie3d                              {
  static  _type = 'pie-3d'
  _container                
  _ctx                          

  constructor(arg                           , container                ) {
    freezeArgument();
    this._container = container;
    const that = this;
    createCanvas();
    draw({ ctx: this._ctx, addComponentArg: arg, });

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

    function freezeArgument() {
      Object.freeze(arg);
      Object.freeze(arg.options);
      Object.freeze(arg.data);
      arg.data.forEach((d) => Object.freeze(d.meta));
    }
  }

  static validateAddComponentArgument(
    propsToCheck             ,
    arg                      )         {
    return AddComponentArgumentValidator.validate(propsToCheck, arg);
  }
}

//$FlowFixMe[method-unbinding] See commit message
registerComponent(Pie3d);
