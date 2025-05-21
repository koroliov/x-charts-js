//@flow strict
import { prepareData, } from './prepare-data.js';
import { prepareRimSlicesData, } from './prepare-rim-slices-data.js';
import type { AddComponentPie3dArgument, PieData, } from './types.js';
import type { Point, } from '../../types.js';

export function draw(arg: {
  ctx: CanvasRenderingContext2D,
  addComponentArg: AddComponentPie3dArgument,
}) {
  const { addComponentArg, ctx, } = arg;
  const pieData = prepareData(addComponentArg);
  ctx.lineWidth = 0.5;
  if (!pieData.isHeadsVisibleToUser && !pieData.isTailsVisibleToUser) {
  } else {
    const isHeads = pieData.isHeadsVisibleToUser;
    const rimSlicesData = prepareRimSlicesData(pieData);
    processFace({ isHeads, action: 'fill', });
    processRimElliptic({ rimSlicesData, action: 'fill', });
    processFace({ isHeads, action: 'stroke', });
    processRimElliptic({ rimSlicesData, action: 'stroke', });
  }

  function processRimElliptic(arg: {
    rimSlicesData: ReturnType<typeof prepareRimSlicesData>,
    action: 'stroke' | 'fill',
  }) {
    if (!pieData.isRimVisibleToUser) {
      return;
    }
    arg.rimSlicesData.forEach((sd, i) => {
      ctx.beginPath();
      ctx.moveTo(sd.pointStartOnVisibleFace[0], sd.pointStartOnVisibleFace[1]);
      ctx.lineTo(sd.pointStartOnInvisibleFace[0],
        sd.pointStartOnInvisibleFace[1]);
      drawEllipse(sd.ellipseArgumentsOnInvisibleFace);
      if (arg.action === 'stroke' && i !== arg.rimSlicesData.length - 1) {
        ctx.stroke();
      }
      ctx.lineTo(sd.pointEndOnVisibleFace[0], sd.pointEndOnVisibleFace[1]);
      if (arg.action === 'stroke' && i === arg.rimSlicesData.length - 1) {
        ctx.stroke();
      }
      drawEllipse(sd.ellipseArgumentsOnVisibleFace);
      ctx.closePath();
      if (arg.action === 'fill') {
        ctx.fillStyle = sd.color;
        ctx.fill();
      }
    });

    function drawEllipse(ellipsArg: ReturnType<
      typeof prepareRimSlicesData>[0]['ellipseArgumentsOnVisibleFace'] ) {

      ctx.ellipse(
        ellipsArg.centerX,
        ellipsArg.centerY,
        ellipsArg.radiusX,
        ellipsArg.radiusY,
        ellipsArg.axesRotationCounterClockwise,
        ellipsArg.angleStart,
        ellipsArg.angleEnd,
        ellipsArg.isCounterClockwise,
      );
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
        pieData.someEllipseMethodArgs.isCounterClockwiseOnVisibleFace,
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
