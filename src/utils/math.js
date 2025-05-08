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

export function calculateDistance({ pointStart, pointEnd, }:
  { pointStart: Point, pointEnd: Point, }): number {
  const distanceX = Math.abs(pointStart[0] - pointEnd[0]);
  const distanceY = Math.abs(pointStart[1] - pointEnd[1]);
  return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
}
