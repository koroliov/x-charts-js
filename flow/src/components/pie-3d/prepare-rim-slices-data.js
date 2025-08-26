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
      const sliceIndex = indicesToPassThru[j];
      const slice = pieData.slices[sliceIndex];
      const sd: RimSliceData = {
        rimColor: slice.rimColor,
        pointStartOnHeads: j === 0 ?
          pieData.edgeLeft.pointHeads : slice.startPointHeads,
        pointStartOnTails: j === 0 ?
          pieData.edgeLeft.pointTails : slice.startPointTails,
        pointEndOnTails: j === indicesToPassThru.length - 1 ?
          pieData.edgeRight.pointTails : slice.endPointTails,
        pointEndOnHeads: j === indicesToPassThru.length - 1 ?
          pieData.edgeRight.pointHeads : slice.endPointHeads,

        ellipseArgumentsOnHeads: getEllipseMethodArg({ isHeadsEllipse: true,
          sliceIndex, loopIndex: j, }),
        ellipseArgumentsOnTails: getEllipseMethodArg({ isHeadsEllipse: false,
          sliceIndex, loopIndex: j, }),
      };
      rimSlicesData.push(sd);
    }

    function getEllipseMethodArg(
      arg: { isHeadsEllipse: boolean, sliceIndex: number, loopIndex: number, }
    ): Context2dEllipseMethodArguments {
      const sliceIndex = arg.sliceIndex;
      const slice = pieData.slices[sliceIndex];
      const loopIndex = arg.loopIndex;
      const isHeadsEllipse = arg.isHeadsEllipse;
      const retVal: RimSlicesData[0]['ellipseArgumentsOnHeads'] = {
        centerX: pieData[isHeadsEllipse ? 'centerHeads' : 'centerTails'][0],
        centerY: pieData[isHeadsEllipse ? 'centerHeads' : 'centerTails'][1],
        radiusX: pieData.ellipseMethodArgs.radiusX,
        radiusY: pieData.ellipseMethodArgs.radiusY,
        axesRotationCounterClockwise:
          pieData.ellipseMethodArgs.axesRotationCounterClockwise,
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
          retVal.angleStart = loopIndex === indicesToPassThru.length - 1 ?
            -pieData.edgeRight.angleCounterClockwise :
            -slice.endAngleCounterClockwise;
          retVal.angleEnd = loopIndex === 0 ?
            -pieData.edgeLeft.angleCounterClockwise :
            -slice.startAngleCounterClockwise;
        } else {
          retVal.angleStart = loopIndex === 0 ?
            -pieData.edgeLeft.angleCounterClockwise :
            -slice.startAngleCounterClockwise;
          retVal.angleEnd = loopIndex === indicesToPassThru.length - 1 ?
            -pieData.edgeRight.angleCounterClockwise :
            -slice.endAngleCounterClockwise;
        }
      }

      function processTailsVisible() {
        const leftEdgeAngle =
          (pieData.slices[0].startAngleCounterClockwise > Math.PI ? 3 : 1) *
            Math.PI;
        if (isHeadsEllipse) {
          retVal.angleStart = loopIndex === 0 ?
            leftEdgeAngle : slice.startAngleCounterClockwise;
          retVal.angleEnd = loopIndex === indicesToPassThru.length - 1 ?
            0 : slice.endAngleCounterClockwise;
        } else {
          retVal.angleStart = loopIndex === indicesToPassThru.length - 1 ?
            0 : slice.endAngleCounterClockwise;
          retVal.angleEnd = loopIndex === 0 ?
            leftEdgeAngle : slice.startAngleCounterClockwise;
        }
      }
    }
  }

  function getIndicesToPassThru() {
    const indices: number[] = [startSliceIndex];
    const leftEdgeAngle = pieData.edgeLeft.angleCounterClockwise;
    const rigthEdgeAngle = getRightEdgeAngle();

    let i: number = startSliceIndex;
    do {
      if (++i === pieData.slices.length) {
        i = 0;
      }
      const nextSlice = pieData.slices[i];
      if (isSliceOnVisibleRim(nextSlice)) {
        indices.push(i);
      }
    } while (i !== endSliceIndex);

    return indices;

    function isSliceOnVisibleRim(slice: typeof pieData.slices[0]): boolean {
      if (slice.startAngleCounterClockwise < rigthEdgeAngle) {
        if (leftEdgeAngle < Math.PI * 3 ) {
          return slice.startAngleCounterClockwise > leftEdgeAngle;
        }
        return true;
      }
      return false;
    }

    function getRightEdgeAngle() {
      let a = pieData.edgeRight.angleCounterClockwise;
      if (leftEdgeAngle > pieData.edgeRight.angleCounterClockwise) {
        a += Math.PI * 2;
      }
      return a;
    }
  }
}
