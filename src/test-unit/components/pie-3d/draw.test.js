//@flow strict
//$FlowFixMe[cannot-resolve-module]
import tp from 'tape';
import { draw, } from '../../../components/pie-3d/draw.js';
import { createCanvasContext2d, } from
  '../../test-utils/create-node-canvas-context-2d.util.js';
import { compareWithLooksSame, } from
  '../../test-utils/compare-with-looks-same.util.js';
import { writeCanvasToTestDiffDir, } from
  '../../test-utils/write-canvas-to-test-diff-dir.util.js';

tp.test((t) => {
  const testName = '0001-most-common-case';
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
  const { ctx, canvas, } =
    createCanvasContext2d({ w: 470, h: 220, fillStyle: 'white', });
  draw({ ctx, addComponentArg: arg, });

  canvas.toBuffer(async (err: null | Error, buff: Buffer) => {
    //await writeCanvasToTestDiffDir({
    //  canvas: ctx.canvas,
    //  fileNameRelative: './test/diff/current.png',
    //});
    const equal = await compareWithLooksSame({
      buffer: buff,
      expectedFileNameRelative:
        `./test/unit-permanent/components/pie-3d/draw/${ testName }.png`,
      highlightColor: '#000000',
      diffFileNameRelativeOnError: `./test/diff/${ testName }.png`,
    });
    t.ok(equal);
    t.end();
  });
});

tp.test((t) => {
  const testName = '0002-left-edge-on-slices-boundary';
  const arg = {
    type: 'pie-3d',
    zIndex: '1',
    options: {
      thicknessPx: 50,
      radiusPx: 200,
      centerXPx: 235,
      centerYPx: 110,
      startAtDeg: 90,
      rotationAroundCenterXAxisDeg: 70,
      rotationAroundCenterZAxisDeg: 0,
    },
    data: [
      { value: 25, meta: { color: '#f2b5f6' /* pinkish */, }, },
      { value: 25, meta: { color: '#00fff5' /* cyan */, }, },
      { value: 25, meta: { color: '#feed00' /* yellow */, }, },
      { value: 25, meta: { color: '#ff0010' /* red */, }, },
    ],
  };
  const { ctx, canvas, } =
    createCanvasContext2d({ w: 470, h: 220, fillStyle: 'white', });
  draw({ ctx, addComponentArg: arg, });

  canvas.toBuffer(async (err: null | Error, buff: Buffer) => {
    //await writeCanvasToTestDiffDir({
    //  canvas: ctx.canvas,
    //  fileNameRelative: './test/diff/current.png',
    //});
    const equal = await compareWithLooksSame({
      buffer: buff,
      expectedFileNameRelative:
        `./test/unit-permanent/components/pie-3d/draw/${ testName }.png`,
      highlightColor: '#000000',
      diffFileNameRelativeOnError: `./test/diff/${ testName }.png`,
    });
    t.ok(equal);
    t.end();
  });
});

tp.test((t) => {
  const testName = '0003-one-big-rim-slice';
  const arg = {
    type: 'pie-3d',
    zIndex: '1',
    options: {
      thicknessPx: 50,
      radiusPx: 200,
      centerXPx: 235,
      centerYPx: 110,
      startAtDeg: 40,
      rotationAroundCenterXAxisDeg: 70,
      rotationAroundCenterZAxisDeg: 0,
    },
    data: [
      { value: 25, meta: { color: '#37ff00' /* green */, }, },
      { value: 50, meta: { color: '#f2b5f6' /* pinkish */, }, },
    ],
  };
  const { ctx, canvas, } =
    createCanvasContext2d({ w: 470, h: 220, fillStyle: 'white', });
  draw({ ctx, addComponentArg: arg, });

  canvas.toBuffer(async (err: null | Error, buff: Buffer) => {
    //await writeCanvasToTestDiffDir({
    //  canvas: ctx.canvas,
    //  fileNameRelative: './test/diff/current.png',
    //});
    const equal = await compareWithLooksSame({
      buffer: buff,
      expectedFileNameRelative:
        `./test/unit-permanent/components/pie-3d/draw/${ testName }.png`,
      highlightColor: '#000000',
      diffFileNameRelativeOnError: `./test/diff/${ testName }.png`,
    });
    t.ok(equal);
    t.end();
  });
});

tp.test((t) => {
  const testName = '0004-left-edge-slice-index-bigger-right-one';
  const arg = {
    type: 'pie-3d',
    zIndex: '1',
    options: {
      thicknessPx: 50,
      radiusPx: 200,
      centerXPx: 235,
      centerYPx: 110,
      startAtDeg: 230,
      rotationAroundCenterXAxisDeg: 70,
      rotationAroundCenterZAxisDeg: 0,
    },
    data: [
      { value: 25, meta: { color: '#37ff00' /* green */, }, },
      { value: 25, meta: { color: '#ff0000' /* red */, }, },
      { value: 25, meta: { color: '#37ff00' /* green */, }, },
      { value: 50, meta: { color: '#f2b5f6' /* pinkish */, }, },
    ],
  };
  const { ctx, canvas, } =
    createCanvasContext2d({ w: 470, h: 220, fillStyle: 'white', });
  draw({ ctx, addComponentArg: arg, });

  canvas.toBuffer(async (err: null | Error, buff: Buffer) => {
    //await writeCanvasToTestDiffDir({
    //  canvas: ctx.canvas,
    //  fileNameRelative: './test/diff/current.png',
    //});
    const equal = await compareWithLooksSame({
      buffer: buff,
      expectedFileNameRelative:
        `./test/unit-permanent/components/pie-3d/draw/${ testName }.png`,
      highlightColor: '#000000',
      diffFileNameRelativeOnError: `./test/diff/${ testName }.png`,
    });
    t.ok(equal);
    t.end();
  });
});

tp.test((t) => {
  const testName = '0005-tails-visible';
  const arg = {
    type: 'pie-3d',
    zIndex: '1',
    options: {
      thicknessPx: 50,
      radiusPx: 200,
      centerXPx: 230,
      centerYPx: 110,
      startAtDeg: 0,
      rotationAroundCenterXAxisDeg: 110,
      rotationAroundCenterZAxisDeg: 0,
    },
    data: [
      { value: 45, meta: { color: '#37ff00' /* green */, }, },
      { value: 25, meta: { color: '#fffd00' /* yellow */, }, },
    ],
  };
  const { ctx, canvas, } =
    createCanvasContext2d({ w: 470, h: 220, fillStyle: 'white', });
  draw({ ctx, addComponentArg: arg, });

  canvas.toBuffer(async (err: null | Error, buff: Buffer) => {
    //await writeCanvasToTestDiffDir({
    //  canvas: ctx.canvas,
    //  fileNameRelative: './test/diff/current.png',
    //});
    const equal = await compareWithLooksSame({
      buffer: buff,
      expectedFileNameRelative:
        `./test/unit-permanent/components/pie-3d/draw/${ testName }.png`,
      highlightColor: '#000000',
      diffFileNameRelativeOnError: `./test/diff/${ testName }.png`,
    });
    t.ok(equal);
    t.end();
  });
});

tp.test((t) => {
  const testName = '0006-start-at-deg-90-data-75-25';
  const arg = {
    type: 'pie-3d',
    zIndex: '1',
    options: {
      thicknessPx: 50,
      radiusPx: 200,
      centerXPx: 235,
      centerYPx: 110,
      startAtDeg: 90,
      rotationAroundCenterXAxisDeg: 70,
      rotationAroundCenterZAxisDeg: 0,
    },
    data: [
      { value: 75, meta: { color: '#37ff00' /* green */, }, },
      { value: 25, meta: { color: '#fffd00' /* yellow */, }, },
    ],
  };
  const { ctx, canvas, } =
    createCanvasContext2d({ w: 470, h: 220, fillStyle: 'white', });
  draw({ ctx, addComponentArg: arg, });

  canvas.toBuffer(async (err: null | Error, buff: Buffer) => {
    //await writeCanvasToTestDiffDir({
    //  canvas: ctx.canvas,
    //  fileNameRelative: './test/diff/current.png',
    //});
    const equal = await compareWithLooksSame({
      buffer: buff,
      expectedFileNameRelative:
        `./test/unit-permanent/components/pie-3d/draw/${ testName }.png`,
      highlightColor: '#000000',
      diffFileNameRelativeOnError: `./test/diff/${ testName }.png`,
    });
    t.ok(equal);
    t.end();
  });
});

tp.test((t) => {
  const testName = '0007-start-at-deg-90-dot-00001-data-75-25';
  const arg = {
    type: 'pie-3d',
    zIndex: '1',
    options: {
      thicknessPx: 50,
      radiusPx: 200,
      centerXPx: 235,
      centerYPx: 110,
      startAtDeg: 90.00001,
      rotationAroundCenterXAxisDeg: 70,
      rotationAroundCenterZAxisDeg: 0,
    },
    data: [
      { value: 75, meta: { color: '#37ff00' /* green */, }, },
      { value: 25, meta: { color: '#fffd00' /* yellow */, }, },
    ],
  };
  const { ctx, canvas, } =
    createCanvasContext2d({ w: 470, h: 220, fillStyle: 'white', });
  draw({ ctx, addComponentArg: arg, });

  canvas.toBuffer(async (err: null | Error, buff: Buffer) => {
    //await writeCanvasToTestDiffDir({
    //  canvas: ctx.canvas,
    //  fileNameRelative: './test/diff/current.png',
    //});
    const equal = await compareWithLooksSame({
      buffer: buff,
      expectedFileNameRelative:
        `./test/unit-permanent/components/pie-3d/draw/${ testName }.png`,
      highlightColor: '#000000',
      diffFileNameRelativeOnError: `./test/diff/${ testName }.png`,
    });
    t.ok(equal);
    t.end();
  });
});
