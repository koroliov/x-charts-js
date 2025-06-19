//@flow strict
import type {
  AddComponentArgument,
  ComponentInstance,
} from '../../types.js';
import XCharts, { registerComponent, } from '../../main.js';
import type { AddComponentPie3dArgument, } from './types.js';
import { draw, } from './draw.js';
import * as AddComponentArgumentValidator from
  './add-component-argument-validator.js';

class Pie3d implements ComponentInstance {
  static +_type = 'pie-3d'
  _container: HTMLDivElement
  _ctx: CanvasRenderingContext2D

  constructor(arg: AddComponentPie3dArgument, container: HTMLDivElement) {
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
  }

  static validateAddComponentArgument(
    propsToCheck: Set<string>,
    arg: AddComponentArgument): string {
    return AddComponentArgumentValidator.validate(propsToCheck, arg);
  }
}

//$FlowFixMe[method-unbinding] See commit message
registerComponent(Pie3d);
