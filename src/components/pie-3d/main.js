//@flow strict
import type {
  Component,
} from '../../types.js';

import XCharts, {
  registerComponent,
} from '../../main.js';

import type {
  AddComponentPie3dArgument,
  Point,
  SliceData,
  EdgeData,
  SideData,
  PieData,
} from './types.js';

class Pie3d implements Component {
  static +_type = 'pie-3d'
  _container: HTMLDivElement
  _ctx: CanvasRenderingContext2D

  constructor(arg: AddComponentPie3dArgument, container: HTMLDivElement) {
    validateAddComponentArgument();
    this._container = container;
    const that = this;
    createCanvas();
    draw();

    function createCanvas() {
      const canvas = document.createElement('canvas');
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.position = 'absolute';
      canvas.style.zIndex = '100';
      that._container.appendChild(canvas);
      that._ctx = canvas.getContext('2d');
    }

    function draw() {
      //calculate percentage
    }

    function validateAddComponentArgument() {
      //validate c.options
      //validate c.data
    }
  }
}

registerComponent(Pie3d._type, Pie3d);
