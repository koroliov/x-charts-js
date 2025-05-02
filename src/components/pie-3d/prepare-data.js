//@flow strict
import type { AddComponentPie3dArgument, PieData, Point, } from './types.js';

export function prepareData(arg: AddComponentPie3dArgument): PieData {
  const ops = arg.options;
  const { slices, totalValue, } = getTotalValueAndSlices();
  const pieData = getInitialPieData();
  setPointsOnNonRotatedCircle();
  applyRotations();
  calculateEllipseMethodArgs();
  return pieData;

  function calculateEllipseMethodArgs() {
    pieData.someEllipseMethodArgs.radiusY =
      Math.sqrt(
        Math.pow(
          Math.abs(pieData.pointTopHeads[0] - pieData.centerHeads[0]), 2
        ) +
        Math.pow(
          Math.abs(pieData.pointTopHeads[1] - pieData.centerHeads[1]), 2
        )
      );
    
    pieData.someEllipseMethodArgs.radiusX =
      Math.sqrt(
        Math.pow(
          Math.abs(pieData.edgeRight.pointHeads[0] - pieData.centerHeads[0]), 2
        ) +
        Math.pow(
          Math.abs(pieData.edgeRight.pointHeads[1] - pieData.centerHeads[1]), 2
        )
      );

    pieData.someEllipseMethodArgs.rotationClockwise =
      -(ops.rotationAroundCenterZAxisDeg / 180 * Math.PI);
  }

  function applyRotations() {
    const centerX = ops.centerXPx;
    const centerY = ops.centerYPx;
    const rotationCxRad = -ops.rotationAroundCenterXAxisDeg / 180 * Math.PI;
    const rotationCzRad = -ops.rotationAroundCenterZAxisDeg / 180 * Math.PI;

    const rotationMatrixX = [
      [1, 0,                        0,                      ],
      [0, Math.cos(rotationCxRad), -Math.sin(rotationCxRad),],
      [0, Math.sin(rotationCxRad),  Math.cos(rotationCxRad),],
    ];
    const rotationMatrixZ = [
      [Math.cos(rotationCzRad), -Math.sin(rotationCzRad), 0,],
      [Math.sin(rotationCzRad),  Math.cos(rotationCzRad), 0,],
      [0,                        0,                       1,],
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
