//@flow strict
import type { AddComponentPie3dArgument, PieData, } from './types.js';

export function prepareData(arg: AddComponentPie3dArgument): PieData {
  const ops = arg.options;
  const { slices, totalValue, } = getTotalValueAndSlices();
  const pieData = getInitialPieData();
  setPointsOnNonRotatedCircle();

  // calculate points
    // edges by simple arithmethic
    // points by:
      // take length of the full arc
      // find angle of a slice arc from its percent + prevAngle (startAng)
      // calculate x, y, z by using the radius and the angle
  // apply transformations for all points
    // rotate over oX
    // rotate over oZ
  // calculate radiusX, Y, rotationClockwise
  return pieData;

  function setPointsOnNonRotatedCircle() {
    const circleRadius = ops.radiusPx;
    const centerX = ops.centerXPx;
    const centerY = ops.centerYPx;
    const thickness = ops.thicknessPx;

    pieData.pointTopHeads[0] = centerX;
    pieData.pointTopHeads[1] = centerY - circleRadius;
    pieData.pointTopHeads[2] = 0;

    pieData.centerHeads[0] = centerX;
    pieData.centerHeads[1] = centerY;
    pieData.centerHeads[2] = 0;

    pieData.centerTails[0] = centerX;
    pieData.centerTails[1] = centerY;
    pieData.centerTails[2] = thickness;

    pieData.edgeLeft.pointHeads[0] = centerX - circleRadius;
    pieData.edgeLeft.pointHeads[1] = centerY;
    pieData.edgeLeft.pointHeads[2] = 0;

    pieData.edgeLeft.pointTails[0] = centerX - circleRadius;
    pieData.edgeLeft.pointTails[1] = centerY;
    pieData.edgeLeft.pointTails[2] = thickness;

    pieData.edgeRight.pointHeads[0] = centerX + circleRadius;
    pieData.edgeRight.pointHeads[1] = centerY;
    pieData.edgeRight.pointHeads[2] = 0;

    pieData.edgeRight.pointTails[0] = centerX + circleRadius;
    pieData.edgeRight.pointTails[1] = centerY;
    pieData.edgeRight.pointTails[2] = thickness;

    let startAngle = ops.startAtDeg / 180 * Math.PI;
    pieData.slices.forEach((sd, i) => {
      const y = -(Math.sin(startAngle) * circleRadius) + centerY;
      const x = Math.cos(startAngle) * circleRadius + centerX;
      sd.startPointHeads[0] = x;
      sd.startPointHeads[1] = y;
      sd.startPointHeads[2] = 0;

      sd.startPointTails[0] = x;
      sd.startPointTails[1] = y;
      sd.startPointTails[2] = thickness;

      const endAngle = sd.value / totalValue * Math.PI * 2;
      startAngle += endAngle;
    });
  }

  function getInitialPieData() {
    return {
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
      centerHeads: [0, 0, 0,],
      centerTails: [0, 0, 0,],
      someEllipseMethodArgs: {
        radiusX: 0,
        radiusY: 0,
        rotationClockwise: 0,
      },
    };
  }

  function getTotalValueAndSlices() {
    let totalValue = 0;
    let prevEndHeads = [0, 0, 0,];
    let prevEndTails = [0, 0, 0,];
    const slices = arg.data.map((d) => {
      totalValue += d.value;
      const rv = {
        startPointHeads: prevEndHeads,
        startPointTails: prevEndTails,
        endPointHeads: [0, 0, 0,],
        endPointTails: [0, 0, 0,],
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
