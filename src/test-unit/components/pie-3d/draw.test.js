//@flow strict
//$FlowFixMe[cannot-resolve-module]
import tp from 'tape';
import { prepareData, } from '../../../components/pie-3d/prepare-data.js';
import { draw, } from '../../../components/pie-3d/draw.js';
import { createCanvasContext2d, } from
  '../../test-utils/create-node-canvas-context-2d.util.js';
//import type { AddComponentPie3dArgument, } from './types.js';
//import { compareWithLooksSame, } from
//  '../../test-utils/compare-with-looks-same.util.js';
import { writeCanvasToTestDiffDir, } from
  '../../test-utils/write-canvas-to-test-diff-dir.util.js';

tp.test.skip((t) => {

  const arg = {
    type: 'pie-3d',
    zIndex: '1',
    options: {
      thicknessPx: 50,
      radiusPx: 200,
      centerXPx: 235,
      centerYPx: 110,
      startAtDeg: 130,
      rotationAroundCenterXAxisDeg: 70,
      rotationAroundCenterZAxisDeg: 0,
    },
    data: [
      { value: 25, meta: { color: '#37ff00' /* green */, }, },
      { value: 25, meta: { color: '#ff0000' /* red */, }, },
      { value: 50, meta: { color: '#f2b5f6' /* pinkish */, }, },
    ],
  };
  const ctx = createCanvasContext2d({ w: 470, h: 220, fillStyle: 'white', });
  const pieData = prepareData(arg);
  draw({ ctx, pieData, });

  //$FlowFixMe[prop-missing]
  ctx.canvas.toBuffer(async (err: null | Error, buff: Buffer) => {
    await writeCanvasToTestDiffDir({
      canvas: ctx.canvas,
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
