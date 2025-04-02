//@flow strict
import type {
  AddComponentArgument,
} from '../../types.js';


export type AddComponentPie3dArgument = {
  ...Exclude<AddComponentArgument, AddComponentArgument['options']>,
  options: {
    +thicknessPx: number,
    +radiusPx: number,
    +centerXPx: number,
    +centerYPx: number,
    +startAtPx: number,
    +rotationAroundCenterXAxisDeg: number,
    +rotationAroundCenterZAxisDeg: number,
  },
}

export type Point = [number, number, number,]

export type SliceData = {
  +startPoint: Point,
  +endPoint: Point,
  angle: number,
  +value: number,
  +percentValue: number,
  +color: string,
}

export type EdgeData = {
  +point: Point,
  +sliceIndex: number,
}

export type SideData = {
  +slices: $ReadOnlyArray<SliceData>,
  +leftEdge: EdgeData,
  +rightEdge: EdgeData,
  +center: Point,
}

export type PieData = {
  +heads: SideData,
  +tails: SideData,
}
