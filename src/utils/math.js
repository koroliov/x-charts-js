//@flow strict
import type { Point, } from '../types.js';

export function getAngleCounterClockwise({ startPoint, endPoint, centerPoint, }:
  { startPoint: Point, endPoint: Point, centerPoint: Point, }): number {
  const dotProduct =
    (startPoint[0] - centerPoint[0]) * (endPoint[0] - centerPoint[0]) +
    (startPoint[1] - centerPoint[1]) * (endPoint[1] - centerPoint[1]);
  const crossProduct =
    (startPoint[0] - centerPoint[0]) * (endPoint[1] - centerPoint[1]) -
    (startPoint[1] - centerPoint[1]) * (endPoint[0] - centerPoint[0]);
  const atan2 = Math.atan2(crossProduct, dotProduct);

  if (atan2 > 0) {
    return 2 * Math.PI - atan2;
  }
  return -atan2;
}
