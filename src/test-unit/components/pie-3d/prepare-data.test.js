//@flow strict
//$FlowFixMe[cannot-resolve-module]
import tp from 'tape';
import { prepareData, } from '../../../components/pie-3d/prepare-data.js';
import { drawDataOnCanvas, } from './draw-data-on-canvas.util.js';
import { writeToTestDiffDir, } from
  '../../test-utils/write-to-test-diff-dir.util.js';

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

  const expected = {
    "totalValue": 100,
    "slices": [
      {
        "startPointHeads": [
          366.2217855673082,
          116.8828782507058,
          31.929719908903575,
        ],
        "startPointTails": [
          396.84040735209794,
          147.50150003549552,
          56.92971990890358,
        ],
        "endPointHeads": [
          168.11561129518546,
          322.03001040304537,
          23.306342855423747,
        ],
        "endPointTails": [
          198.73423307997518,
          352.6486321878351,
          48.30634285542375,
        ],
        "startAngleCounterClockwise": 0.3490658503988659,
        "endAngleCounterClockwise": 2.8623399732707004,
        "faceEllipseMethodArguments": {
          "startAngle": 18.500490071139893,
          "endAngle": 15.987215948268059,
        },
        "value": 40,
        "color": "#ff0000",
      },
      {
        "startPointHeads": [
          168.11561129518546,
          322.03001040304537,
          23.306342855423747,
        ],
        "startPointTails": [
          198.73423307997518,
          352.6486321878351,
          48.30634285542375,
        ],
        "endPointHeads": [
          306.43353236759066,
          314.90504540154956,
          -137.37155725512451,
        ],
        "endPointTails": [
          337.05215415238035,
          345.52366718633925,
          -112.3715572551245,
        ],
        "startAngleCounterClockwise": 2.8623399732707004,
        "endAngleCounterClockwise": 4.433136300065597,
        "faceEllipseMethodArguments": {
          "startAngle": 15.987215948268059,
          "endAngle": 14.416419621473162,
        },
        "value": 25,
        "color": "#37ff00",
      },
      {
        "startPointHeads": [
          306.43353236759066,
          314.90504540154956,
          -137.37155725512451,
        ],
        "startPointTails": [
          337.05215415238035,
          345.52366718633925,
          -112.3715572551245,
        ],
        "endPointHeads": [
          366.2217855673082,
          116.8828782507058,
          31.929719908903575,
        ],
        "endPointTails": [
          396.84040735209794,
          147.50150003549552,
          56.92971990890358,
        ],
        "startAngleCounterClockwise": 4.433136300065597,
        "endAngleCounterClockwise": 6.632251157578452,
        "faceEllipseMethodArguments": {
          "startAngle": 14.416419621473162,
          "endAngle": 12.217304763960307,
        },
        "value": 35,
        "color": "#000aff",
      },
    ],
    "pointTopHeads": [
      231.6576805186141,
      181.65768051861406,
      117.4038105676658,
    ],
    "edgeLeft": {
      "pointHeads": [
        178.624671929623,
        340.75670628558726,
        -12.500000000000004,
      ],
      "pointTails": [
        209.24329371441274,
        371.375328070377,
        12.500000000000004,
      ],
      "sliceIndex": 1,
      "angleCounterClockwise": 3.141592653589793,
    },
    "edgeRight": {
      "pointHeads": [
        390.75670628558726,
        128.62467192962302,
        -12.500000000000004,
      ],
      "pointTails": [
        421.375328070377,
        159.24329371441274,
        12.500000000000004,
      ],
      "sliceIndex": 2,
      "angleCounterClockwise": 6.283185307179586,
    },
    "centerHeads": [
      284.6906891076051,
      234.69068910760512,
      -12.500000000000004,
    ],
    "centerTails": [
      315.3093108923949,
      265.3093108923949,
      12.500000000000004,
    ],
    "ellipseMethodArgs": {
      "radiusX": 149.99999999999997,
      "radiusY": 74.99999999999999,
      "axesRotationCounterClockwise": -0.7853981633974483,
      "isCounterClockwiseOnVisibleFace": true,
    },
    "isHeadsVisibleToUser": true,
    "isTailsVisibleToUser": false,
    "isTopRimVisibleToUser": false,
    "isBottomRimVisibleToUser": true,
  };

  const actual = prepareData(addComponentArg);
  //writeToTestDiffDir({ actual, expected, });
  //drawDataOnCanvas({
  //  serverAbsFilePath: '/test/served-tmp/prepare-data-test.html',
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
  //  angleStartSliceIndex: 0,
  //  angleEndSliceIndex: 1,
  //});
  t.deepEqual(actual, expected);
  t.end();
});

tp.test('0001-most-common-case', (t) => {
  const addComponentArg = {
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

  const expected = {
    "totalValue": 100,
    "slices": [
      {
        "startPointHeads": [
          106.44247806269212,
          34.10715843447528,
          135.4187584954491,
        ],
        "startPointTails": [
          106.44247806269212,
          81.0917894737707,
          152.51976566173258,
        ],
        "endPointHeads": [
          81.79111137620438,
          130.47694655894313,
          -129.35505829415246,
        ],
        "endPointTails": [
          81.79111137620438,
          177.46157759823853,
          -112.254051127869,
        ],
        "startAngleCounterClockwise": 2.2689280275926285,
        "endAngleCounterClockwise": 3.839724354387525,
        "faceEllipseMethodArguments": {
          "startAngle": 16.58062789394613,
          "endAngle": 15.009831567151235,
        },
        "value": 25,
        "color": "#37ff00",
      },
      {
        "startPointHeads": [
          81.79111137620438,
          130.47694655894313,
          -129.35505829415246,
        ],
        "startPointTails": [
          81.79111137620438,
          177.46157759823853,
          -112.254051127869,
        ],
        "endPointHeads": [
          363.55752193730785,
          138.90821052622928,
          -152.51976566173255,
        ],
        "endPointTails": [
          363.55752193730785,
          185.8928415655247,
          -135.41875849544908,
        ],
        "startAngleCounterClockwise": 3.839724354387525,
        "endAngleCounterClockwise": 5.410520681182422,
        "faceEllipseMethodArguments": {
          "startAngle": 15.009831567151235,
          "endAngle": 13.439035240356336,
        },
        "value": 25,
        "color": "#ff0000",
      },
      {
        "startPointHeads": [
          363.55752193730785,
          138.90821052622928,
          -152.51976566173255,
        ],
        "startPointTails": [
          363.55752193730785,
          185.8928415655247,
          -135.41875849544908,
        ],
        "endPointHeads": [
          106.44247806269212,
          34.10715843447528,
          135.4187584954491,
        ],
        "endPointTails": [
          106.44247806269212,
          81.0917894737707,
          152.51976566173258,
        ],
        "startAngleCounterClockwise": 5.410520681182422,
        "endAngleCounterClockwise": 8.552113334772216,
        "faceEllipseMethodArguments": {
          "startAngle": 13.439035240356336,
          "endAngle": 10.297442586766543,
        },
        "value": 50,
        "color": "#f2b5f6",
      },
    ],
    "pointTopHeads": [
      235,
      18.10365581521853,
      179.38802057403993,
    ],
    "edgeLeft": {
      "pointHeads": [
        35,
        86.5076844803523,
        -8.55050358314172,
      ],
      "pointTails": [
        35,
        133.49231551964772,
        8.55050358314172,
      ],
      "sliceIndex": 0,
      "angleCounterClockwise": 3.141592653589793,
    },
    "edgeRight": {
      "pointHeads": [
        435,
        86.5076844803523,
        -8.55050358314172,
      ],
      "pointTails": [
        435,
        133.49231551964772,
        8.55050358314172,
      ],
      "sliceIndex": 2,
      "angleCounterClockwise": 6.283185307179586,
    },
    "centerHeads": [
      235,
      86.5076844803523,
      -8.55050358314172,
    ],
    "centerTails": [
      235,
      133.49231551964772,
      8.55050358314172,
    ],
    "ellipseMethodArgs": {
      "radiusX": 200,
      "radiusY": 68.40402866513377,
      "axesRotationCounterClockwise": -0,
      "isCounterClockwiseOnVisibleFace": true,
    },
    "isHeadsVisibleToUser": true,
    "isTailsVisibleToUser": false,
    "isTopRimVisibleToUser": false,
    "isBottomRimVisibleToUser": true,
  };

  const actual = prepareData(addComponentArg);
  //writeToTestDiffDir({ actual, expected, });
  //drawDataOnCanvas({
  //  serverAbsFilePath: '/test/served-tmp/prepare-data-test.html',
  //  actual: actual,
  //  expected: expected,
  //  canvasWidthPx: 470,
  //  canvasHeightPx: 220,
  //  drawHeads: true,
  //  drawTails: true,
  //  drawDotsHeads: true,
  //  drawDotsTails: true,
  //  drawLineToRightEdgeHeads: true,
  //  drawLineToRightEdgeTails: true,
  //  angleStartSliceIndex: 0,
  //  angleEndSliceIndex: 1,
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
      centerXPx: 400,
      centerYPx: 250,
      startAtDeg: 135,
      rotationAroundCenterXAxisDeg: 120,
      rotationAroundCenterZAxisDeg: 0,
    },
    data: [
      { value: 25, meta: { color: '#ff0000' /* red */, }, },
      { value: 25, meta: { color: '#37ff00' /* green */, }, },
      { value: 50, meta: { color: '#f2b5f6' /* pinkish */, }, },
    ],
  };

  const expected = {
    "totalValue": 100,
    "slices": [
      {
        "startPointHeads": [
          258.5786437626905,
          299.06004302404375,
          134.97448713915892,
        ],
        "startPointTails": [
          258.5786437626905,
          342.3613132132657,
          109.97448713915892,
        ],
        "endPointHeads": [
          258.5786437626905,
          157.6386867867343,
          -109.97448713915892,
        ],
        "endPointTails": [
          258.5786437626905,
          200.93995697595625,
          -134.97448713915892,
        ],
        "startAngleCounterClockwise": 2.356194490192345,
        "endAngleCounterClockwise": 3.9269908169872414,
        "faceEllipseMethodArguments": {
          "startAngle": -16.493361431346415,
          "endAngle": -14.922565104551516,
        },
        "value": 25,
        "color": "#ff0000",
      },
      {
        "startPointHeads": [
          258.5786437626905,
          157.6386867867343,
          -109.97448713915892,
        ],
        "startPointTails": [
          258.5786437626905,
          200.93995697595625,
          -134.97448713915892,
        ],
        "endPointHeads": [
          541.4213562373095,
          157.6386867867343,
          -109.97448713915892,
        ],
        "endPointTails": [
          541.4213562373095,
          200.93995697595625,
          -134.97448713915892,
        ],
        "startAngleCounterClockwise": 3.9269908169872414,
        "endAngleCounterClockwise": 5.497787143782138,
        "faceEllipseMethodArguments": {
          "startAngle": -14.922565104551516,
          "endAngle": -13.351768777756622,
        },
        "value": 25,
        "color": "#37ff00",
      },
      {
        "startPointHeads": [
          541.4213562373095,
          157.6386867867343,
          -109.97448713915892,
        ],
        "startPointTails": [
          541.4213562373095,
          200.93995697595625,
          -134.97448713915892,
        ],
        "endPointHeads": [
          258.5786437626905,
          299.06004302404375,
          134.97448713915892,
        ],
        "endPointTails": [
          258.5786437626905,
          342.3613132132657,
          109.97448713915892,
        ],
        "startAngleCounterClockwise": 5.497787143782138,
        "endAngleCounterClockwise": 8.63937979737193,
        "faceEllipseMethodArguments": {
          "startAngle": -13.351768777756622,
          "endAngle": -10.210176124166829,
        },
        "value": 50,
        "color": "#f2b5f6",
      },
    ],
    "pointTopHeads": [
      400,
      328.349364905389,
      185.70508075688775,
    ],
    "edgeLeft": {
      "pointHeads": [
        200,
        228.34936490538902,
        12.499999999999995,
      ],
      "pointTails": [
        200,
        271.65063509461095,
        -12.499999999999995,
      ],
      "sliceIndex": 0,
      "angleCounterClockwise": 3.141592653589793,
    },
    "edgeRight": {
      "pointHeads": [
        600,
        228.34936490538902,
        12.499999999999995,
      ],
      "pointTails": [
        600,
        271.65063509461095,
        -12.499999999999995,
      ],
      "sliceIndex": 2,
      "angleCounterClockwise": 6.283185307179586,
    },
    "centerHeads": [
      400,
      228.34936490538902,
      12.499999999999995,
    ],
    "centerTails": [
      400,
      271.65063509461095,
      -12.499999999999995,
    ],
    "ellipseMethodArgs": {
      "radiusX": 200,
      "radiusY": 99.99999999999997,
      "axesRotationCounterClockwise": -0,
      "isCounterClockwiseOnVisibleFace": false,
    },
    "isHeadsVisibleToUser": false,
    "isTailsVisibleToUser": true,
    "isTopRimVisibleToUser": false,
    "isBottomRimVisibleToUser": true,
  };

  const actual = prepareData(addComponentArg);
  //writeToTestDiffDir({ actual, expected, });
  //drawDataOnCanvas({
  //  serverAbsFilePath: '/test/served-tmp/prepare-data-test.html',
  //  actual: actual,
  //  expected: expected,
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

  const expected = {
    "totalValue": 100,
    "slices": [
      {
        "startPointHeads": [
          235,
          18.10365581521853,
          179.38802057403993,
        ],
        "startPointTails": [
          235,
          65.08828685451394,
          196.4890277403234,
        ],
        "endPointHeads": [
          35,
          86.50768448035228,
          -8.550503583141694,
        ],
        "endPointTails": [
          35,
          133.4923155196477,
          8.550503583141747,
        ],
        "startAngleCounterClockwise": 1.5707963267948966,
        "endAngleCounterClockwise": 3.141592653589793,
        "faceEllipseMethodArguments": {
          "startAngle": 17.27875959474386,
          "endAngle": 15.707963267948966,
        },
        "value": 25,
        "color": "#f2b5f6",
      },
      {
        "startPointHeads": [
          35,
          86.50768448035228,
          -8.550503583141694,
        ],
        "startPointTails": [
          35,
          133.4923155196477,
          8.550503583141747,
        ],
        "endPointHeads": [
          234.99999999999997,
          154.91171314548606,
          -196.4890277403234,
        ],
        "endPointTails": [
          234.99999999999997,
          201.89634418478147,
          -179.38802057403993,
        ],
        "startAngleCounterClockwise": 3.141592653589793,
        "endAngleCounterClockwise": 4.71238898038469,
        "faceEllipseMethodArguments": {
          "startAngle": 15.707963267948966,
          "endAngle": 14.137166941154069,
        },
        "value": 25,
        "color": "#00fff5",
      },
      {
        "startPointHeads": [
          234.99999999999997,
          154.91171314548606,
          -196.4890277403234,
        ],
        "startPointTails": [
          234.99999999999997,
          201.89634418478147,
          -179.38802057403993,
        ],
        "endPointHeads": [
          435,
          86.50768448035231,
          -8.550503583141762,
        ],
        "endPointTails": [
          435,
          133.49231551964772,
          8.55050358314168,
        ],
        "startAngleCounterClockwise": 4.71238898038469,
        "endAngleCounterClockwise": 6.283185307179586,
        "faceEllipseMethodArguments": {
          "startAngle": 14.137166941154069,
          "endAngle": 12.566370614359172,
        },
        "value": 25,
        "color": "#feed00",
      },
      {
        "startPointHeads": [
          435,
          86.50768448035231,
          -8.550503583141762,
        ],
        "startPointTails": [
          435,
          133.49231551964772,
          8.55050358314168,
        ],
        "endPointHeads": [
          235,
          18.10365581521853,
          179.38802057403993,
        ],
        "endPointTails": [
          235,
          65.08828685451394,
          196.4890277403234,
        ],
        "startAngleCounterClockwise": 6.283185307179586,
        "endAngleCounterClockwise": 7.853981633974483,
        "faceEllipseMethodArguments": {
          "startAngle": 12.566370614359172,
          "endAngle": 10.995574287564276,
        },
        "value": 25,
        "color": "#ff0010",
      },
    ],
    "pointTopHeads": [
      235,
      18.10365581521853,
      179.38802057403993,
    ],
    "edgeLeft": {
      "pointHeads": [
        35,
        86.5076844803523,
        -8.55050358314172,
      ],
      "pointTails": [
        35,
        133.49231551964772,
        8.55050358314172,
      ],
      "sliceIndex": 1,
      "angleCounterClockwise": 3.141592653589793,
    },
    "edgeRight": {
      "pointHeads": [
        435,
        86.5076844803523,
        -8.55050358314172,
      ],
      "pointTails": [
        435,
        133.49231551964772,
        8.55050358314172,
      ],
      "sliceIndex": 2,
      "angleCounterClockwise": 6.283185307179586,
    },
    "centerHeads": [
      235,
      86.5076844803523,
      -8.55050358314172,
    ],
    "centerTails": [
      235,
      133.49231551964772,
      8.55050358314172,
    ],
    "ellipseMethodArgs": {
      "radiusX": 200,
      "radiusY": 68.40402866513377,
      "axesRotationCounterClockwise": -0,
      "isCounterClockwiseOnVisibleFace": true,
    },
    "isHeadsVisibleToUser": true,
    "isTailsVisibleToUser": false,
    "isTopRimVisibleToUser": false,
    "isBottomRimVisibleToUser": true,
  };

  const actual = prepareData(addComponentArg);
  //writeToTestDiffDir({ actual, expected, });
  //drawDataOnCanvas({
  //  serverAbsFilePath: '/test/served-tmp/prepare-data-test.html',
  //  actual: actual,
  //  expected: expected,
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

  const expected = {
    "totalValue": 75,
    "slices": [
      {
        "startPointHeads": [
          388.2088886237956,
          42.53842240176145,
          112.254051127869,
        ],
        "startPointTails": [
          388.2088886237956,
          89.52305344105686,
          129.35505829415246,
        ],
        "endPointHeads": [
          47.06147584281834,
          63.112128792250076,
          55.72825738551224,
        ],
        "endPointTails": [
          47.06147584281834,
          110.0967598315455,
          72.82926455179567,
        ],
        "startAngleCounterClockwise": 0.6981317007977318,
        "endAngleCounterClockwise": 2.792526803190927,
        "faceEllipseMethodArguments": {
          "startAngle": 18.151424220741028,
          "endAngle": 16.05702911834783,
        },
        "value": 25,
        "color": "#37ff00",
      },
      {
        "startPointHeads": [
          47.06147584281834,
          63.112128792250076,
          55.72825738551224,
        ],
        "startPointTails": [
          47.06147584281834,
          110.0967598315455,
          72.82926455179567,
        ],
        "endPointHeads": [
          388.2088886237956,
          42.53842240176145,
          112.254051127869,
        ],
        "endPointTails": [
          388.2088886237956,
          89.52305344105686,
          129.35505829415246,
        ],
        "startAngleCounterClockwise": 2.792526803190927,
        "endAngleCounterClockwise": 6.981317007977317,
        "faceEllipseMethodArguments": {
          "startAngle": 16.05702911834783,
          "endAngle": 11.868238913561441,
        },
        "value": 50,
        "color": "#f2b5f6",
      },
    ],
    "pointTopHeads": [
      235,
      18.10365581521853,
      179.38802057403993,
    ],
    "edgeLeft": {
      "pointHeads": [
        35,
        86.5076844803523,
        -8.55050358314172,
      ],
      "pointTails": [
        35,
        133.49231551964772,
        8.55050358314172,
      ],
      "sliceIndex": 1,
      "angleCounterClockwise": 3.141592653589793,
    },
    "edgeRight": {
      "pointHeads": [
        435,
        86.5076844803523,
        -8.55050358314172,
      ],
      "pointTails": [
        435,
        133.49231551964772,
        8.55050358314172,
      ],
      "sliceIndex": 1,
      "angleCounterClockwise": 6.283185307179586,
    },
    "centerHeads": [
      235,
      86.5076844803523,
      -8.55050358314172,
    ],
    "centerTails": [
      235,
      133.49231551964772,
      8.55050358314172,
    ],
    "ellipseMethodArgs": {
      "radiusX": 200,
      "radiusY": 68.40402866513377,
      "axesRotationCounterClockwise": -0,
      "isCounterClockwiseOnVisibleFace": true,
    },
    "isHeadsVisibleToUser": true,
    "isTailsVisibleToUser": false,
    "isTopRimVisibleToUser": false,
    "isBottomRimVisibleToUser": true,
  };

  const actual = prepareData(addComponentArg);
  //writeToTestDiffDir({ actual, expected, });
  //drawDataOnCanvas({
  //  serverAbsFilePath: '/test/served-tmp/prepare-data-test.html',
  //  actual: actual,
  //  expected: expected,
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
  t.deepEqual(actual, expected);
  t.end();
});

tp.test('0004-left-edge-slice-index-bigger-right-one', (t) => {
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

  const expected = {
    "totalValue": 125,
    "slices": [
      {
        "startPointHeads": [
          106.44247806269212,
          138.90821052622928,
          -152.51976566173255,
        ],
        "startPointTails": [
          106.44247806269212,
          185.8928415655247,
          -135.41875849544908,
        ],
        "endPointHeads": [
          340.98385284664096,
          144.5175907592486,
          -167.93141118908818,
        ],
        "endPointTails": [
          340.98385284664096,
          191.50222179854399,
          -150.83040402280471,
        ],
        "startAngleCounterClockwise": 4.014257279586958,
        "endAngleCounterClockwise": 5.270894341022875,
        "faceEllipseMethodArguments": {
          "startAngle": 14.835298641951802,
          "endAngle": 13.578661580515885,
        },
        "value": 25,
        "color": "#37ff00",
      },
      {
        "startPointHeads": [
          340.98385284664096,
          144.5175907592486,
          -167.93141118908818,
        ],
        "startPointTails": [
          340.98385284664096,
          191.50222179854399,
          -150.83040402280471,
        ],
        "endPointHeads": [
          429.0591452551993,
          69.95925219902915,
          36.91594043716754,
        ],
        "endPointTails": [
          429.0591452551993,
          116.94388323832456,
          54.01694760345098,
        ],
        "startAngleCounterClockwise": 5.270894341022875,
        "endAngleCounterClockwise": 6.527531402458792,
        "faceEllipseMethodArguments": {
          "startAngle": 13.578661580515885,
          "endAngle": 12.322024519079967,
        },
        "value": 25,
        "color": "#ff0000",
      },
      {
        "startPointHeads": [
          429.0591452551993,
          69.95925219902915,
          36.91594043716754,
        ],
        "startPointTails": [
          429.0591452551993,
          116.94388323832456,
          54.01694760345098,
        ],
        "endPointHeads": [
          248.95129474882515,
          18.27028459107234,
          178.9302117749502,
        ],
        "endPointTails": [
          248.95129474882515,
          65.25491563036775,
          196.03121894123367,
        ],
        "startAngleCounterClockwise": 6.527531402458792,
        "endAngleCounterClockwise": 7.7841684638947095,
        "faceEllipseMethodArguments": {
          "startAngle": 12.322024519079967,
          "endAngle": 11.06538745764405,
        },
        "value": 25,
        "color": "#37ff00",
      },
      {
        "startPointHeads": [
          248.95129474882515,
          18.27028459107234,
          178.9302117749502,
        ],
        "startPointTails": [
          248.95129474882515,
          65.25491563036775,
          196.03121894123367,
        ],
        "endPointHeads": [
          106.44247806269212,
          138.90821052622928,
          -152.51976566173255,
        ],
        "endPointTails": [
          106.44247806269212,
          185.8928415655247,
          -135.41875849544908,
        ],
        "startAngleCounterClockwise": 7.7841684638947095,
        "endAngleCounterClockwise": 10.297442586766543,
        "faceEllipseMethodArguments": {
          "startAngle": 11.06538745764405,
          "endAngle": 8.552113334772216,
        },
        "value": 50,
        "color": "#f2b5f6",
      },
    ],
    "pointTopHeads": [
      235,
      18.10365581521853,
      179.38802057403993,
    ],
    "edgeLeft": {
      "pointHeads": [
        35,
        86.5076844803523,
        -8.55050358314172,
      ],
      "pointTails": [
        35,
        133.49231551964772,
        8.55050358314172,
      ],
      "sliceIndex": 3,
      "angleCounterClockwise": 9.42477796076938,
    },
    "edgeRight": {
      "pointHeads": [
        435,
        86.5076844803523,
        -8.55050358314172,
      ],
      "pointTails": [
        435,
        133.49231551964772,
        8.55050358314172,
      ],
      "sliceIndex": 1,
      "angleCounterClockwise": 6.283185307179586,
    },
    "centerHeads": [
      235,
      86.5076844803523,
      -8.55050358314172,
    ],
    "centerTails": [
      235,
      133.49231551964772,
      8.55050358314172,
    ],
    "ellipseMethodArgs": {
      "radiusX": 200,
      "radiusY": 68.40402866513377,
      "axesRotationCounterClockwise": -0,
      "isCounterClockwiseOnVisibleFace": true,
    },
    "isHeadsVisibleToUser": true,
    "isTailsVisibleToUser": false,
    "isTopRimVisibleToUser": false,
    "isBottomRimVisibleToUser": true,
  };

  const actual = prepareData(addComponentArg);
  //writeToTestDiffDir({ actual, expected, });
  //drawDataOnCanvas({
  //  serverAbsFilePath: '/test/served-tmp/prepare-data-test.html',
  //  actual: actual,
  //  expected: expected,
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

  const expected = {
    "totalValue": 100,
    "slices": [
      {
        "startPointHeads": [
          234.99996509341491,
          18.103655815219568,
          179.38802057403709,
        ],
        "startPointTails": [
          234.99996509341491,
          65.08828685451498,
          196.48902774032055,
        ],
        "endPointHeads": [
          434.99999999999693,
          86.5076725415971,
          -8.550470781681419,
        ],
        "endPointTails": [
          434.99999999999693,
          133.49230358089252,
          8.550536384602022,
        ],
        "startAngleCounterClockwise": 1.570796501327822,
        "endAngleCounterClockwise": 6.283185481712511,
        "faceEllipseMethodArguments": {
          "startAngle": 17.278759420210935,
          "endAngle": 12.566370439826247,
        },
        "value": 75,
        "color": "#37ff00",
      },
      {
        "startPointHeads": [
          434.99999999999693,
          86.5076725415971,
          -8.550470781681419,
        ],
        "startPointTails": [
          434.99999999999693,
          133.49230358089252,
          8.550536384602022,
        ],
        "endPointHeads": [
          234.99996509341491,
          18.103655815219568,
          179.38802057403709,
        ],
        "endPointTails": [
          234.99996509341491,
          65.08828685451498,
          196.48902774032055,
        ],
        "startAngleCounterClockwise": 6.283185481712511,
        "endAngleCounterClockwise": 7.853981808507408,
        "faceEllipseMethodArguments": {
          "startAngle": 12.566370439826247,
          "endAngle": 10.995574113031351,
        },
        "value": 25,
        "color": "#fffd00",
      },
    ],
    "pointTopHeads": [
      235,
      18.10365581521853,
      179.38802057403993,
    ],
    "edgeLeft": {
      "pointHeads": [
        35,
        86.5076844803523,
        -8.55050358314172,
      ],
      "pointTails": [
        35,
        133.49231551964772,
        8.55050358314172,
      ],
      "sliceIndex": 0,
      "angleCounterClockwise": 3.141592653589793,
    },
    "edgeRight": {
      "pointHeads": [
        435,
        86.5076844803523,
        -8.55050358314172,
      ],
      "pointTails": [
        435,
        133.49231551964772,
        8.55050358314172,
      ],
      "sliceIndex": 0,
      "angleCounterClockwise": 6.283185307179586,
    },
    "centerHeads": [
      235,
      86.5076844803523,
      -8.55050358314172,
    ],
    "centerTails": [
      235,
      133.49231551964772,
      8.55050358314172,
    ],
    "ellipseMethodArgs": {
      "radiusX": 200,
      "radiusY": 68.40402866513377,
      "axesRotationCounterClockwise": -0,
      "isCounterClockwiseOnVisibleFace": true,
    },
    "isHeadsVisibleToUser": true,
    "isTailsVisibleToUser": false,
    "isTopRimVisibleToUser": false,
    "isBottomRimVisibleToUser": true,
  };

  const actual = prepareData(addComponentArg);
  //writeToTestDiffDir({ actual, expected, });
  //drawDataOnCanvas({
  //  serverAbsFilePath: '/test/served-tmp/prepare-data-test.html',
  //  actual: actual,
  //  expected: expected,
  //  canvasWidthPx: 470,
  //  canvasHeightPx: 220,
  //  drawHeads: true,
  //  drawTails: true,
  //  drawDotsHeads: true,
  //  drawDotsTails: true,
  //  drawLineToRightEdgeHeads: true,
  //  drawLineToRightEdgeTails: true,
  //  angleStartSliceIndex: 0,
  //  angleEndSliceIndex: 0,
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

  const expected = {
    "totalValue": 100,
    "slices": [
      {
        "startPointHeads": [
          376.4213562373095,
          134.87663700994736,
          -141.4431084608767,
        ],
        "startPointTails": [
          376.4213562373095,
          181.86126804924277,
          -124.34210129459323,
        ],
        "endPointHeads": [
          93.57864376269058,
          134.8766370099474,
          -141.44310846087672,
        ],
        "endPointTails": [
          93.57864376269058,
          181.8612680492428,
          -124.34210129459326,
        ],
        "startAngleCounterClockwise": 5.497787143782138,
        "endAngleCounterClockwise": 10.210176124166829,
        "faceEllipseMethodArguments": {
          "startAngle": 13.351768777756622,
          "endAngle": 8.63937979737193,
        },
        "value": 75,
        "color": "#37ff00",
      },
      {
        "startPointHeads": [
          93.57864376269058,
          134.8766370099474,
          -141.44310846087672,
        ],
        "startPointTails": [
          93.57864376269058,
          181.8612680492428,
          -124.34210129459326,
        ],
        "endPointHeads": [
          376.4213562373095,
          134.87663700994736,
          -141.4431084608767,
        ],
        "endPointTails": [
          376.4213562373095,
          181.86126804924277,
          -124.34210129459323,
        ],
        "startAngleCounterClockwise": 10.210176124166829,
        "endAngleCounterClockwise": 11.780972450961725,
        "faceEllipseMethodArguments": {
          "startAngle": 8.63937979737193,
          "endAngle": 7.068583470577034,
        },
        "value": 25,
        "color": "#fffd00",
      },
    ],
    "pointTopHeads": [
      235,
      18.10365581521853,
      179.38802057403993,
    ],
    "edgeLeft": {
      "pointHeads": [
        35,
        86.5076844803523,
        -8.55050358314172,
      ],
      "pointTails": [
        35,
        133.49231551964772,
        8.55050358314172,
      ],
      "sliceIndex": 0,
      "angleCounterClockwise": 9.42477796076938,
    },
    "edgeRight": {
      "pointHeads": [
        435,
        86.5076844803523,
        -8.55050358314172,
      ],
      "pointTails": [
        435,
        133.49231551964772,
        8.55050358314172,
      ],
      "sliceIndex": 0,
      "angleCounterClockwise": 6.283185307179586,
    },
    "centerHeads": [
      235,
      86.5076844803523,
      -8.55050358314172,
    ],
    "centerTails": [
      235,
      133.49231551964772,
      8.55050358314172,
    ],
    "ellipseMethodArgs": {
      "radiusX": 200,
      "radiusY": 68.40402866513377,
      "axesRotationCounterClockwise": -0,
      "isCounterClockwiseOnVisibleFace": true,
    },
    "isHeadsVisibleToUser": true,
    "isTailsVisibleToUser": false,
    "isTopRimVisibleToUser": false,
    "isBottomRimVisibleToUser": true,
  };

  const actual = prepareData(addComponentArg);
  //writeToTestDiffDir({ actual, expected, });
  //drawDataOnCanvas({
  //  serverAbsFilePath: '/test/served-tmp/prepare-data-test.html',
  //  actual: actual,
  //  expected: expected,
  //  canvasWidthPx: 470,
  //  canvasHeightPx: 220,
  //  drawHeads: true,
  //  drawTails: true,
  //  drawDotsHeads: true,
  //  drawDotsTails: true,
  //  drawLineToRightEdgeHeads: true,
  //  drawLineToRightEdgeTails: true,
  //  angleStartSliceIndex: 0,
  //  angleEndSliceIndex: 0,
  //});
  t.deepEqual(actual, expected);
  t.end();
});

tp.test.skip('0010-rotation-over-center-x-axis-greater-180-deg', (t) => {
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

  const expected = {
    "totalValue": 100,
    "slices": [
      {
        "startPointHeads": [
          376.4213562373095,
          134.87663700994736,
          -141.4431084608767,
        ],
        "startPointTails": [
          376.4213562373095,
          181.86126804924277,
          -124.34210129459323,
        ],
        "endPointHeads": [
          93.57864376269058,
          134.8766370099474,
          -141.44310846087672,
        ],
        "endPointTails": [
          93.57864376269058,
          181.8612680492428,
          -124.34210129459326,
        ],
        "startAngleCounterClockwise": 5.497787143782138,
        "endAngleCounterClockwise": 10.210176124166829,
        "faceEllipseMethodArguments": {
          "startAngle": 13.351768777756622,
          "endAngle": 8.63937979737193,
        },
        "value": 75,
        "color": "#37ff00",
      },
      {
        "startPointHeads": [
          93.57864376269058,
          134.8766370099474,
          -141.44310846087672,
        ],
        "startPointTails": [
          93.57864376269058,
          181.8612680492428,
          -124.34210129459326,
        ],
        "endPointHeads": [
          376.4213562373095,
          134.87663700994736,
          -141.4431084608767,
        ],
        "endPointTails": [
          376.4213562373095,
          181.86126804924277,
          -124.34210129459323,
        ],
        "startAngleCounterClockwise": 10.210176124166829,
        "endAngleCounterClockwise": 11.780972450961725,
        "faceEllipseMethodArguments": {
          "startAngle": 8.63937979737193,
          "endAngle": 7.068583470577034,
        },
        "value": 25,
        "color": "#fffd00",
      },
    ],
    "pointTopHeads": [
      235,
      18.10365581521853,
      179.38802057403993,
    ],
    "edgeLeft": {
      "pointHeads": [
        35,
        86.5076844803523,
        -8.55050358314172,
      ],
      "pointTails": [
        35,
        133.49231551964772,
        8.55050358314172,
      ],
      "sliceIndex": 0,
      "angleCounterClockwise": 9.42477796076938,
    },
    "edgeRight": {
      "pointHeads": [
        435,
        86.5076844803523,
        -8.55050358314172,
      ],
      "pointTails": [
        435,
        133.49231551964772,
        8.55050358314172,
      ],
      "sliceIndex": 0,
      "angleCounterClockwise": 6.283185307179586,
    },
    "centerHeads": [
      235,
      86.5076844803523,
      -8.55050358314172,
    ],
    "centerTails": [
      235,
      133.49231551964772,
      8.55050358314172,
    ],
    "ellipseMethodArgs": {
      "radiusX": 200,
      "radiusY": 68.40402866513377,
      "axesRotationCounterClockwise": -0,
      "isCounterClockwiseOnVisibleFace": true,
    },
    "isHeadsVisibleToUser": true,
    "isTailsVisibleToUser": false,
    "isTopRimVisibleToUser": false,
    "isBottomRimVisibleToUser": true,
  };

  const actual = prepareData(addComponentArg);
  //writeToTestDiffDir({ actual, expected, });
  //drawDataOnCanvas({
  //  serverAbsFilePath: '/test/served-tmp/prepare-data-test.html',
  //  actual: actual,
  //  expected: expected,
  //  canvasWidthPx: 470,
  //  canvasHeightPx: 400,
  //  drawHeads: true,
  //  drawTails: true,
  //  drawDotsHeads: true,
  //  drawDotsTails: true,
  //  drawLineToRightEdgeHeads: true,
  //  drawLineToRightEdgeTails: true,
  //  angleStartSliceIndex: 0,
  //  angleEndSliceIndex: 0,
  //});
  t.deepEqual(actual, expected);
  t.end();
});
