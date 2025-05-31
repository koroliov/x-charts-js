//@flow strict
//$FlowFixMe[cannot-resolve-module]
import tp from 'tape';
import { prepareData, } from '../../../components/pie-3d/prepare-data.js';
import { prepareRimSlicesData, } from
  '../../../components/pie-3d/prepare-rim-slices-data.js';
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
        "radiusX": 149.99999999999997,
        "radiusY": 74.99999999999999,
        "axesRotationCounterClockwise": -0.7853981633974483,
        "angleStart": 1.85004900711399,
        "angleEnd": 3.141592653589793,
        "isCounterClockwise": false,
      },
      "ellipseArgumentsOnTails": {
        "centerX": 315.3093108923949,
        "centerY": 265.3093108923949,
        "radiusX": 149.99999999999997,
        "radiusY": 74.99999999999999,
        "axesRotationCounterClockwise": -0.7853981633974483,
        "angleStart": 3.141592653589793,
        "angleEnd": 1.85004900711399,
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
        "radiusX": 149.99999999999997,
        "radiusY": 74.99999999999999,
        "axesRotationCounterClockwise": -0.7853981633974483,
        "angleStart": 0,
        "angleEnd": 1.85004900711399,
        "isCounterClockwise": false,
      },
      "ellipseArgumentsOnTails": {
        "centerX": 315.3093108923949,
        "centerY": 265.3093108923949,
        "radiusX": 149.99999999999997,
        "radiusY": 74.99999999999999,
        "axesRotationCounterClockwise": -0.7853981633974483,
        "angleStart": 1.85004900711399,
        "angleEnd": 6.283185307179586,
        "isCounterClockwise": true,
      },
    },
  ];

  const actual = prepareRimSlicesData(pieData);
  //writeToTestDiffDir({ actual, expected, });
  //drawDataOnCanvas({
  //  serverAbsFilePath: '/test/served-tmp/pie-data.html',
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
        "angleStart": 2.2689280275926285,
        "angleEnd": 3.141592653589793,
        "isCounterClockwise": false,
      },
      "ellipseArgumentsOnTails": {
        "centerX": 235,
        "centerY": 133.49231551964772,
        "radiusX": 200,
        "radiusY": 68.40402866513377,
        "axesRotationCounterClockwise": -0,
        "angleStart": 3.141592653589793,
        "angleEnd": 2.2689280275926285,
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
        "angleStart": 1.0122909661567114,
        "angleEnd": 2.2689280275926285,
        "isCounterClockwise": false,
      },
      "ellipseArgumentsOnTails": {
        "centerX": 235,
        "centerY": 133.49231551964772,
        "radiusX": 200,
        "radiusY": 68.40402866513377,
        "axesRotationCounterClockwise": -0,
        "angleStart": 2.2689280275926285,
        "angleEnd": 1.0122909661567114,
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
        "angleStart": 0,
        "angleEnd": 1.0122909661567114,
        "isCounterClockwise": false,
      },
      "ellipseArgumentsOnTails": {
        "centerX": 235,
        "centerY": 133.49231551964772,
        "radiusX": 200,
        "radiusY": 68.40402866513377,
        "axesRotationCounterClockwise": -0,
        "angleStart": 1.0122909661567114,
        "angleEnd": 6.283185307179586,
        "isCounterClockwise": true,
      },
    },
  ];

  const actual = prepareRimSlicesData(pieData);
  //writeToTestDiffDir({ actual, expected, });
  //drawDataOnCanvas({
  //  serverAbsFilePath: '/test/served-tmp/pie-data.html',
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
        "angleStart": 0,
        "angleEnd": 3.141592653589793,
        "isCounterClockwise": false,
      },
      "ellipseArgumentsOnTails": {
        "centerX": 235,
        "centerY": 133.49231551964772,
        "radiusX": 200,
        "radiusY": 68.40402866513377,
        "axesRotationCounterClockwise": -0,
        "angleStart": 3.141592653589793,
        "angleEnd": 6.283185307179586,
        "isCounterClockwise": true,
      },
    },
  ];

  const actual = prepareRimSlicesData(pieData);
  //writeToTestDiffDir({ actual, expected, });
  //drawDataOnCanvas({
  //  serverAbsFilePath: '/test/served-tmp/pie-data.html',
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
        "angleStart": 0,
        "angleEnd": 3.141592653589793,
        "isCounterClockwise": false,
      },
      "ellipseArgumentsOnTails": {
        "centerX": 235,
        "centerY": 133.49231551964772,
        "radiusX": 200,
        "radiusY": 68.40402866513377,
        "axesRotationCounterClockwise": -0,
        "angleStart": 3.141592653589793,
        "angleEnd": 6.283185307179586,
        "isCounterClockwise": true,
      },
    },
  ];

  const actual = prepareRimSlicesData(pieData);
  //writeToTestDiffDir({ actual, expected, });
  //drawDataOnCanvas({
  //  serverAbsFilePath: '/test/served-tmp/pie-data.html',
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
  //  canvasWidthPx: 470,
  //  canvasHeightPx: 220,
  //});
  t.deepEqual(actual, expected);
  t.end();
});
