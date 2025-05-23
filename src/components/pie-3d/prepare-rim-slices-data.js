//@flow strict
import type { PieData, RimSlicesDataFaceVisible, } from './types.js';
import type { Point, } from '../../types.js';

export function prepareRimSlicesData(pieData: PieData):
  RimSlicesDataFaceVisible {
  const rimSlicesData: RimSlicesDataFaceVisible = [];
  if (!pieData.isRimVisibleToUser) {
    return rimSlicesData;
  }
  const startSliceIndex = pieData.edgeLeft.sliceIndex;
  const endSliceIndex = pieData.edgeRight.sliceIndex;
  const indicesToPassThru = getIndicesToPassThru();

  if (pieData.isHeadsVisibleToUser) {
    for (let j = 0; j <= indicesToPassThru.length - 1; j++) {
      const i = indicesToPassThru[j];
      const sd: RimSlicesDataFaceVisible[0] = {
        color: pieData.slices[i].color,
        pointStartOnVisibleFace: i === startSliceIndex ?
          pieData.edgeLeft.pointHeads : pieData.slices[i].startPointHeads,
        pointStartOnInvisibleFace: i === startSliceIndex ?
          pieData.edgeLeft.pointTails : pieData.slices[i].startPointTails,
        pointEndOnInvisibleFace: i === endSliceIndex ?
          pieData.edgeRight.pointTails : pieData.slices[i].endPointTails,
        pointEndOnVisibleFace: i === endSliceIndex ?
          pieData.edgeRight.pointHeads : pieData.slices[i].endPointHeads,

        ellipseArgumentsOnVisibleFace: {
          centerX: pieData.centerHeads[0],
          centerY: pieData.centerHeads[1],
          radiusX: pieData.someEllipseMethodArgs.radiusX,
          radiusY: pieData.someEllipseMethodArgs.radiusY,
          axesRotationCounterClockwise:
            pieData.someEllipseMethodArgs.axesRotationCounterClockwise,
          angleStart: i === endSliceIndex ?
            0 :
            pieData.slices[i].endAngleOnEllipseClockwise,
          angleEnd: i === startSliceIndex ?
            Math.PI : pieData.slices[i].startAngleOnEllipseClockwise,
          isCounterClockwise: false,
        },

        ellipseArgumentsOnInvisibleFace: {
          centerX: pieData.centerTails[0],
          centerY: pieData.centerTails[1],
          radiusX: pieData.someEllipseMethodArgs.radiusX,
          radiusY: pieData.someEllipseMethodArgs.radiusY,
          axesRotationCounterClockwise:
            pieData.someEllipseMethodArgs.axesRotationCounterClockwise,
          angleStart: i === startSliceIndex ?
            Math.PI :
            pieData.slices[i].startAngleOnEllipseClockwise,
          angleEnd: i === endSliceIndex ?
            Math.PI * 2 : pieData.slices[i].endAngleOnEllipseClockwise,
          isCounterClockwise: true,
        },
      };
      rimSlicesData.push(sd);
    }
  } else {
    for (let j = 0; j <= indicesToPassThru.length - 1; j++) {
      const i = indicesToPassThru[j];
      const sd: RimSlicesDataFaceVisible[0] = {
        color: pieData.slices[i].color,
        pointStartOnVisibleFace: i === startSliceIndex ?
          pieData.edgeLeft.pointTails : pieData.slices[i].startPointTails,
        pointStartOnInvisibleFace: i === startSliceIndex ?
          pieData.edgeLeft.pointHeads : pieData.slices[i].startPointHeads,
        pointEndOnInvisibleFace: i === endSliceIndex ?
          pieData.edgeRight.pointHeads : pieData.slices[i].endPointHeads,
        pointEndOnVisibleFace: i === endSliceIndex ?
          pieData.edgeRight.pointTails : pieData.slices[i].endPointTails,

        ellipseArgumentsOnInvisibleFace: {
          centerX: pieData.centerHeads[0],
          centerY: pieData.centerHeads[1],
          radiusX: pieData.someEllipseMethodArgs.radiusX,
          radiusY: pieData.someEllipseMethodArgs.radiusY,
          axesRotationCounterClockwise:
            pieData.someEllipseMethodArgs.axesRotationCounterClockwise,
          angleStart: i === startSliceIndex ?
            Math.PI :
            pieData.slices[i].startAngleOnEllipseClockwise,
          angleEnd: i === endSliceIndex ?
            0 : pieData.slices[i].endAngleOnEllipseClockwise,
          isCounterClockwise: false,
        },

        ellipseArgumentsOnVisibleFace: {
          centerX: pieData.centerTails[0],
          centerY: pieData.centerTails[1],
          radiusX: pieData.someEllipseMethodArgs.radiusX,
          radiusY: pieData.someEllipseMethodArgs.radiusY,
          axesRotationCounterClockwise:
            pieData.someEllipseMethodArgs.axesRotationCounterClockwise,
          angleStart: i === endSliceIndex ?
            0 :
            pieData.slices[i].endAngleOnEllipseClockwise,
          angleEnd: i === startSliceIndex ?
            Math.PI : pieData.slices[i].startAngleOnEllipseClockwise,
          isCounterClockwise: true,
        },
      };
      rimSlicesData.push(sd);
    }
  }
  return rimSlicesData;

  function getIndicesToPassThru() {
    if (startSliceIndex === endSliceIndex) {
      return [startSliceIndex];
    }
    let i = startSliceIndex;
    const indices: number[] = [];
    do {
      indices.push(i);
      if (++i > pieData.slices.length - 1) {
        i = 0;
      }
      if (i === endSliceIndex) {
        indices.push(i);
        break;
      }
    } while (i !== endSliceIndex);
    return indices;
  }
}
