//@flow strict
//$FlowFixMe[cannot-resolve-module]
import tp from 'tape';
//$FlowFixMe[cannot-resolve-module]
import { createCanvas } from 'canvas';
import { writeCanvasToTestDiffDir } from
  '../../write-canvas-to-test-diff-dir.util.js';

tp.test((t) => {
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext('2d');

  ctx.rotate(0.5);
  ctx.fillRect(50, 50, 50, 100);
  //writeCanvasToTestDiffDir({
  //  fileNameRelative: './test/diff/foo.png',
  //  canvas,
  //});

  t.equal(1, 1);
  t.end();
});
