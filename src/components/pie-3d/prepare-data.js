//@flow strict
import type { AddComponentPie3dArgument, PieData, } from './types.js';
import type { Point, } from '../../types.js';
import { calculateDistance, } from '../../utils/math.js';

export function prepareData(arg: AddComponentPie3dArgument): PieData {
  const ops = arg.options;
  const { slices, totalValue, } = getTotalValueAndSlices();
  const pieData = getInitialPieData();
  performBeforeRotationsProcessing();
  handleRotations();
  calculateEllipseMethodArgs();
  return pieData;

  function calculateEllipseMethodArgs() {
    pieData.ellipseMethodArgs.radiusY = calculateDistance({
      pointStart: pieData.centerHeads,
      pointEnd: pieData.pointTopHeads,
    });
    pieData.ellipseMethodArgs.radiusX = calculateDistance({
      pointStart: pieData.centerHeads,
      pointEnd: pieData.edgeRight.pointHeads,
    });
    pieData.ellipseMethodArgs.axesRotationCounterClockwise =
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
    handleFaceAndRimVisibility();
    const circleRadius = ops.radiusPx;
    const centerX = ops.centerXPx;
    const centerY = ops.centerYPx;
    const halfThickness = ops.thicknessPx / 2;

    handlePointTopHeads();
    handleCenterHeads();
    handleCenterTails();
    handleEdgeLeftPointHeads();
    handleEdgeLeftPointTails();
    handleEdgeRightPointHeads();
    handleEdgeRightPointTails();
    handleSlices();

    function handleSlices() {
      let startAngle = ops.startAtDeg / 180 * Math.PI;
      let previousStartAngle = startAngle;
      let endAngle = 0;
      handleEdgeAngles();
      for (let i = 0, l = pieData.slices.length; i <= l; i++) {
        if (i !== l) {
          setStartPointsOnSlice(i);
          findIfSliceIsOnEdge(i);
        }
        const startAngleCurrent = startAngle;
        startAngle += endAngle;
        if (i === 0) {
          continue;
        }
        setAnglesOnPreviousSlice(i, startAngleCurrent);
        previousStartAngle = startAngleCurrent;
      }
      handleLastSliceTakesAllVisibleRimCase();

      function setAnglesOnPreviousSlice(currentSliceIndex: number,
        startAngleCurrent: number) {
        const sdPrevious = pieData.slices[currentSliceIndex - 1];
        sdPrevious.endAngleCounterClockwise = startAngleCurrent;
        sdPrevious.startAngleCounterClockwise = previousStartAngle;

        const sa = Math.PI * 6 - previousStartAngle;
        const ea = Math.PI * 6 - startAngleCurrent;
        sdPrevious.faceEllipseMethodArguments.startAngle =
          pieData.ellipseMethodArgs.isCounterClockwiseOnVisibleFace ? sa : -sa;
        sdPrevious.faceEllipseMethodArguments.endAngle =
          pieData.ellipseMethodArgs.isCounterClockwiseOnVisibleFace ? ea : -ea;
      }

      function setStartPointsOnSlice(i: number) {
        const y = -(Math.sin(startAngle) * circleRadius) + centerY;
        const x = Math.cos(startAngle) * circleRadius + centerX;
        const sd = pieData.slices[i];
        sd.startPointHeads[0] = x;
        sd.startPointHeads[1] = y;
        sd.startPointHeads[2] = -halfThickness;
        sd.startPointTails[0] = x;
        sd.startPointTails[1] = y;
        sd.startPointTails[2] = halfThickness;
        endAngle = sd.value / totalValue * Math.PI * 2;
      }

      function handleLastSliceTakesAllVisibleRimCase() {
        ['edgeLeft', 'edgeRight',].forEach((edge) => {
          if (pieData[edge].sliceIndex === -1) {
            pieData[edge].sliceIndex = pieData.slices.length - 1;
          }
        });
      }

      function handleEdgeAngles() {
        if (startAngle >= Math.PI) {
          pieData.edgeLeft.angleCounterClockwise = Math.PI * 3;
          pieData.edgeRight.angleCounterClockwise = Math.PI * 2;
        } else {
          pieData.edgeLeft.angleCounterClockwise = Math.PI;
          pieData.edgeRight.angleCounterClockwise = Math.PI * 2;
        }
      }

      function findIfSliceIsOnEdge(sliceIndex: number) {
        const endAngleOfSlice = endAngle + startAngle;
        const startAngleOfSlice = startAngle;
        const leftEdgeAngle = pieData.edgeLeft.angleCounterClockwise;
        const rightEdgeAngle = pieData.edgeRight.angleCounterClockwise;
        if (isInThisSliceRange(leftEdgeAngle)) {
          handleLeftEdge();
        }
        if (isInThisSliceRange(rightEdgeAngle)) {
          if (pieData.edgeRight.sliceIndex === -1) {
            pieData.edgeRight.sliceIndex = sliceIndex;
          }
        }

        function handleLeftEdge() {
          if (pieData.edgeLeft.sliceIndex > -1) {
            return;
          }
          if (startAngleOfSlice === leftEdgeAngle) {
            pieData.edgeLeft.sliceIndex = sliceIndex -
              (ops.rotationAroundCenterXAxisDeg > 90 ? 1 : 0);
          } else if (leftEdgeAngle === endAngleOfSlice) {
            pieData.edgeLeft.sliceIndex = sliceIndex -
              (ops.rotationAroundCenterXAxisDeg > 90 ? 0 : 1);
          } else {
            pieData.edgeLeft.sliceIndex = sliceIndex;
          }
        }

        function isInThisSliceRange(angle: number) {
          return startAngleOfSlice <= angle &&
            angle <= endAngleOfSlice;
        }
      }
    }

    function handlePointTopHeads() {
      pieData.pointTopHeads[0] = centerX;
      pieData.pointTopHeads[1] = centerY - circleRadius;
      pieData.pointTopHeads[2] = -halfThickness;
    }

    function handleCenterHeads() {
      pieData.centerHeads[0] = centerX;
      pieData.centerHeads[1] = centerY;
      pieData.centerHeads[2] = -halfThickness;
    }

    function handleCenterTails() {
      pieData.centerTails[0] = centerX;
      pieData.centerTails[1] = centerY;
      pieData.centerTails[2] = halfThickness;
    }

    function handleEdgeLeftPointHeads() {
      pieData.edgeLeft.pointHeads[0] = centerX - circleRadius;
      pieData.edgeLeft.pointHeads[1] = centerY;
      pieData.edgeLeft.pointHeads[2] = -halfThickness;
    }

    function handleEdgeLeftPointTails() {
      pieData.edgeLeft.pointTails[0] = centerX - circleRadius;
      pieData.edgeLeft.pointTails[1] = centerY;
      pieData.edgeLeft.pointTails[2] = halfThickness;
    }

    function handleEdgeRightPointHeads() {
      pieData.edgeRight.pointHeads[0] = centerX + circleRadius;
      pieData.edgeRight.pointHeads[1] = centerY;
      pieData.edgeRight.pointHeads[2] = -halfThickness;
    }

    function handleEdgeRightPointTails() {
      pieData.edgeRight.pointTails[0] = centerX + circleRadius;
      pieData.edgeRight.pointTails[1] = centerY;
      pieData.edgeRight.pointTails[2] = halfThickness;
    }

    function handleFaceAndRimVisibility() {
      const angle = ops.rotationAroundCenterXAxisDeg;
      if (angle <= 90) {
        if (angle > 0) {
          pieData.isBottomRimVisibleToUser = true;
        }
        if (angle < 90) {
          pieData.isHeadsVisibleToUser = true;
        }
      } else if (angle <= 180) {
        pieData.isTailsVisibleToUser = true;
        if (angle < 180) {
          pieData.isBottomRimVisibleToUser = true;
        }
      } else if (angle <= 270) {
        pieData.isTopRimVisibleToUser = true;
        if (angle < 270) {
          pieData.isTailsVisibleToUser = true;
        }
      } else {
        pieData.isHeadsVisibleToUser = true;
        pieData.isTopRimVisibleToUser = true;
      }

      if (pieData.isTailsVisibleToUser) {
        pieData.ellipseMethodArgs.isCounterClockwiseOnVisibleFace = false;
      }
    }
  }

  function getInitialPieData() {
    return {
      totalValue,
      slices,
      areSlicesReverted: false,
      pointTopHeads: [0, 0, 0,],
      edgeLeft: {
        pointHeads: [0, 0, 0,],
        pointTails: [0, 0, 0,],
        sliceIndex: -1,
        angleCounterClockwise: 0,
      },
      edgeRight: {
        pointHeads: [0, 0, 0,],
        pointTails: [0, 0, 0,],
        sliceIndex: -1,
        angleCounterClockwise: 0,
      },
      centerHeads: [0, 0, 0,],
      centerTails: [0, 0, 0,],
      ellipseMethodArgs: {
        radiusX: 0,
        radiusY: 0,
        axesRotationCounterClockwise: 0,
        isCounterClockwiseOnVisibleFace: true,
      },
      isHeadsVisibleToUser: false,
      isTailsVisibleToUser: false,
      isTopRimVisibleToUser: false,
      isBottomRimVisibleToUser: false,
    };
  }

  function getTotalValueAndSlices() {
    let totalValue = 0;
    let prevEndHeads = [0, 0, 0,];
    let prevEndTails = [0, 0, 0,];
    const slices = arg.data.map((d, i) => {
      totalValue += d.value;
      const rv = {
        startPointHeads: prevEndHeads,
        startPointTails: prevEndTails,
        endPointHeads: [0, 0, 0,],
        endPointTails: [0, 0, 0,],
        startAngleCounterClockwise: 0,
        endAngleCounterClockwise: 0,
        faceEllipseMethodArguments: {
          startAngle: 0,
          endAngle: 0,
        },
        indexInUserProvidedArray: i,
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
