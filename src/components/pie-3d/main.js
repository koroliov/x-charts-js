//@flow strict
import type { Component, } from '../../types.js';
import XCharts, { registerComponent, } from '../../main.js';
import type { AddComponentPie3dArgument, PieData, } from './types.js';
import { prepareData, } from './prepare-data.js';
import { draw, } from './draw.js';
import { getAngleClockwise, } from '../../utils/math.js';

class Pie3d implements Component {
  static +_type = 'pie-3d'
  _container: HTMLDivElement
  _ctx: CanvasRenderingContext2D

  constructor(arg: AddComponentPie3dArgument, container: HTMLDivElement) {
    freezeArgument();
    validateAddComponentArgument();
    this._container = container;
    const that = this;
    createCanvas();
    const pieData = prepareData(arg);
    draw({ ctx: this._ctx, pieData, });

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

    function validateAddComponentArgument() {
      //validate arg.options
      //validate arg.data
    }
  }
}

registerComponent(Pie3d._type, Pie3d);
