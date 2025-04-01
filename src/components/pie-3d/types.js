//@flow strict
import type {
  AddComponentConfig,
} from '../../types.js';


export type AddComponentPie3dConfig = {
  ...Exclude<AddComponentConfig, AddComponentConfig['options']>,
  options: {
    +thickness: StringSuffix<'px'>,
    +radius: StringSuffix<'px'>,
    +centerX: StringSuffix<'px'>,
    +centerY: StringSuffix<'px'>,
    +startAt: StringSuffix<'deg'>,
    +rotationAroundCenterXAxis: StringSuffix<'deg'>,
    +rotationAroundCenterZAxis: StringSuffix<'deg'>,
  },
}

export type Point = [number, number, number,]

export type SliceData = [
  +startPoint: Point,
  +endPoint: Point,
  ellipticAngle: number,
  +value: number,
  +percentValue: number,
  +color: string,
]

export type EdgeData = {
  +point: Point,
  +sliceIndex: number,
}

export type SideData = {
  +slices: $ReadOnlyArray<SliceData>,
  +leftEdge: EdgeData,
  +rightEdge: EdgeData,
  +center: [number, number],
}

export type PieData = {
  +heads: SideData,
  +tails: SideData,
}
