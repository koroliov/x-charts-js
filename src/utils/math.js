//@flow strict
import type { Point, } from '../types.js';

export function getAngleBetweenTwoPoints({
  startPoint, endPoint, centerPoint, isCounterClockwise,
}: { startPoint: Point, endPoint: Point, centerPoint: Point,
  isCounterClockwise: boolean,
}): number {
  const dotProduct =
    (startPoint[0] - centerPoint[0]) * (endPoint[0] - centerPoint[0]) +
    (startPoint[1] - centerPoint[1]) * (endPoint[1] - centerPoint[1]);
  const crossProduct =
    (startPoint[0] - centerPoint[0]) * (endPoint[1] - centerPoint[1]) -
    (startPoint[1] - centerPoint[1]) * (endPoint[0] - centerPoint[0]);

  const atan2 = Math.atan2(crossProduct, dotProduct);
  let angle = atan2;
  if (atan2 === 0) {
    angle = Math.abs(0);
  }
  if (atan2 < 0) {
    angle = 2 * Math.PI + atan2;
  }
  if (isCounterClockwise) {
    return angle ? 2 * Math.PI - angle : 0;
  }
  return angle;
}

export function calculateDistance({ pointStart, pointEnd, }:
  { pointStart: Point, pointEnd: Point, }): number {
  const distanceX = Math.abs(pointStart[0] - pointEnd[0]);
  const distanceY = Math.abs(pointStart[1] - pointEnd[1]);
  return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
}
