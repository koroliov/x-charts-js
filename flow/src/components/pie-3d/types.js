//@flow strict
import type { XChartsAddMethodArgument, Point, } from '../../types.js';

export type DataEntry = {
  +value: number,
  +meta: {
    +faceColor: string,
    +rimColor: string,
  },
}

export type AddMethodArgumentPie3d = {
  +type: XChartsAddMethodArgument['type'],
  +zIndex: XChartsAddMethodArgument['zIndex'],
  +data: $ReadOnlyArray<DataEntry>,
  +options: {
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
  startPointHeads: Point,
  startPointTails: Point,
  +endPointHeads: Point,
  +endPointTails: Point,
  startAngleCounterClockwise: number,
  endAngleCounterClockwise: number,
  +faceEllipseMethodArguments: {
    startAngle: number,
    endAngle: number,
  },
  +indexInUserProvidedArray: number,
  +value: number,
  +faceColor: string,
  +rimColor: string,
}

export type Context2dEllipseMethodArguments = {
  +centerX: number,
  +centerY: number,
  +radiusX: number,
  +radiusY: number,
  angleStart: number,
  angleEnd: number,
  +axesRotationCounterClockwise: number,
  isCounterClockwise: boolean,
}

export type RimSliceData = {
  +pointStartOnHeads: Point,
  +pointStartOnTails: Point,
  +pointEndOnTails: Point,
  +pointEndOnHeads: Point,
  +ellipseArgumentsOnTails: Context2dEllipseMethodArguments,
  +ellipseArgumentsOnHeads: Context2dEllipseMethodArguments,
  +rimColor: string,
}

export type RimSlicesData = Array<RimSliceData>

type EdgeData = {
  +pointHeads: Point,
  +pointTails: Point,
  +sliceIndex: number,
  +angleCounterClockwise: number,
}

export type PieData = {
  +totalValue: number,
  +slices: SliceData[],
  +isPieReversed: boolean,
  +pointTopHeads: Point,
  +edgeLeft: EdgeData,
  +edgeRight: EdgeData,
  +centerHeads: Point,
  +centerTails: Point,
  +ellipseMethodArgs: {
    +radiusX: number,
    +radiusY: number,
    +axesRotationCounterClockwise: number,
    +isCounterClockwiseOnVisibleFace: boolean,
  },
  +isHeadsVisibleToUser: boolean,
  +isTailsVisibleToUser: boolean,
  +isRimVisibleToUser: boolean,
}
