//@flow strict
import type {
  Component,
  AddComponentConfig,
} from '../types.js';
import XCharts from '../main.js';

class Pie3d implements Component {
  static +_type = 'pie-3d'
  _container: HTMLDivElement
  _ctx: CanvasRenderingContext2D

  constructor(c: AddComponentConfig, container: HTMLDivElement) {
    validateAddComponentConfig();
    this._container = container;
    const that = this;
    createCanvas();
    //draw pie

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
    }

    function validateAddComponentConfig() {
      //validate c.options
      //validate c.data
    }
  }
}

XCharts._registerComponent(Pie3d._type, Pie3d);
