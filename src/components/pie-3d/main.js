//@flow strict
import type { Component, } from '../../types.js';
import XCharts, { registerComponent, } from '../../main.js';
import type { AddComponentPie3dArgument, PieData, } from './types.js';

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
      const { slices, totalValue, } = traverseData();
      const ops = arg.options;
      const pieData = {
        totalValue,
        slices,
        pointTopHeads: [0, 0, 0,],
        edgeLeft: {
          pointHeads: [0, 0, 0,],
          pointTails: [0, 0, 0,],
          sliceIndex: 0,
        },
        edgeRight: {
          pointHeads: [0, 0, 0,],
          pointTails: [0, 0, 0,],
          sliceIndex: 0,
        },
        centerHeads: [ops.centerXPx, ops.centerYPx, 0,],
        centerTails: [ops.centerXPx, ops.centerYPx, ops.thicknessPx,],
      };

      //apply modifications
      return pieData;

      function traverseData() {
        let totalValue = 0;
        const thickness = arg.options.thicknessPx;
        let prevEndHeads = [0, 0, 0,];
        let prevEndTails = [0, 0, thickness,];
        const slices = arg.data.map((d) => {
          totalValue += d.value;
          const rv = {
            startPointHeads: prevEndHeads,
            startPointTails: prevEndTails,
            endPointHeads: [0, 0, 0,],
            endPointTails: [0, 0, thickness,],
            value: d.value,
            color: d.meta.color,
          };
          prevEndHeads = rv.endPointHeads;
          prevEndTails = rv.endPointTails;
          return rv;
        });
        slices[0].startPointHeads = slices[slices.length - 1].endPointHeads;
        slices[0].startPointTails = slices[slices.length - 1].endPointTails;

        return { totalValue, slices, };
      }
    }

    function draw() {
    }

    function validateAddComponentArgument() {
      //validate arg.options
      //validate arg.data
    }
  }
}

registerComponent(Pie3d._type, Pie3d);
