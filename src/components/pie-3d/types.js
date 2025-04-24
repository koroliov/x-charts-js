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

type Point = [number, number, number,]

type SliceData = {
  +startPointHeads: Point,
  +startPointTails: Point,
  +endPointHeads: Point,
  +endPointTails: Point,
  +value: number,
  +color: string,
}

type EdgeData = {
  +pointHeads: Point,
  +pointTails: Point,
  sliceIndex: number,
}

export type PieData = {
  +totalValue: number,
  +slices: $ReadOnlyArray<SliceData>,
  +pointTopHeads: Point,
  +edgeLeft: EdgeData,
  +edgeRight: EdgeData,
  +centerHeads: Point,
  +centerTails: Point,
}
