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
        //processFace({ isHeads: true, action: 'fill', });
        if (pieData.isRimVisibleToUser) {
          processRimElliptic({ isHeadsVisible: true, action: 'fill', });
        }
        //processFace({ isHeads: true, action: 'stroke', });
        if (pieData.isRimVisibleToUser) {
          processRimElliptic({ isHeadsVisible: true, action: 'stroke', });
        }
      } else if (pieData.isTailsVisibleToUser) {
        processFace({ isHeads: false, action: 'fill', });
        if (pieData.isRimVisibleToUser) {
          processRimElliptic({ isHeadsVisible: false, action: 'fill', });
        }
        processFace({ isHeads: false, action: 'stroke', });
      } else if (pieData.isRimVisibleToUser) {
        //drawRim(false);
      }

      function processRimElliptic(arg: {
        isHeadsVisible: boolean,
        action: 'stroke' | 'fill',
      }) {
        const centerPointPropName = arg.isHeadsVisible ?
          'centerHeads' : 'centerTails';

        const sliceStart = pieData.slices[pieData.edgeLeft.sliceIndex];
        const sliceEnd = pieData.slices[pieData.edgeRight.sliceIndex];
        if (sliceStart === sliceEnd) {
          //draw 1 single rim
        }
        drawLeftSlice();
        //draw left slice
        //draw middle slices
        //draw right slice

        function drawLeftSlice() {
          const edgeLineStartPointPropName = arg.isHeadsVisible ?
            'pointHeads' : 'pointTails';
          const edgeLineEndPointPropName = arg.isHeadsVisible ?
            'pointTails' : 'pointHeads';

          console.log(edgeLineStartPointPropName, edgeLineEndPointPropName);
          ctx.beginPath();
          ctx.moveTo(pieData.edgeLeft[edgeLineStartPointPropName][0],
            pieData.edgeLeft[edgeLineStartPointPropName][1]);
          ctx.lineTo(pieData.edgeLeft[edgeLineEndPointPropName][0],
            pieData.edgeLeft[edgeLineEndPointPropName][1]);

          let centerPointPropName = arg.isHeadsVisible ?
            'centerTails' : 'centerHeads';
          console.log(centerPointPropName);
          ctx.ellipse(
            pieData[centerPointPropName][0],
            pieData[centerPointPropName][1],
            pieData.someEllipseMethodArgs.radiusX,
            pieData.someEllipseMethodArgs.radiusY,
            pieData.someEllipseMethodArgs.axesRotationCounterClockwise,
            Math.PI,
            sliceStart.endAngleOnEllipseClockwise,
            pieData.someEllipseMethodArgs.isCounterClockwise,
          );
          const sliceEndLineToPointPropName = arg.isHeadsVisible ?
            'endPointHeads' : 'endPointTails';
          ctx.lineTo(sliceStart[sliceEndLineToPointPropName][0],
            sliceStart[sliceEndLineToPointPropName][1]);

          centerPointPropName = arg.isHeadsVisible ?
            'centerHeads' : 'centerTails';
          ctx.ellipse(
            pieData[centerPointPropName][0],
            pieData[centerPointPropName][1],
            pieData.someEllipseMethodArgs.radiusX,
            pieData.someEllipseMethodArgs.radiusY,
            pieData.someEllipseMethodArgs.axesRotationCounterClockwise,
            sliceStart.endAngleOnEllipseClockwise,
            Math.PI,
            !pieData.someEllipseMethodArgs.isCounterClockwise,
          );

          if (arg.action === 'fill') {
            ctx.fillStyle = sliceStart.color;
            console.log('filled');
            ctx.fill();
          } else {
            console.log('stroked');
            ctx.stroke();
          }
        }
      }

      function processFace(arg: {
        isHeads: boolean,
        action: 'stroke' | 'fill',
      }) {
        const centerPointPropName = arg.isHeads ? 'centerHeads' : 'centerTails';
        const startPointPropName = arg.isHeads ? 'startPointHeads' :
          'startPointTails';
        pieData.slices.forEach(processSlice);

        function processSlice(s: typeof pieData.slices[0], i: number) {
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
            pieData.someEllipseMethodArgs.isCounterClockwise,
          );
          ctx.lineTo(pieData[centerPointPropName][0],
            pieData[centerPointPropName][1]);
          if (arg.action === 'fill') {
            ctx.fillStyle = s.color;
            ctx.fill();
          } else {
            ctx.stroke();
          }
        }
      }
    }

    function validateAddComponentArgument() {
      //validate arg.options
      //validate arg.data
    }
  }
}

registerComponent(Pie3d._type, Pie3d);
