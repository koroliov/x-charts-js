//@flow strict
//$FlowFixMe[cannot-resolve-module]
import tp from 'tape';
import { prepareData } from '../../../components/pie-3d/prepare-data.js';
import { drawDataOnCanvas } from './draw-data-on-canvas.util.js';

tp.test((t) => {
  const addComponentArg = {
    type: 'pie-3d',
    zIndex: '1',
    options: {
      thicknessPx: 50,
      radiusPx: 150,
      centerXPx: 300,
      centerYPx: 250,
      startAtDeg: 20,
      rotationAroundCenterXAxisDeg: 60,
      rotationAroundCenterZAxisDeg: 45,
    },
    data: [
      { value: 40, meta: { color: '#ff0000', }, },
      { value: 25, meta: { color: '#37ff00', }, },
      { value: 35, meta: { color: '#000aff', }, },
    ],
  };

  const expected = {
    totalValue: 100,
    slices: [
      {
        startPointHeads: [20, 30, 0],
        startPointTails: [0, 0, 0],
        endPointHeads: [0, 0, 0,],
        endPointTails: [0, 0, 50,],
        value: 40,
        color: '#ff0000',
      },
      {
        startPointHeads: [50, 60, 0],
        startPointTails: [0, 0, 0],
        endPointHeads: [0, 0, 0,],
        endPointTails: [0, 0, 50,],
        value: 25,
        color: '#37ff00',
      },
      {
        startPointHeads: [80, 90, 0],
        startPointTails: [0, 0, 0],
        endPointHeads: [0, 0, 0,],
        endPointTails: [0, 0, 50,],
        value: 35,
        color: '#000aff',
      },
    ],
    pointTopHeads: [300, 150, 0,],
    edgeLeft: {
      pointHeads: [130, 320, 0,],
      pointTails: [0, 0, 0,],
      sliceIndex: 0,
    },
    edgeRight: {
      pointHeads: [430, 180, 0,],
      pointTails: [400, 100, 0,],
      sliceIndex: 0,
    },
    centerHeads: [300, 250, 0,],
    centerTails: [280, 220, 50,],
    someEllipseMethodArgs: {
      radiusX: 200,
      radiusY: 100,
      rotationClockwise: 0.2,
    },
  };

  const actual = prepareData(addComponentArg);

  drawDataOnCanvas({
    serverAbsFilePath: '/test/served-tmp/foo.html',
    actual: actual,
    expected: expected,
    canvasWidthPx: 600,
    canvasHeightPx: 400,
    drawHeads: true,
    drawTails: false,
    drawDotsHeads: true,
    drawDotsTails: false,
    drawLineToRightEdgeHeads: true,
    drawLineToRightEdgeTails: false,
  });
  t.equal(expected, expected);
  t.end();
});
