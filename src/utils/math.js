//@flow strict
import type { Point, } from '../types.js';

export function calculateDistance({ pointStart, pointEnd, }:
  { pointStart: Point, pointEnd: Point, }): number {
  const distanceX = Math.abs(pointStart[0] - pointEnd[0]);
  const distanceY = Math.abs(pointStart[1] - pointEnd[1]);
  return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
}
