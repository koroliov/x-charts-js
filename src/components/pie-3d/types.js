//@flow strict
import type { AddComponentArgument, } from '../../types.js';

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

export type Point = [number, number, number,]

export type SliceData = {
  +startPointHeads: Point,
  +startPointTails: Point,
  +endPointHeads: Point,
  +endPointTails: Point,
  angle: number,
  +value: number,
  +color: string,
}

export type EdgeData = {
  +pointHeads: Point,
  +pointTails: Point,
  +sliceIndex: number,
}

export type PieData = {
  +totalValue: number,
  +slices: $ReadOnlyArray<SliceData>,
  +leftEdge: EdgeData,
  +rightEdge: EdgeData,
  +centerHeads: Point,
  +centerTails: Point,
}
