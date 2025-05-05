//@flow strict
//$FlowFixMe[cannot-resolve-module]
import tp from 'tape';
import { prepareData } from '../../../components/pie-3d/prepare-data.js';
import { drawDataOnCanvas } from './draw-data-on-canvas.util.js';
import { writeToTestDiffDir } from '../../write-to-test-diff-dir.util.js';

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
        startPointHeads: [ 381.53109645970306, 132.19218914310065,
          44.42971990890358, ],
        startPointTails: [ 412.14971824449276, 162.81081092789037,
          69.42971990890359, ],
        endPointHeads: [ 183.42492218758034, 337.33932129544024,
          35.80634285542375, ],
        endPointTails: [ 214.04354397237006, 367.95794308022994,
          60.80634285542376, ],
        value: 40,
        color: '#ff0000',
      },
      {
        startPointHeads: [ 183.42492218758034, 337.33932129544024,
          35.80634285542375, ],
        startPointTails: [ 214.04354397237006, 367.95794308022994,
          60.80634285542376, ],
        endPointHeads: [ 321.74284325998553, 330.21435629394443,
          -124.8715572551245, ],
        endPointTails: [ 352.3614650447753, 360.8329780787342,
          -99.87155725512449, ],
        value: 25,
        color: '#37ff00',
      },
      {
        startPointHeads: [ 321.74284325998553, 330.21435629394443,
          -124.8715572551245, ],
        startPointTails: [ 352.3614650447753, 360.8329780787342,
          -99.87155725512449, ],
        endPointHeads: [ 381.53109645970306, 132.19218914310065,
          44.42971990890358, ],
        endPointTails: [ 412.14971824449276, 162.81081092789037,
          69.42971990890359, ],
        value: 35,
        color: '#000aff',
      }
    ],
    pointTopHeads: [ 246.96699141100893, 196.9669914110089, 129.9038105676658,
      ],
    edgeLeft: {
      pointHeads: [ 193.93398282201787, 356.06601717798213, 0, ],
      pointTails: [ 224.5526046068076, 386.6846389627718, 25.000000000000007, ],
      sliceIndex: 1,
    },
    edgeRight: {
      pointHeads: [ 406.06601717798213, 143.93398282201787, 0, ],
      pointTails: [ 436.6846389627718, 174.55260460680762, 25.000000000000007,
        ],
      sliceIndex: 2,
    },
    centerHeads: [ 300, 250, 0, ],
    centerTails: [ 330.61862178478975, 280.61862178478975, 25.000000000000007,
      ],
    someEllipseMethodArgs: {
      radiusX: 150,
      radiusY: 75.00000000000003,
      rotationClockwise: -0.7853981633974483,
    }
  };

  const actual = prepareData(addComponentArg);
  //writeToTestDiffDir({ actual, expected, });
  //drawDataOnCanvas({
  //  serverAbsFilePath: '/test/served-tmp/foo.html',
  //  actual: actual,
  //  expected: expected,
  //  canvasWidthPx: 600,
  //  canvasHeightPx: 500,
  //  drawHeads: true,
  //  drawTails: true,
  //  drawDotsHeads: true,
  //  drawDotsTails: true,
  //  drawLineToRightEdgeHeads: true,
  //  drawLineToRightEdgeTails: true,
  //});
  t.deepEqual(actual, expected);
  t.end();
});
