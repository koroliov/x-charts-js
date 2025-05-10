//@flow strict
import type { AddComponentPie3dArgument, PieData, } from './types.js';
import type { Point, } from '../../types.js';
import { calculateDistance, getAngleClockwise, } from '../../utils/math.js';

export function prepareData(arg: AddComponentPie3dArgument): PieData {
  const ops = arg.options;
  const { slices, totalValue, } = getTotalValueAndSlices();
  const pieData = getInitialPieData();
  performBeforeRotationsProcessing();
  handleRotations();
  calculateEllipseMethodArgs();
  return pieData;

  function calculateEllipseMethodArgs() {
    pieData.someEllipseMethodArgs.radiusY = calculateDistance({
      pointStart: pieData.centerHeads,
      pointEnd: pieData.pointTopHeads,
    });
    pieData.someEllipseMethodArgs.radiusX = calculateDistance({
      pointStart: pieData.centerHeads,
      pointEnd: pieData.edgeRight.pointHeads,
    });
    pieData.someEllipseMethodArgs.axesRotationCounterClockwise =
      -(ops.rotationAroundCenterZAxisDeg / 180 * Math.PI);
  }

  function handleRotations() {
    const centerX = ops.centerXPx;
    const centerY = ops.centerYPx;
    const rotationCxRad = -ops.rotationAroundCenterXAxisDeg / 180 * Math.PI;
    const rotationCzRad = -ops.rotationAroundCenterZAxisDeg / 180 * Math.PI;

    const sinRotationCx = Math.sin(rotationCxRad);
    const cosRotationCx = Math.cos(rotationCxRad);
    const rotationMatrixX = [
      [1, 0,              0,],
      [0, cosRotationCx, -sinRotationCx,],
      [0, sinRotationCx,  cosRotationCx,],
    ];

    const sinRotationCz = Math.sin(rotationCzRad);
    const cosRotationCz = Math.cos(rotationCzRad);
    const rotationMatrixZ = [
      [cosRotationCz, -sinRotationCz, 0,],
      [sinRotationCz,  cosRotationCz, 0,],
      [0,              0,             1,],
    ];

    rotatePoint(pieData.pointTopHeads);
    rotatePoint(pieData.centerHeads);
    rotatePoint(pieData.centerTails);
    rotatePoint(pieData.edgeLeft.pointHeads);
    rotatePoint(pieData.edgeLeft.pointTails);
    rotatePoint(pieData.edgeRight.pointHeads);
    rotatePoint(pieData.edgeRight.pointTails);
    pieData.slices.forEach((s) => {
      rotatePoint(s.startPointHeads);
      rotatePoint(s.startPointTails);
    });

    function rotatePoint(p: Point) {
      p[0] -= centerX;
      p[1] -= centerY;
      let pRotated = Array.from(p);
      pRotated = rotationMatrixX.map((row) => {
        return row.reduce((sum, value, i) => sum + value * pRotated[i], 0)
      });
      pRotated = rotationMatrixZ.map((row) => {
        return row.reduce((sum, value, i) => sum + value * pRotated[i], 0)
      });
      p[0] = pRotated[0];
      p[1] = pRotated[1];
      p[2] = pRotated[2];
      p[0] += centerX;
      p[1] += centerY;
    }
  }

  function performBeforeRotationsProcessing() {
    handleHeadsTailsAndRimVisibility();
    const circleRadius = ops.radiusPx;
    const centerX = ops.centerXPx;
    const centerY = ops.centerYPx;
    const halfThickness = ops.thicknessPx / 2;

    pieData.pointTopHeads[0] = centerX;
    pieData.pointTopHeads[1] = centerY - circleRadius;
    pieData.pointTopHeads[2] = -halfThickness;

    pieData.centerHeads[0] = centerX;
    pieData.centerHeads[1] = centerY;
    pieData.centerHeads[2] = -halfThickness;

    pieData.centerTails[0] = centerX;
    pieData.centerTails[1] = centerY;
    pieData.centerTails[2] = halfThickness;

    pieData.edgeLeft.pointHeads[0] = centerX - circleRadius;
    pieData.edgeLeft.pointHeads[1] = centerY;
    pieData.edgeLeft.pointHeads[2] = -halfThickness;

    pieData.edgeLeft.pointTails[0] = centerX - circleRadius;
    pieData.edgeLeft.pointTails[1] = centerY;
    pieData.edgeLeft.pointTails[2] = halfThickness;

    pieData.edgeRight.pointHeads[0] = centerX + circleRadius;
    pieData.edgeRight.pointHeads[1] = centerY;
    pieData.edgeRight.pointHeads[2] = -halfThickness;

    pieData.edgeRight.pointTails[0] = centerX + circleRadius;
    pieData.edgeRight.pointTails[1] = centerY;
    pieData.edgeRight.pointTails[2] = halfThickness;

    let startAngle = ops.startAtDeg / 180 * Math.PI;
    let { expectToPassRightEdge, expectToPassLeftEdge, } =
      getInitialExpectedEdgeFlags();

    pieData.slices.forEach((sd, i) => {
      const y = -(Math.sin(startAngle) * circleRadius) + centerY;
      const x = Math.cos(startAngle) * circleRadius + centerX;
      sd.startPointHeads[0] = x;
      sd.startPointHeads[1] = y;
      sd.startPointHeads[2] = -halfThickness;
      handleStartEndAnglesOnSlice(i, sd.startPointHeads);
      sd.startPointTails[0] = x;
      sd.startPointTails[1] = y;
      sd.startPointTails[2] = halfThickness;

      const endAngle = sd.value / totalValue * Math.PI * 2;
      startAngle += endAngle;
      handleExpectedEdgeFlagsWhenPassingSlice(i);
    });

    function handleStartEndAnglesOnSlice(sliceIndex: number,
      startPoint: Point) {
      const sd = pieData.slices[sliceIndex];
      const sdPrevious = sliceIndex > 0 ? pieData.slices[sliceIndex - 1] :
        pieData.slices[pieData.slices.length - 1];
      sdPrevious.endAngleOnEllipseClockwise = getAngleClockwise({
        startPoint: pieData.edgeRight.pointHeads,
        centerPoint: pieData.centerHeads,
        endPoint: sd.startPointHeads,
      });
      if (!pieData.someEllipseMethodArgs.isCounterClockwise) {
        sdPrevious.endAngleOnEllipseClockwise =
          -sdPrevious.endAngleOnEllipseClockwise;
      }
      sd.startAngleOnEllipseClockwise = sdPrevious.endAngleOnEllipseClockwise;
    }

    function handleExpectedEdgeFlagsWhenPassingSlice(sliceIndex: number) {
      if (expectToPassLeftEdge) {
        if (startAngle >= Math.PI) {
          expectToPassLeftEdge = false;
          expectToPassRightEdge = true;
          pieData.edgeLeft.sliceIndex = sliceIndex;
        }
      } else if (expectToPassRightEdge) {
        if (startAngle >= 2 * Math.PI) {
          expectToPassRightEdge = false;
          expectToPassLeftEdge = true;
          pieData.edgeRight.sliceIndex = sliceIndex;
        }
      }
    }

    function getInitialExpectedEdgeFlags() {
      let expectToPassRightEdge = false;
      let expectToPassLeftEdge = false;
      if (startAngle < Math.PI) {
        expectToPassLeftEdge = true;
      } else {
        expectToPassRightEdge = true;
      }
      return { expectToPassRightEdge, expectToPassLeftEdge, };
    }

    function handleHeadsTailsAndRimVisibility() {
      const angle = ops.rotationAroundCenterXAxisDeg;
      if (angle === 0) {
        pieData.isHeadsVisibleToUser = true;
        pieData.isRimVisibleToUser = false;
      } else if (angle === 180) {
        pieData.isTailsVisibleToUser = true;
        pieData.isRimVisibleToUser = false;
      } else if (angle === 90 || angle === 270) {
        return;
      } else if (angle < 90) {
        pieData.isHeadsVisibleToUser = true;
      } else if (angle < 270) {
        pieData.isTailsVisibleToUser = true;
      } else {
        pieData.isHeadsVisibleToUser = true;
      }
      if (pieData.isTailsVisibleToUser) {
        pieData.someEllipseMethodArgs.isCounterClockwise = false;
      }
    }
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
        axesRotationCounterClockwise: 0,
        isCounterClockwise: true,
      },
      isHeadsVisibleToUser: false,
      isTailsVisibleToUser: false,
      isRimVisibleToUser: true,
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
        startAngleOnEllipseClockwise: 0,
        endAngleOnEllipseClockwise: 0,
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
