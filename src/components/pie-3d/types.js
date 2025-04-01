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

export type SliceDrawingData = [
  +startPoint: Point,
  +endPoint: Point,
  +color: string,
]

export type EdgeDrawingData = {
  +point: Point,
  +sliceIndex: number,
}

export type SideDrawingData = {
  +slices: $ReadOnlyArray<SliceDrawingData>,
  +leftEdge: EdgeDrawingData,
  +rightEdge: EdgeDrawingData,
}

export type PieDrawingData = {
  +heads: SideDrawingData,
  +tails: SideDrawingData,
}
