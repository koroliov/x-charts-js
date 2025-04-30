//@flow strict
import type { AddComponentPie3dArgument, PieData, } from './types.js';

export function prepareData(arg: AddComponentPie3dArgument): PieData {
  const ops = arg.options;
  const { slices, totalValue, } = traverseComponentData();
  const pieData = {
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
    centerHeads: [ops.centerXPx, ops.centerYPx, 0,],
    centerTails: [ops.centerXPx, ops.centerYPx, ops.thicknessPx,],
    someEllipseMethodArgs: {
      radiusX: 0,
      radiusY: 0,
      rotationClockwise: 0,
    },
  };

  //c.ellipse(x, y, radiusX, radiusY, rotation, startAng, endAng,
    //antiClockWise?), antiClockWise default false
  //apply modifications
  //new:
    //transform center points X, Z
    //traverseSlices()
      //total value arc length (from radius)
      //calculate points:
        //start (take prev)
        //end find length on arc for
  //
  //========
  //old:
  //
  //prepare center points
    //transform tails center point
      //rotate around CX, CZ
  //prepare edges points
  //
  //traverse slices
    //calculate start points of slice 0
      //(depends on startAtDeg)
      //apply transformations
        //rotate around CX
        //rotate around CZ
    //calculate end points of each slice
      //apply transformations
    //calculate angle
    //set sliceIndex for edges
  //
  //Transform edgesPoints
  //Calculate angles
  //
  return pieData;

  function traverseComponentData() {
    let totalValue = 0;
    const thickness = ops.thicknessPx;
    let prevEndHeads = [0, 0, 0,];
    let prevEndTails = [0, 0, thickness,];
    const slices = arg.data.map((d) => {
      totalValue += d.value;
      const rv = {
        startPointHeads: prevEndHeads,
        startPointTails: prevEndTails,
        endPointHeads: [0, 0, 0,],
        endPointTails: [0, 0, thickness,],
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
