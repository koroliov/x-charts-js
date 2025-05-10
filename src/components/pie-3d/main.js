//@flow strict
import type { Component, } from '../../types.js';
import XCharts, { registerComponent, } from '../../main.js';
import type { AddComponentPie3dArgument, PieData, } from './types.js';
import { prepareData, } from './prepare-data.js';
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
    draw();

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

    function draw() {
      const ctx = that._ctx;
      ctx.lineWidth = 0.5;
      if (pieData.isHeadsVisibleToUser) {
        drawEllipse(true);
      } else if (pieData.isTailsVisibleToUser) {
        //
      } else {
        //
      }

      function drawEllipse(isHeads: boolean) {
        const centerPointPropName = isHeads ? 'centerHeads' : 'centerTails';
        const startPointPropName = isHeads ? 'startPointHeads' :
          'startPointTails';

        pieData.slices.forEach((s, i) => {
          ctx.moveTo(pieData[centerPointPropName][0],
            pieData[centerPointPropName][1]);
          ctx.beginPath();
          ctx.lineTo(s[startPointPropName][0], s[startPointPropName][1]);
          ctx.ellipse(
            pieData[centerPointPropName][0],
            pieData[centerPointPropName][1],
            pieData.someEllipseMethodArgs.radiusX,
            pieData.someEllipseMethodArgs.radiusY,
            pieData.someEllipseMethodArgs.axesRotationCounterClockwise,
            s.startAngleOnEllipseClockwise,
            s.endAngleOnEllipseClockwise,
            true,
          );
          ctx.lineTo(pieData[centerPointPropName][0],
            pieData[centerPointPropName][1]);
          ctx.fillStyle = s.color;
          ctx.fill();
          ctx.stroke();
        });
      }
    }

    function validateAddComponentArgument() {
      //validate arg.options
      //validate arg.data
    }
  }
}

registerComponent(Pie3d._type, Pie3d);
