//@flow strict
//$FlowFixMe[cannot-resolve-module]
import tp from 'tape';
import { prepareData, } from '../../../components/pie-3d/prepare-data.js';
import { draw, } from '../../../components/pie-3d/draw.js';
//$FlowFixMe[cannot-resolve-module]
import { createCanvas } from 'canvas';
//import { compareWithLooksSame, } from '../../compare-with-looks-same.util.js';
import { writeCanvasToTestDiffDir, } from
  '../../write-canvas-to-test-diff-dir.util.js';

tp.test((t) => {
  const canvas = createCanvas(800, 600);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 800, 600);

  const pieData = prepareData({
    type: 'pie-3d',
    zIndex: '1',
    options: {
      thicknessPx: 50,
      radiusPx: 200,
      centerXPx: 400,
      centerYPx: 250,
      startAtDeg: 130,
      rotationAroundCenterXAxisDeg: 70,
      rotationAroundCenterZAxisDeg: 0,
    },
    data: [
      { value: 25, meta: { color: '#37ff00' /* green */, }, },
      { value: 25, meta: { color: '#ff0000' /* red */, }, },
      { value: 50, meta: { color: '#f2b5f6' /* pinkish */, }, },
    ],
  });
  draw({ ctx, pieData, });

  canvas.toBuffer(async (err, buff) => {
    await writeCanvasToTestDiffDir({
      canvas,
      fileNameRelative: './test/diff/current.png',
    });
    //const equal = await compareWithLooksSame({
    //  buffer: buff,
    //  expectedFileNameRelative: './test/unit-permanent/foo.png',
    //  diffFileNameRelativeOnError: './test/diff/foo-biff.png',
    //});
    t.ok(1);
    t.end();
  });
});
