//@flow strict
//$FlowFixMe[cannot-resolve-module]
import tp from 'tape';
//$FlowFixMe[cannot-resolve-module]
import { createCanvas } from 'canvas';
import { compareWithLooksSame, } from
  '../../compare-with-looks-same.util.js';
//$FlowFixMe[cannot-resolve-module]
import looksSame from 'looks-same';

tp.test((t) => {
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext('2d');

  ctx.rotate(0);
  ctx.fillStyle = 'red';
  ctx.fillRect(100, 100, 50, 50);

  canvas.toBuffer(async (err, buff) => {
    const equal = await compareWithLooksSame({
      buffer: buff,
      expectedFileNameRelative: './test/unit-permanent/foo.png',
      diffFileNameRelativeOnError: './test/diff/foo-biff.png',
    });
    t.ok(equal);
    t.end();
  });
});
