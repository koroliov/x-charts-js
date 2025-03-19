//@flow strict
import type {
  Component,
  AddComponentConfig,
} from '../types.js';

import XCharts, {
  registerComponent,
} from '../main.js';

type AddComponentPie3dConfig = {
  ...Exclude<AddComponentConfig, AddComponentConfig['options']>,
  options: {
    thickness: StringSuffix<'px'>,
    radius: StringSuffix<'px'>,
    centerX: StringSuffix<'px'>,
    centerY: StringSuffix<'px'>,
    startAt: StringSuffix<'deg'>,
    rotationAroundCenterXAxis: StringSuffix<'deg'>,
    rotationAroundCenterZAxis: StringSuffix<'deg'>,
  },
}

class Pie3d implements Component {
  static +_type = 'pie-3d'
  _container: HTMLDivElement
  _ctx: CanvasRenderingContext2D

  constructor(config: AddComponentPie3dConfig, container: HTMLDivElement) {
    validateAddComponentConfig();
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
      //config.data.foo = 123;
      //take
    }

    function validateAddComponentConfig() {
      //validate c.options
      //validate c.data
    }
  }
}

registerComponent(Pie3d._type, Pie3d);
