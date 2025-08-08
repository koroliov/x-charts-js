//@flow strict
//$FlowFixMe[cannot-resolve-module]
import tp from 'tape';
import { draw, } from '../../../src/components/pie-3d/draw.js';
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
      highlightColor: '#0300ff',
      //diffFileNameRelativeOnError: `./test/diff/diff-${ testName }.png`,
      diffFileNameRelativeOnError: '',
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
      //diffFileNameRelativeOnError: `./test/diff/diff-${ testName }.png`,
      diffFileNameRelativeOnError: '',
    });
    t.ok(equal);
    t.end();
  });
});

tp.test((t) => {
  const testName = '0002-01-start-at-0-deg';
  const arg = {
    type: 'pie-3d',
    zIndex: '1',
    options: {
      thicknessPx: 50,
      radiusPx: 200,
      centerXPx: 235,
      centerYPx: 110,
      startAtDeg: 0,
      rotationAroundCenterXAxisDeg: 70,
      rotationAroundCenterZAxisDeg: 0,
    },
    data: [
      { value: 25, meta: { color: '#37ff00' /* green */, }, },
      { value: 25, meta: { color: '#0b08f7' /* blue */, }, },
      { value: 25, meta: { color: '#ff0000' /* red */, }, },
      { value: 25, meta: { color: '#f2b5f6' /* pinkish */, }, },
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
      //diffFileNameRelativeOnError: `./test/diff/${ testName }.png`,
      diffFileNameRelativeOnError: '',
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
      //diffFileNameRelativeOnError: `./test/diff/${ testName }.png`,
      diffFileNameRelativeOnError: '',
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
      //diffFileNameRelativeOnError: `./test/diff/diff-${ testName }.png`,
      diffFileNameRelativeOnError: '',
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
      //diffFileNameRelativeOnError: `./test/diff/${ testName }.png`,
      diffFileNameRelativeOnError: '',
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
      //diffFileNameRelativeOnError: `./test/diff/${ testName }.png`,
      diffFileNameRelativeOnError: '',
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
      //diffFileNameRelativeOnError: `./test/diff/diff-${ testName }.png`,
      diffFileNameRelativeOnError: '',
    });
    t.ok(equal);
    t.end();
  });
});

tp.test((t) => {
  const testName = '0008-rim-bar-1-slice';
  const arg = {
    type: 'pie-3d',
    zIndex: '1',
    options: {
      thicknessPx: 50,
      radiusPx: 200,
      centerXPx: 235,
      centerYPx: 35,
      startAtDeg: 90,
      rotationAroundCenterXAxisDeg: 90,
      rotationAroundCenterZAxisDeg: 0,
    },
    data: [
      { value: 75, meta: { color: '#37ff00' /* green */, }, },
      { value: 25, meta: { color: '#fffd00' /* yellow */, }, },
    ],
  };
  const { ctx, canvas, } =
    createCanvasContext2d({ w: 470, h: 70, fillStyle: 'white', });
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
      //diffFileNameRelativeOnError: `./test/diff/${ testName }.png`,
      diffFileNameRelativeOnError: '',
    });
    t.ok(equal);
    t.end();
  });
});

tp.test((t) => {
  const testName = '0009-1-big-slice-on-invisible-rim';
  const arg = {
    type: 'pie-3d',
    zIndex: '1',
    options: {
      thicknessPx: 50,
      radiusPx: 200,
      centerXPx: 235,
      centerYPx: 110,
      startAtDeg: 315,
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
      //diffFileNameRelativeOnError: `./test/diff/${ testName }.png`,
      diffFileNameRelativeOnError: '',
    });
    t.ok(equal);
    t.end();
  });
});

tp.test((t) => {
  const testName = '0010-rotation-over-center-x-axis-greater-180-deg';
  const arg = {
    type: 'pie-3d',
    zIndex: '1',
    options: {
      thicknessPx: 50,
      radiusPx: 200,
      centerXPx: 235,
      centerYPx: 200,
      startAtDeg: 0,
      rotationAroundCenterXAxisDeg: 220,
      rotationAroundCenterZAxisDeg: 0,
    },
    data: [
      { value: 75, meta: { color: '#37ff00' /* green */, }, },
      { value: 5, meta: { color: '#21f0f5' /* cyan */, }, },
      { value: 25, meta: { color: '#fffd00' /* yellow */, }, },
    ],
  };
  const { ctx, canvas, } =
    createCanvasContext2d({ w: 470, h: 400, fillStyle: 'white', });
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
      //diffFileNameRelativeOnError: `./test/diff/${ testName }.png`,
      diffFileNameRelativeOnError: '',
    });
    t.ok(equal);
    t.end();
  });
});

tp.test((t) => {
  const testName = '0011-rotation-100-deg-start-ang-0';
  const arg = {
    type: 'pie-3d',
    zIndex: '1',
    options: {
      thicknessPx: 50,
      radiusPx: 200,
      centerXPx: 235,
      centerYPx: 110,
      startAtDeg: 0,
      rotationAroundCenterXAxisDeg: 100,
      rotationAroundCenterZAxisDeg: 0,
    },
    data: [
      { value: 25, meta: { color: '#37ff00' /* green */, }, },
      { value: 25, meta: { color: '#0b08f7' /* blue */, }, },
      { value: 25, meta: { color: '#ff0000' /* red */, }, },
      { value: 25, meta: { color: '#f2b5f6' /* pinkish */, }, },
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
      //diffFileNameRelativeOnError: `./test/diff/${ testName }.png`,
      diffFileNameRelativeOnError: '',
    });
    t.ok(equal);
    t.end();
  });
});

tp.test((t) => {
  const testName = '0012-rotation-cx-gt-90-start-angle-gt-pi';
  const arg = {
    type: 'pie-3d',
    zIndex: '1',
    options: {
      thicknessPx: 50,
      radiusPx: 200,
      centerXPx: 235,
      centerYPx: 120,
      startAtDeg: 247,
      rotationAroundCenterXAxisDeg: 113,
      rotationAroundCenterZAxisDeg: 0,
    },
    data: [
      { value: 225, meta: { color: '#37ff00' /* green */, }, },
      { value: 5, meta: { color: '#03fff0' /* cayan */, }, },
      { value: 8, meta: { color: '#ffc04b' /* orange */, }, },
      { value: 25, meta: { color: '#ff0000' /* red */, }, },
      { value: 50, meta: { color: '#f2b5f6' /* pinkish */, }, },
    ],
  };
  const { ctx, canvas, } =
    createCanvasContext2d({ w: 470, h: 235, fillStyle: 'white', });
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
      //diffFileNameRelativeOnError: `./test/diff/${ testName }.png`,
      diffFileNameRelativeOnError: '',
    });
    t.ok(equal);
    t.end();
  });
});

tp.test((t) => {
  const testName =
    '0013-rotation-cx-gt-90-start-angle-gt-pi-start-end-slice-is-same';
  const arg = {
    type: 'pie-3d',
    zIndex: '1',
    options: {
      thicknessPx: 50,
      radiusPx: 200,
      centerXPx: 235,
      centerYPx: 120,
      startAtDeg: 247,
      rotationAroundCenterXAxisDeg: 110,
      rotationAroundCenterZAxisDeg: 0,
    },
    data: [
      { value: 225, meta: { color: '#37ff00' /* green */, }, },
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
      //diffFileNameRelativeOnError: `./test/diff/${ testName }.png`,
      diffFileNameRelativeOnError: '',
    });
    t.ok(equal);
    t.end();
  });
});
