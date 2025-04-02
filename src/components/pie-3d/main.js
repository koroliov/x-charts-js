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
    freezeArgument();
    validateAddComponentArgument();
    this._container = container;
    const that = this;
    createCanvas();
    const pieData = prepareData();
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

    function freezeArgument() {
      Object.freeze(arg);
      Object.freeze(arg.options);
      Object.freeze(arg.data);
      arg.data.forEach((d) => Object.freeze(d.meta));
    }

    function prepareData(): PieData {
      const pieData = {
        heads: createSideData(0),
        tails: createSideData(arg.options.thicknessPx),
      };
      return pieData;

      function createSideData(centerZCoord: number): SideData {
        return {
          slices: arg.data.map((d) => {
            return {
              startPoint: [0, 0, 0,],
              endPoint: [0, 0, 0,],
              angle: 0,
              value: d.value,
              percentValue: 0,
              color: d.meta.color,
            };
          }),
          leftEdge: {
            point: [0, 0, 0],
            sliceIndex: 0,
          },
          rightEdge: {
            point: [0, 0, 0],
            sliceIndex: 0,
          },
          center: [arg.options.centerXPx, arg.options.centerYPx, centerZCoord,],
        };
      }
      //create initial structure
      //return it
      //apply modifications
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
