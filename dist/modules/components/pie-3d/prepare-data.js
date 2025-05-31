//      strict
                                                                      
                                             
import { calculateDistance, getAngleClockwise, } from '../../utils/math.js';

export function prepareData(arg                           )          {
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

    function rotatePoint(p       ) {
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
      let endAngle = 0;
      let { leftEdgeAngle, rightEdgeAngle, } = getEdgeAngles();

      pieData.slices.forEach(handleSlice);
      handleLastSliceTakesAllVisibleRimCase();

      function handleLastSliceTakesAllVisibleRimCase() {
        ['edgeLeft', 'edgeRight',].forEach((edge) => {
          if (pieData[edge].sliceIndex === -1) {
            pieData[edge].sliceIndex = pieData.slices.length - 1;
          }
        });
      }

      function handleSlice(sd                          , i        ) {
        const y = -(Math.sin(startAngle) * circleRadius) + centerY;
        const x = Math.cos(startAngle) * circleRadius + centerX;
        sd.startPointHeads[0] = x;
        sd.startPointHeads[1] = y;
        sd.startPointHeads[2] = -halfThickness;
        handleStartEndAnglesOnSlice(i, sd.startPointHeads);
        sd.startPointTails[0] = x;
        sd.startPointTails[1] = y;
        sd.startPointTails[2] = halfThickness;

        endAngle = sd.value / totalValue * Math.PI * 2;
        findIfSliceIsOnEdge(i);
        startAngle += endAngle;
      }

      function getEdgeAngles() {
        if (startAngle >= Math.PI) {
          return {
            leftEdgeAngle: Math.PI * 3,
            rightEdgeAngle: Math.PI * 2,
          }
        } else {
          return {
            leftEdgeAngle: Math.PI,
            rightEdgeAngle: Math.PI * 2,
          }
        }
      }

      function handleStartEndAnglesOnSlice(sliceIndex        ,
        startPoint       ) {
        const sd = pieData.slices[sliceIndex];
        const sdPrevious = sliceIndex > 0 ? pieData.slices[sliceIndex - 1] :
          pieData.slices[pieData.slices.length - 1];
        sdPrevious.endAngleOnEllipseClockwise = getAngleClockwise({
          startPoint: pieData.edgeRight.pointHeads,
          centerPoint: pieData.centerHeads,
          endPoint: sd.startPointHeads,
        });
        if (!pieData.someEllipseMethodArgs
          .isCounterClockwiseOnVisibleFace) {
          sdPrevious.endAngleOnEllipseClockwise =
            -sdPrevious.endAngleOnEllipseClockwise;
        }
        sd.startAngleOnEllipseClockwise = sdPrevious.endAngleOnEllipseClockwise;
      }

      function findIfSliceIsOnEdge(sliceIndex        ) {
        const endAngleOfSlice = endAngle + startAngle;
        const startAngleOfSlice = startAngle;
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

        function isInThisSliceRange(angle        ) {
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
        pieData.someEllipseMethodArgs
          .isCounterClockwiseOnVisibleFace = false;
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
        sliceIndex: -1,
      },
      edgeRight: {
        pointHeads: [0, 0, 0,],
        pointTails: [0, 0, 0,],
        sliceIndex: -1,
      },
      centerHeads: [0, 0, 0,],
      centerTails: [0, 0, 0,],
      someEllipseMethodArgs: {
        radiusX: 0,
        radiusY: 0,
        axesRotationCounterClockwise: 0,
        isCounterClockwiseOnVisibleFace: true,
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
