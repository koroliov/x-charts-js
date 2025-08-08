//@flow strict
//$FlowFixMe[cannot-resolve-module]
import tp from 'tape';
import { prepareData, } from '../../../src/components/pie-3d/prepare-data.js';
import { prepareRimSlicesData, } from
  '../../../src/components/pie-3d/prepare-rim-slices-data.js';
import { writeToTestDiffDir } from
  '../../test-utils/write-to-test-diff-dir.util.js';
import { drawDataOnCanvas, } from './draw-data-on-canvas.util.js';
import { drawRimSlicesDataOnCanvas, } from
  './draw-rim-slices-data-on-canvas.util.js';

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
      { value: 40, meta: { color: '#ff0000' /* red */, }, },
      { value: 25, meta: { color: '#37ff00' /* green */, }, },
      { value: 35, meta: { color: '#000aff' /* blue */, }, },
    ],
  };
  const pieData = prepareData(addComponentArg);
  const expected: ReturnType<typeof prepareRimSlicesData> = [
    {
      "color": "#37ff00",
      "pointStartOnHeads": [
        178.624671929623,
        340.75670628558726,
        -12.500000000000004,
      ],
      "pointStartOnTails": [
        209.24329371441274,
        371.375328070377,
        12.500000000000004,
      ],
      "pointEndOnTails": [
        337.05215415238035,
        345.52366718633925,
        -112.3715572551245,
      ],
      "pointEndOnHeads": [
        306.43353236759066,
        314.90504540154956,
        -137.37155725512451,
      ],
      "ellipseArgumentsOnHeads": {
        "centerX": 284.6906891076051,
        "centerY": 234.69068910760512,
        "radiusX": 150,
        "radiusY": 74.99999999999999,
        "axesRotationCounterClockwise": -0.7853981633974483,
        "angleStart": -4.433136300065597,
        "angleEnd": -3.141592653589793,
        "isCounterClockwise": false,
      },
      "ellipseArgumentsOnTails": {
        "centerX": 315.3093108923949,
        "centerY": 265.3093108923949,
        "radiusX": 150,
        "radiusY": 74.99999999999999,
        "axesRotationCounterClockwise": -0.7853981633974483,
        "angleStart": -3.141592653589793,
        "angleEnd": -4.433136300065597,
        "isCounterClockwise": true,
      },
    },
    {
      "color": "#000aff",
      "pointStartOnHeads": [
        306.43353236759066,
        314.90504540154956,
        -137.37155725512451,
      ],
      "pointStartOnTails": [
        337.05215415238035,
        345.52366718633925,
        -112.3715572551245,
      ],
      "pointEndOnTails": [
        421.375328070377,
        159.24329371441274,
        12.500000000000004,
      ],
      "pointEndOnHeads": [
        390.75670628558726,
        128.62467192962302,
        -12.500000000000004,
      ],
      "ellipseArgumentsOnHeads": {
        "centerX": 284.6906891076051,
        "centerY": 234.69068910760512,
        "radiusX": 150,
        "radiusY": 74.99999999999999,
        "axesRotationCounterClockwise": -0.7853981633974483,
        "angleStart": -6.283185307179586,
        "angleEnd": -4.433136300065597,
        "isCounterClockwise": false,
      },
      "ellipseArgumentsOnTails": {
        "centerX": 315.3093108923949,
        "centerY": 265.3093108923949,
        "radiusX": 150,
        "radiusY": 74.99999999999999,
        "axesRotationCounterClockwise": -0.7853981633974483,
        "angleStart": -4.433136300065597,
        "angleEnd": -6.283185307179586,
        "isCounterClockwise": true,
      },
    },
  ];

  const actual = prepareRimSlicesData(pieData);
  //writeToTestDiffDir({ actual, expected, });
  //drawDataOnCanvas({
  //  serverAbsFilePath: '/test/served-tmp/rim-slices.html',
  //  actual: pieData,
  //  expected: pieData,
  //  canvasWidthPx: 800,
  //  canvasHeightPx: 500,
  //  drawHeads: true,
  //  drawTails: true,
  //  drawDotsHeads: true,
  //  drawDotsTails: true,
  //  drawLineToRightEdgeHeads: true,
  //  drawLineToRightEdgeTails: true,
  //  angleStartSliceIndex: 1,
  //  angleEndSliceIndex: 1,
  //});
  //drawRimSlicesDataOnCanvas({
  //  serverAbsFilePath: '/test/served-tmp/rim-slices.html',
  //  actual: actual,
  //  expected: expected,
  //  actualIsHeadsVisibleToUser: pieData.isHeadsVisibleToUser ?
  //    'true' : 'false',
  //  expectedIsHeadsVisibleToUser: 'true',
  //  canvasWidthPx: 800,
  //  canvasHeightPx: 500,
  //});
  t.deepEqual(actual, expected);
  t.end();
});

tp.test((t) => {
  const addComponentArg = {
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
  const pieData = prepareData(addComponentArg);
  const expected: ReturnType<typeof prepareRimSlicesData> = [
    {
      "color": "#f2b5f6",
      "pointStartOnHeads": [
        35,
        86.5076844803523,
        -8.55050358314172,
      ],
      "pointStartOnTails": [
        35,
        133.49231551964772,
        8.55050358314172,
      ],
      "pointEndOnTails": [
        106.44247806269212,
        185.8928415655247,
        -135.41875849544908,
      ],
      "pointEndOnHeads": [
        106.44247806269212,
        138.90821052622928,
        -152.51976566173255,
      ],
      "ellipseArgumentsOnHeads": {
        "centerX": 235,
        "centerY": 86.5076844803523,
        "radiusX": 200,
        "radiusY": 68.40402866513377,
        "axesRotationCounterClockwise": -0,
        "angleStart": -10.297442586766543,
        "angleEnd": -9.42477796076938,
        "isCounterClockwise": false,
      },
      "ellipseArgumentsOnTails": {
        "centerX": 235,
        "centerY": 133.49231551964772,
        "radiusX": 200,
        "radiusY": 68.40402866513377,
        "axesRotationCounterClockwise": -0,
        "angleStart": -9.42477796076938,
        "angleEnd": -10.297442586766543,
        "isCounterClockwise": true,
      },
    },
    {
      "color": "#37ff00",
      "pointStartOnHeads": [
        106.44247806269212,
        138.90821052622928,
        -152.51976566173255,
      ],
      "pointStartOnTails": [
        106.44247806269212,
        185.8928415655247,
        -135.41875849544908,
      ],
      "pointEndOnTails": [
        340.98385284664096,
        191.50222179854399,
        -150.83040402280471,
      ],
      "pointEndOnHeads": [
        340.98385284664096,
        144.5175907592486,
        -167.93141118908818,
      ],
      "ellipseArgumentsOnHeads": {
        "centerX": 235,
        "centerY": 86.5076844803523,
        "radiusX": 200,
        "radiusY": 68.40402866513377,
        "axesRotationCounterClockwise": -0,
        "angleStart": -5.270894341022875,
        "angleEnd": -4.014257279586958,
        "isCounterClockwise": false,
      },
      "ellipseArgumentsOnTails": {
        "centerX": 235,
        "centerY": 133.49231551964772,
        "radiusX": 200,
        "radiusY": 68.40402866513377,
        "axesRotationCounterClockwise": -0,
        "angleStart": -4.014257279586958,
        "angleEnd": -5.270894341022875,
        "isCounterClockwise": true,
      },
    },
    {
      "color": "#ff0000",
      "pointStartOnHeads": [
        340.98385284664096,
        144.5175907592486,
        -167.93141118908818,
      ],
      "pointStartOnTails": [
        340.98385284664096,
        191.50222179854399,
        -150.83040402280471,
      ],
      "pointEndOnTails": [
        435,
        133.49231551964772,
        8.55050358314172,
      ],
      "pointEndOnHeads": [
        435,
        86.5076844803523,
        -8.55050358314172,
      ],
      "ellipseArgumentsOnHeads": {
        "centerX": 235,
        "centerY": 86.5076844803523,
        "radiusX": 200,
        "radiusY": 68.40402866513377,
        "axesRotationCounterClockwise": -0,
        "angleStart": -6.283185307179586,
        "angleEnd": -5.270894341022875,
        "isCounterClockwise": false,
      },
      "ellipseArgumentsOnTails": {
        "centerX": 235,
        "centerY": 133.49231551964772,
        "radiusX": 200,
        "radiusY": 68.40402866513377,
        "axesRotationCounterClockwise": -0,
        "angleStart": -5.270894341022875,
        "angleEnd": -6.283185307179586,
        "isCounterClockwise": true,
      },
    },
  ];

  const actual = prepareRimSlicesData(pieData);
  //writeToTestDiffDir({ actual, expected, });
  //drawDataOnCanvas({
  //  serverAbsFilePath: '/test/served-tmp/rim-slices.html',
  //  actual: pieData,
  //  expected: pieData,
  //  canvasWidthPx: 800,
  //  canvasHeightPx: 500,
  //  drawHeads: true,
  //  drawTails: true,
  //  drawDotsHeads: true,
  //  drawDotsTails: true,
  //  drawLineToRightEdgeHeads: true,
  //  drawLineToRightEdgeTails: true,
  //  angleStartSliceIndex: 1,
  //  angleEndSliceIndex: 1,
  //});
  //drawRimSlicesDataOnCanvas({
  //  serverAbsFilePath: '/test/served-tmp/rim-slices.html',
  //  actual: actual,
  //  expected: expected,
  //  actualIsHeadsVisibleToUser: pieData.isHeadsVisibleToUser ?
  //    'true' : 'false',
  //  expectedIsHeadsVisibleToUser: 'true',
  //  canvasWidthPx: 470,
  //  canvasHeightPx: 220,
  //});
  t.deepEqual(actual, expected);
  t.end();
});

tp.test((t) => {
  const addComponentArg = {
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
  const pieData = prepareData(addComponentArg);
  const expected: ReturnType<typeof prepareRimSlicesData> = [
    {
      "color": "#f2b5f6",
      "pointStartOnHeads": [
        35,
        86.5076844803523,
        -8.55050358314172,
      ],
      "pointStartOnTails": [
        35,
        133.49231551964772,
        8.55050358314172,
      ],
      "pointEndOnTails": [
        435,
        133.49231551964772,
        8.55050358314172,
      ],
      "pointEndOnHeads": [
        435,
        86.5076844803523,
        -8.55050358314172,
      ],
      "ellipseArgumentsOnHeads": {
        "centerX": 235,
        "centerY": 86.5076844803523,
        "radiusX": 200,
        "radiusY": 68.40402866513377,
        "axesRotationCounterClockwise": -0,
        "angleStart": -6.283185307179586,
        "angleEnd": -3.141592653589793,
        "isCounterClockwise": false,
      },
      "ellipseArgumentsOnTails": {
        "centerX": 235,
        "centerY": 133.49231551964772,
        "radiusX": 200,
        "radiusY": 68.40402866513377,
        "axesRotationCounterClockwise": -0,
        "angleStart": -3.141592653589793,
        "angleEnd": -6.283185307179586,
        "isCounterClockwise": true,
      },
    },
  ];

  const actual = prepareRimSlicesData(pieData);
  //writeToTestDiffDir({ actual, expected, });
  //drawDataOnCanvas({
  //  serverAbsFilePath: '/test/served-tmp/rim-slices.html',
  //  actual: pieData,
  //  expected: pieData,
  //  canvasWidthPx: 800,
  //  canvasHeightPx: 500,
  //  drawHeads: true,
  //  drawTails: true,
  //  drawDotsHeads: true,
  //  drawDotsTails: true,
  //  drawLineToRightEdgeHeads: true,
  //  drawLineToRightEdgeTails: true,
  //  angleStartSliceIndex: 1,
  //  angleEndSliceIndex: 1,
  //});
  //drawRimSlicesDataOnCanvas({
  //  serverAbsFilePath: '/test/served-tmp/rim-slices.html',
  //  actual: actual,
  //  expected: expected,
  //  actualIsHeadsVisibleToUser: pieData.isHeadsVisibleToUser ?
  //    'true' : 'false',
  //  expectedIsHeadsVisibleToUser: 'true',
  //  canvasWidthPx: 470,
  //  canvasHeightPx: 220,
  //});
  t.deepEqual(actual, expected);
  t.end();
});

tp.test((t) => {
  const addComponentArg = {
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
  const pieData = prepareData(addComponentArg);
  const expected: ReturnType<typeof prepareRimSlicesData> = [
    {
      "color": "#37ff00",
      "pointStartOnHeads": [
        35,
        86.5076844803523,
        -8.55050358314172,
      ],
      "pointStartOnTails": [
        35,
        133.49231551964772,
        8.55050358314172,
      ],
      "pointEndOnTails": [
        435,
        133.49231551964772,
        8.55050358314172,
      ],
      "pointEndOnHeads": [
        435,
        86.5076844803523,
        -8.55050358314172,
      ],
      "ellipseArgumentsOnHeads": {
        "centerX": 235,
        "centerY": 86.5076844803523,
        "radiusX": 200,
        "radiusY": 68.40402866513377,
        "axesRotationCounterClockwise": -0,
        "angleStart": -6.283185307179586,
        "angleEnd": -3.141592653589793,
        "isCounterClockwise": false,
      },
      "ellipseArgumentsOnTails": {
        "centerX": 235,
        "centerY": 133.49231551964772,
        "radiusX": 200,
        "radiusY": 68.40402866513377,
        "axesRotationCounterClockwise": -0,
        "angleStart": -3.141592653589793,
        "angleEnd": -6.283185307179586,
        "isCounterClockwise": true,
      },
    },
  ];

  const actual = prepareRimSlicesData(pieData);
  //writeToTestDiffDir({ actual, expected, });
  //drawDataOnCanvas({
  //  serverAbsFilePath: '/test/served-tmp/rim-slices.html',
  //  actual: pieData,
  //  expected: pieData,
  //  canvasWidthPx: 800,
  //  canvasHeightPx: 500,
  //  drawHeads: true,
  //  drawTails: true,
  //  drawDotsHeads: true,
  //  drawDotsTails: true,
  //  drawLineToRightEdgeHeads: true,
  //  drawLineToRightEdgeTails: true,
  //  angleStartSliceIndex: 1,
  //  angleEndSliceIndex: 1,
  //});
  //drawRimSlicesDataOnCanvas({
  //  serverAbsFilePath: '/test/served-tmp/rim-slices.html',
  //  actual: actual,
  //  expected: expected,
  //  actualIsHeadsVisibleToUser: pieData.isHeadsVisibleToUser ?
  //    'true' : 'false',
  //  expectedIsHeadsVisibleToUser: 'true',
  //  canvasWidthPx: 470,
  //  canvasHeightPx: 220,
  //});
  t.deepEqual(actual, expected);
  t.end();
});

tp.test((t) => {
  const addComponentArg = {
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
  const pieData = prepareData(addComponentArg);
  const expected: ReturnType<typeof prepareRimSlicesData> = [
    {
      "color": "#37ff00",
      "pointStartOnHeads": [
        35,
        86.5076844803523,
        -8.55050358314172,
      ],
      "pointStartOnTails": [
        35,
        133.49231551964772,
        8.55050358314172,
      ],
      "pointEndOnTails": [
        93.57864376269058,
        181.8612680492428,
        -124.34210129459326,
      ],
      "pointEndOnHeads": [
        93.57864376269058,
        134.8766370099474,
        -141.44310846087672,
      ],
      "ellipseArgumentsOnHeads": {
        "centerX": 235,
        "centerY": 86.5076844803523,
        "radiusX": 200,
        "radiusY": 68.40402866513377,
        "axesRotationCounterClockwise": -0,
        "angleStart": -10.210176124166829,
        "angleEnd": -9.42477796076938,
        "isCounterClockwise": false,
      },
      "ellipseArgumentsOnTails": {
        "centerX": 235,
        "centerY": 133.49231551964772,
        "radiusX": 200,
        "radiusY": 68.40402866513377,
        "axesRotationCounterClockwise": -0,
        "angleStart": -9.42477796076938,
        "angleEnd": -10.210176124166829,
        "isCounterClockwise": true,
      },
    },
    {
      "color": "#fffd00",
      "pointStartOnHeads": [
        93.57864376269058,
        134.8766370099474,
        -141.44310846087672,
      ],
      "pointStartOnTails": [
        93.57864376269058,
        181.8612680492428,
        -124.34210129459326,
      ],
      "pointEndOnTails": [
        376.4213562373095,
        181.86126804924277,
        -124.34210129459323,
      ],
      "pointEndOnHeads": [
        376.4213562373095,
        134.87663700994736,
        -141.4431084608767,
      ],
      "ellipseArgumentsOnHeads": {
        "centerX": 235,
        "centerY": 86.5076844803523,
        "radiusX": 200,
        "radiusY": 68.40402866513377,
        "axesRotationCounterClockwise": -0,
        "angleStart": -11.780972450961725,
        "angleEnd": -10.210176124166829,
        "isCounterClockwise": false,
      },
      "ellipseArgumentsOnTails": {
        "centerX": 235,
        "centerY": 133.49231551964772,
        "radiusX": 200,
        "radiusY": 68.40402866513377,
        "axesRotationCounterClockwise": -0,
        "angleStart": -10.210176124166829,
        "angleEnd": -11.780972450961725,
        "isCounterClockwise": true,
      },
    },
    {
      "color": "#37ff00",
      "pointStartOnHeads": [
        376.4213562373095,
        134.87663700994736,
        -141.4431084608767,
      ],
      "pointStartOnTails": [
        376.4213562373095,
        181.86126804924277,
        -124.34210129459323,
      ],
      "pointEndOnTails": [
        435,
        133.49231551964772,
        8.55050358314172,
      ],
      "pointEndOnHeads": [
        435,
        86.5076844803523,
        -8.55050358314172,
      ],
      "ellipseArgumentsOnHeads": {
        "centerX": 235,
        "centerY": 86.5076844803523,
        "radiusX": 200,
        "radiusY": 68.40402866513377,
        "axesRotationCounterClockwise": -0,
        "angleStart": -6.283185307179586,
        "angleEnd": -5.497787143782138,
        "isCounterClockwise": false,
      },
      "ellipseArgumentsOnTails": {
        "centerX": 235,
        "centerY": 133.49231551964772,
        "radiusX": 200,
        "radiusY": 68.40402866513377,
        "axesRotationCounterClockwise": -0,
        "angleStart": -5.497787143782138,
        "angleEnd": -6.283185307179586,
        "isCounterClockwise": true,
      },
    },
  ];

  const actual = prepareRimSlicesData(pieData);
  //writeToTestDiffDir({ actual, expected, });
  //drawDataOnCanvas({
  //  serverAbsFilePath: '/test/served-tmp/rim-slices.html',
  //  actual: pieData,
  //  expected: pieData,
  //  canvasWidthPx: 470,
  //  canvasHeightPx: 220,
  //  drawHeads: true,
  //  drawTails: true,
  //  drawDotsHeads: true,
  //  drawDotsTails: true,
  //  drawLineToRightEdgeHeads: true,
  //  drawLineToRightEdgeTails: true,
  //  angleStartSliceIndex: 1,
  //  angleEndSliceIndex: 1,
  //});
  //drawRimSlicesDataOnCanvas({
  //  serverAbsFilePath: '/test/served-tmp/rim-slices.html',
  //  actual: actual,
  //  expected: expected,
  //  actualIsHeadsVisibleToUser: pieData.isHeadsVisibleToUser ?
  //    'true' : 'false',
  //  expectedIsHeadsVisibleToUser: 'true',
  //  canvasWidthPx: 470,
  //  canvasHeightPx: 220,
  //});
  t.deepEqual(actual, expected);
  t.end();
});

tp.test('0010-rotation-over-center-x-axis-greater-180-deg', (t) => {
  const addComponentArg = {
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
  const pieData = prepareData(addComponentArg);
  const expected: ReturnType<typeof prepareRimSlicesData> = [
    {
      "color": "#37ff00",
      "pointStartOnHeads": [
        35,
        183.9303097578365,
        -19.151111077974452,
      ],
      "pointStartOnTails": [
        35,
        216.0696902421635,
        19.151111077974452,
      ],
      "pointEndOnTails": [
        435,
        216.0696902421635,
        19.151111077974452,
      ],
      "pointEndOnHeads": [
        435,
        183.9303097578365,
        -19.151111077974452,
      ],
      "ellipseArgumentsOnHeads": {
        "centerX": 235,
        "centerY": 183.9303097578365,
        "radiusX": 200,
        "radiusY": 153.20888862379562,
        "axesRotationCounterClockwise": -0,
        "angleStart": -6.283185307179586,
        "angleEnd": -3.141592653589793,
        "isCounterClockwise": false,
      },
      "ellipseArgumentsOnTails": {
        "centerX": 235,
        "centerY": 216.0696902421635,
        "radiusX": 200,
        "radiusY": 153.20888862379562,
        "axesRotationCounterClockwise": -0,
        "angleStart": -3.141592653589793,
        "angleEnd": -6.283185307179586,
        "isCounterClockwise": true,
      },
    },
  ];

  const actual = prepareRimSlicesData(pieData);
  //writeToTestDiffDir({ actual, expected, });
  //drawDataOnCanvas({
  //  serverAbsFilePath: '/test/served-tmp/rim-slices.html',
  //  actual: pieData,
  //  expected: pieData,
  //  canvasWidthPx: 470,
  //  canvasHeightPx: 400,
  //  drawHeads: true,
  //  drawTails: true,
  //  drawDotsHeads: true,
  //  drawDotsTails: true,
  //  drawLineToRightEdgeHeads: true,
  //  drawLineToRightEdgeTails: true,
  //  angleStartSliceIndex: 0,
  //  angleEndSliceIndex: 1,
  //});
  //drawRimSlicesDataOnCanvas({
  //  serverAbsFilePath: '/test/served-tmp/rim-slices.html',
  //  actual: actual,
  //  expected: expected,
  //  actualIsHeadsVisibleToUser: pieData.isHeadsVisibleToUser ?
  //    'true' : 'false',
  //  expectedIsHeadsVisibleToUser: 'true',
  //  canvasWidthPx: 470,
  //  canvasHeightPx: 400,
  //});
  t.deepEqual(actual, expected);
  t.end();
});

tp.test('0012-rotation-cx-gt-90-start-angle-gt-pi', (t) => {
  const addComponentArg = {
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
  const pieData = prepareData(addComponentArg);
  const expected: ReturnType<typeof prepareRimSlicesData> = [
    {
      "color": "#ff0000",
      "pointStartOnHeads": [
        35,
        96.98737866368899,
        9.76827821223184,
      ],
      "pointStartOnTails": [
        35,
        143.012621336311,
        -9.76827821223184,
      ],
      "pointEndOnTails": [
        37.738279973230846,
        130.1255184419852,
        -40.12839005444345,
      ],
      "pointEndOnHeads": [
        37.738279973230846,
        84.10027576936318,
        -20.591833629979767,
      ],
      "ellipseArgumentsOnHeads": {
        "centerX": 235,
        "centerY": 96.98737866368899,
        "radiusX": 200,
        "radiusY": 78.1462256978547,
        "axesRotationCounterClockwise": -0,
        "angleStart": 9.42477796076938,
        "angleEnd": 9.590444836413953,
        "isCounterClockwise": false,
      },
      "ellipseArgumentsOnTails": {
        "centerX": 235,
        "centerY": 143.012621336311,
        "radiusX": 200,
        "radiusY": 78.1462256978547,
        "axesRotationCounterClockwise": -0,
        "angleStart": 9.590444836413953,
        "angleEnd": 9.42477796076938,
        "isCounterClockwise": true,
      },
    },
    {
      "color": "#f2b5f6",
      "pointStartOnHeads": [
        37.738279973230846,
        84.10027576936318,
        -20.591833629979767,
      ],
      "pointStartOnTails": [
        37.738279973230846,
        130.1255184419852,
        -40.12839005444345,
      ],
      "pointEndOnTails": [
        156.85377430214524,
        71.07864130244593,
        -179.23411525813157,
      ],
      "pointEndOnHeads": [
        156.85377430214524,
        25.053398629823903,
        -159.69755883366787,
      ],
      "ellipseArgumentsOnHeads": {
        "centerX": 235,
        "centerY": 96.98737866368899,
        "radiusX": 200,
        "radiusY": 78.1462256978547,
        "axesRotationCounterClockwise": -0,
        "angleStart": 9.590444836413953,
        "angleEnd": 10.59414855960558,
        "isCounterClockwise": false,
      },
      "ellipseArgumentsOnTails": {
        "centerX": 235,
        "centerY": 143.012621336311,
        "radiusX": 200,
        "radiusY": 78.1462256978547,
        "axesRotationCounterClockwise": -0,
        "angleStart": 10.59414855960558,
        "angleEnd": 9.590444836413953,
        "isCounterClockwise": true,
      },
    },
    {
      "color": "#37ff00",
      "pointStartOnHeads": [
        156.85377430214524,
        25.053398629823903,
        -159.69755883366787,
      ],
      "pointStartOnTails": [
        156.85377430214524,
        71.07864130244593,
        -179.23411525813157,
      ],
      "pointEndOnTails": [
        435,
        143.012621336311,
        -9.76827821223184,
      ],
      "pointEndOnHeads": [
        435,
        96.98737866368899,
        9.76827821223184,
      ],
      "ellipseArgumentsOnHeads": {
        "centerX": 235,
        "centerY": 96.98737866368899,
        "radiusX": 200,
        "radiusY": 78.1462256978547,
        "axesRotationCounterClockwise": -0,
        "angleStart": 4.310963252425994,
        "angleEnd": 0,
        "isCounterClockwise": false,
      },
      "ellipseArgumentsOnTails": {
        "centerX": 235,
        "centerY": 143.012621336311,
        "radiusX": 200,
        "radiusY": 78.1462256978547,
        "axesRotationCounterClockwise": -0,
        "angleStart": 0,
        "angleEnd": 4.310963252425994,
        "isCounterClockwise": true,
      },
    },
  ];

  const actual = prepareRimSlicesData(pieData);
  //writeToTestDiffDir({ actual, expected, });
  //drawDataOnCanvas({
  //  serverAbsFilePath: '/test/served-tmp/rim-slices.html',
  //  actual: pieData,
  //  expected: pieData,
  //  canvasWidthPx: 470,
  //  canvasHeightPx: 235,
  //  drawHeads: true,
  //  drawTails: true,
  //  drawDotsHeads: true,
  //  drawDotsTails: true,
  //  drawLineToRightEdgeHeads: true,
  //  drawLineToRightEdgeTails: true,
  //  angleStartSliceIndex: 0,
  //  angleEndSliceIndex: 1,
  //});
  //drawRimSlicesDataOnCanvas({
  //  serverAbsFilePath: '/test/served-tmp/rim-slices.html',
  //  actual: actual,
  //  expected: expected,
  //  actualIsHeadsVisibleToUser: pieData.isHeadsVisibleToUser ?
  //    'true' : 'false',
  //  expectedIsHeadsVisibleToUser: 'false',
  //  canvasWidthPx: 470,
  //  canvasHeightPx: 235,
  //});
  t.deepEqual(actual, expected);
  t.end();
});

tp.test('0013-rotation-cx-gt-90-start-angle-gt-pi-start-end-slice-is-same',
  (t) => {
  const addComponentArg = {
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
  const pieData = prepareData(addComponentArg);
  const expected: ReturnType<typeof prepareRimSlicesData> = [
    {
      "color": "#37ff00",
      "pointStartOnHeads": [
        35,
        96.50768448035228,
        8.550503583141717,
      ],
      "pointStartOnTails": [
        35,
        143.49231551964772,
        -8.550503583141717,
      ],
      "pointEndOnTails": [
        35.07275131978494,
        141.64745889319758,
        -13.61920550644469,
      ],
      "pointEndOnHeads": [
        35.07275131978494,
        94.66282785390216,
        3.4818016598387436,
      ],
      "ellipseArgumentsOnHeads": {
        "centerX": 235,
        "centerY": 96.50768448035228,
        "radiusX": 200,
        "radiusY": 68.40402866513375,
        "axesRotationCounterClockwise": -0,
        "angleStart": 9.42477796076938,
        "angleEnd": 9.451751231027474,
        "isCounterClockwise": false,
      },
      "ellipseArgumentsOnTails": {
        "centerX": 235,
        "centerY": 143.49231551964772,
        "radiusX": 200,
        "radiusY": 68.40402866513375,
        "axesRotationCounterClockwise": -0,
        "angleStart": 9.451751231027474,
        "angleEnd": 9.42477796076938,
        "isCounterClockwise": true,
      },
    },
    {
      "color": "#f2b5f6",
      "pointStartOnHeads": [
        35.07275131978494,
        94.66282785390216,
        3.4818016598387436,
      ],
      "pointStartOnTails": [
        35.07275131978494,
        141.64745889319758,
        -13.61920550644469,
      ],
      "pointEndOnTails": [
        156.85377430214524,
        80.52607513769226,
        -181.54882722051613,
      ],
      "pointEndOnHeads": [
        156.85377430214524,
        33.54144409839682,
        -164.44782005423272,
      ],
      "ellipseArgumentsOnHeads": {
        "centerX": 235,
        "centerY": 96.50768448035228,
        "radiusX": 200,
        "radiusY": 68.40402866513375,
        "axesRotationCounterClockwise": -0,
        "angleStart": 9.451751231027474,
        "angleEnd": 10.59414855960558,
        "isCounterClockwise": false,
      },
      "ellipseArgumentsOnTails": {
        "centerX": 235,
        "centerY": 143.49231551964772,
        "radiusX": 200,
        "radiusY": 68.40402866513375,
        "axesRotationCounterClockwise": -0,
        "angleStart": 10.59414855960558,
        "angleEnd": 9.451751231027474,
        "isCounterClockwise": true,
      },
    },
    {
      "color": "#37ff00",
      "pointStartOnHeads": [
        156.85377430214524,
        33.54144409839682,
        -164.44782005423272,
      ],
      "pointStartOnTails": [
        156.85377430214524,
        80.52607513769226,
        -181.54882722051613,
      ],
      "pointEndOnTails": [
        435,
        143.49231551964772,
        -8.550503583141717,
      ],
      "pointEndOnHeads": [
        435,
        96.50768448035228,
        8.550503583141717,
      ],
      "ellipseArgumentsOnHeads": {
        "centerX": 235,
        "centerY": 96.50768448035228,
        "radiusX": 200,
        "radiusY": 68.40402866513375,
        "axesRotationCounterClockwise": -0,
        "angleStart": 4.310963252425994,
        "angleEnd": 0,
        "isCounterClockwise": false,
      },
      "ellipseArgumentsOnTails": {
        "centerX": 235,
        "centerY": 143.49231551964772,
        "radiusX": 200,
        "radiusY": 68.40402866513375,
        "axesRotationCounterClockwise": -0,
        "angleStart": 0,
        "angleEnd": 4.310963252425994,
        "isCounterClockwise": true,
      },
    },
  ];

  const actual = prepareRimSlicesData(pieData);
  //writeToTestDiffDir({ actual, expected, });
  //drawDataOnCanvas({
  //  serverAbsFilePath: '/test/served-tmp/rim-slices.html',
  //  actual: pieData,
  //  expected: pieData,
  //  canvasWidthPx: 470,
  //  canvasHeightPx: 235,
  //  drawHeads: true,
  //  drawTails: true,
  //  drawDotsHeads: true,
  //  drawDotsTails: true,
  //  drawLineToRightEdgeHeads: true,
  //  drawLineToRightEdgeTails: true,
  //  angleStartSliceIndex: 0,
  //  angleEndSliceIndex: 1,
  //});
  //drawRimSlicesDataOnCanvas({
  //  serverAbsFilePath: '/test/served-tmp/rim-slices.html',
  //  actual: actual,
  //  expected: expected,
  //  actualIsHeadsVisibleToUser: pieData.isHeadsVisibleToUser ?
  //    'true' : 'false',
  //  expectedIsHeadsVisibleToUser: 'false',
  //  canvasWidthPx: 470,
  //  canvasHeightPx: 235,
  //});
  t.deepEqual(actual, expected);
  t.end();
});
