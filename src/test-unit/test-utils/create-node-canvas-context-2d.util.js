//@flow strict
//$FlowFixMe[cannot-resolve-module]
import { createCanvas } from 'canvas';

type ToBufferCalback =
  (err: null | Error, buffer: Buffer) => Promise<void> | void

export function createCanvasContext2d(arg: {
  w: number,
  h: number,
  fillStyle: string | 'transparent',
}): {
  ctx: CanvasRenderingContext2D,
  canvas: {
    toBuffer: (cb: ToBufferCalback) => void,
  },
} {
  const canvas = createCanvas(arg.w, arg.h);
  const ctx = canvas.getContext('2d');

  if (arg.fillStyle !== 'transparent') {
    ctx.fillStyle = arg.fillStyle;
    ctx.fillRect(0, 0, 800, 600);
  }
  return ctx;
}
