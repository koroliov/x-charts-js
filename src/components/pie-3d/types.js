//@flow strict
import type { AddComponentArgument, Point } from '../../types.js';

export type AddComponentPie3dArgument = {
  ...Exclude<AddComponentArgument, AddComponentArgument['options']>,
  options: {
    +thicknessPx: number,
    +radiusPx: number,
    +centerXPx: number,
    +centerYPx: number,
    +startAtDeg: number,
    +rotationAroundCenterXAxisDeg: number,
    +rotationAroundCenterZAxisDeg: number,
  },
}

type SliceData = {
  +startPointHeads: Point,
  +startPointTails: Point,
  +endPointHeads: Point,
  +endPointTails: Point,
  +startAngleOnEllipseClockwise: number,
  +endAngleOnEllipseClockwise: number,
  +value: number,
  +color: string,
}

type EdgeData = {
  +pointHeads: Point,
  +pointTails: Point,
  sliceIndex: number,
}

type SomeContext2dEllipseMethodArguments = {
  radiusX: number,
  radiusY: number,
  axesRotationCounterClockwise: number,
  isCounterClockwiseOnVisibleFace: boolean,
}

export type PieData = {
  +totalValue: number,
  +slices: $ReadOnlyArray<SliceData>,
  +pointTopHeads: Point,
  +edgeLeft: EdgeData,
  +edgeRight: EdgeData,
  +centerHeads: Point,
  +centerTails: Point,
  +someEllipseMethodArgs: SomeContext2dEllipseMethodArguments,
  isHeadsVisibleToUser: boolean,
  isTailsVisibleToUser: boolean,
  isRimVisibleToUser: boolean,
}
