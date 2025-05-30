//@flow strict
import type {
  PieData,
  RimSlicesData,
  Context2dEllipseMethodArguments,
  RimSliceData,
} from './types.js';
import type { Point, } from '../../types.js';

export function prepareRimSlicesData(pieData: PieData): RimSlicesData {
  const rimSlicesData: RimSlicesData = [];
  if (!pieData.isRimVisibleToUser) {
    return rimSlicesData;
  }
  const startSliceIndex = pieData.edgeLeft.sliceIndex;
  const endSliceIndex = pieData.edgeRight.sliceIndex;
  const indicesToPassThru = getIndicesToPassThru();
  setRimSlicesData();
  return rimSlicesData;

  function setRimSlicesData() {
    for (let j = 0; j <= indicesToPassThru.length - 1; j++) {
      const i = indicesToPassThru[j];
      const sd: RimSliceData = {
        color: pieData.slices[i].color,
        pointStartOnHeads: i === startSliceIndex ?
          pieData.edgeLeft.pointHeads : pieData.slices[i].startPointHeads,
        pointStartOnTails: i === startSliceIndex ?
          pieData.edgeLeft.pointTails : pieData.slices[i].startPointTails,
        pointEndOnTails: i === endSliceIndex ?
          pieData.edgeRight.pointTails : pieData.slices[i].endPointTails,
        pointEndOnHeads: i === endSliceIndex ?
          pieData.edgeRight.pointHeads : pieData.slices[i].endPointHeads,

        ellipseArgumentsOnHeads: getEllipseMethodArg({ isHeadsEllipse: true,
          i, }),
        ellipseArgumentsOnTails: getEllipseMethodArg({ isHeadsEllipse: false,
          i, }),
      };
      rimSlicesData.push(sd);
    }

    function getEllipseMethodArg(
      arg: { isHeadsEllipse: boolean, i: number, }
    ): Context2dEllipseMethodArguments {
      const i = arg.i;
      const isHeadsEllipse = arg.isHeadsEllipse;
      const retVal: RimSlicesData[0]['ellipseArgumentsOnHeads'] = {
        centerX: pieData[isHeadsEllipse ? 'centerHeads' : 'centerTails'][0],
        centerY: pieData[isHeadsEllipse ? 'centerHeads' : 'centerTails'][1],
        radiusX: pieData.someEllipseMethodArgs.radiusX,
        radiusY: pieData.someEllipseMethodArgs.radiusY,
        axesRotationCounterClockwise:
          pieData.someEllipseMethodArgs.axesRotationCounterClockwise,
        angleStart: 0,
        angleEnd: 0,
        isCounterClockwise: !isHeadsEllipse,
      };
      if (pieData.isHeadsVisibleToUser) {
        processHeadsVisible();
      } else if (pieData.isTailsVisibleToUser) {
        processTailsVisible();
      }
      return retVal;

      function processHeadsVisible() {
        if (isHeadsEllipse) {
          retVal.angleStart = i === endSliceIndex ?
            0 : pieData.slices[i].endAngleOnEllipseClockwise;
          retVal.angleEnd = i === startSliceIndex ?
            Math.PI : pieData.slices[i].startAngleOnEllipseClockwise;
        } else {
          retVal.angleStart = i === startSliceIndex ?
            Math.PI : pieData.slices[i].startAngleOnEllipseClockwise;
          retVal.angleEnd = i === endSliceIndex ?
            Math.PI * 2 : pieData.slices[i].endAngleOnEllipseClockwise;
        }
      }

      function processTailsVisible() {
        if (isHeadsEllipse) {
          retVal.angleStart = i === startSliceIndex ?
            Math.PI : pieData.slices[i].startAngleOnEllipseClockwise;
          retVal.angleEnd = i === endSliceIndex ?
            0 : pieData.slices[i].endAngleOnEllipseClockwise;
        } else {
          retVal.angleStart = i === endSliceIndex ?
            0 : pieData.slices[i].endAngleOnEllipseClockwise;
          retVal.angleEnd = i === startSliceIndex ?
            Math.PI : pieData.slices[i].startAngleOnEllipseClockwise;
        }
      }
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
