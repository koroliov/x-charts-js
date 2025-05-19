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
      { value: 40, meta: { color: '#ff0000', }, },
      { value: 25, meta: { color: '#37ff00', }, },
      { value: 35, meta: { color: '#000aff', }, },
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
        "startAngleOnEllipseClockwise": 5.934119456780721,
        "endAngleOnEllipseClockwise": 3.420845333908886,
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
        "startAngleOnEllipseClockwise": 3.420845333908886,
        "endAngleOnEllipseClockwise": 1.85004900711399,
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
        "startAngleOnEllipseClockwise": 1.85004900711399,
        "endAngleOnEllipseClockwise": 5.934119456780721,
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
    "someEllipseMethodArgs": {
      "radiusX": 149.99999999999997,
      "radiusY": 74.99999999999999,
      "axesRotationCounterClockwise": -0.7853981633974483,
      "isCounterClockwiseOnVisibleFace": true,
    },
    "isHeadsVisibleToUser": true,
    "isTailsVisibleToUser": false,
    "isRimVisibleToUser": true,
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
        "startAngleOnEllipseClockwise": -3.9269908169872414,
        "endAngleOnEllipseClockwise": -2.356194490192345,
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
        "startAngleOnEllipseClockwise": -2.356194490192345,
        "endAngleOnEllipseClockwise": -0.7853981633974483,
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
        "startAngleOnEllipseClockwise": -0.7853981633974483,
        "endAngleOnEllipseClockwise": -3.9269908169872414,
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
    "someEllipseMethodArgs": {
      "radiusX": 200,
      "radiusY": 99.99999999999997,
      "axesRotationCounterClockwise": -0,
      "isCounterClockwiseOnVisibleFace": false,
    },
    "isHeadsVisibleToUser": false,
    "isTailsVisibleToUser": true,
    "isRimVisibleToUser": true,
  };

  const actual = prepareData(addComponentArg);
  //writeToTestDiffDir({ actual, expected, });
  //drawDataOnCanvas({
  //  serverAbsFilePath: '/test/served-tmp/foo.html',
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
