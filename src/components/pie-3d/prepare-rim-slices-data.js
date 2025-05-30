//@flow strict
import type { PieData, RimSlicesData, } from './types.js';
import type { Point, } from '../../types.js';

export function prepareRimSlicesData(pieData: PieData): RimSlicesData {
  const rimSlicesData: RimSlicesData = [];
  if (!pieData.isRimVisibleToUser) {
    return rimSlicesData;
  }
  const startSliceIndex = pieData.edgeLeft.sliceIndex;
  const endSliceIndex = pieData.edgeRight.sliceIndex;
  const indicesToPassThru = getIndicesToPassThru();

  if (pieData.isHeadsVisibleToUser) {
    setRimSlicesDataHeadsVisible();
  } else {
    setRimSlicesDataTailsVisible();
  }
  return rimSlicesData;

  function setRimSlicesDataTailsVisible() {
    for (let j = 0; j <= indicesToPassThru.length - 1; j++) {
      const i = indicesToPassThru[j];
      const sd: RimSlicesData[0] = {
        color: pieData.slices[i].color,
        pointStartOnTails: i === startSliceIndex ?
          pieData.edgeLeft.pointTails : pieData.slices[i].startPointTails,
        pointStartOnHeads: i === startSliceIndex ?
          pieData.edgeLeft.pointHeads : pieData.slices[i].startPointHeads,
        pointEndOnHeads: i === endSliceIndex ?
          pieData.edgeRight.pointHeads : pieData.slices[i].endPointHeads,
        pointEndOnTails: i === endSliceIndex ?
          pieData.edgeRight.pointTails : pieData.slices[i].endPointTails,

        ellipseArgumentsOnHeads: {
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

        ellipseArgumentsOnTails: {
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

  function setRimSlicesDataHeadsVisible() {
    for (let j = 0; j <= indicesToPassThru.length - 1; j++) {
      const i = indicesToPassThru[j];
      const sd: RimSlicesData[0] = {
        color: pieData.slices[i].color,
        pointStartOnHeads: i === startSliceIndex ?
          pieData.edgeLeft.pointHeads : pieData.slices[i].startPointHeads,
        pointStartOnTails: i === startSliceIndex ?
          pieData.edgeLeft.pointTails : pieData.slices[i].startPointTails,
        pointEndOnTails: i === endSliceIndex ?
          pieData.edgeRight.pointTails : pieData.slices[i].endPointTails,
        pointEndOnHeads: i === endSliceIndex ?
          pieData.edgeRight.pointHeads : pieData.slices[i].endPointHeads,

        ellipseArgumentsOnHeads: {
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

        ellipseArgumentsOnTails: {
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
  }

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
