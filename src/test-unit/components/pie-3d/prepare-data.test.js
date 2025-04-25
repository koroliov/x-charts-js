//@flow strict
//$FlowFixMe[cannot-resolve-module]
import tp from 'tape';
import { prepareData } from '../../../components/pie-3d/prepare-data.js';

tp.test((t) => {
  const addComponentArg = {
    type: 'pie-3d',
    zIndex: '1',
    options: {
      thicknessPx: 50,
      radiusPx: 200,
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
        startPointHeads: [0, 0, 0],
        startPointTails: [0, 0, 0],
        endPointHeads: [0, 0, 0,],
        endPointTails: [0, 0, 50,],
        value: 40,
        color: '#ff0000',
      },
      {
        startPointHeads: [0, 0, 0],
        startPointTails: [0, 0, 0],
        endPointHeads: [0, 0, 0,],
        endPointTails: [0, 0, 50,],
        value: 25,
        color: '#37ff00',
      },
      {
        startPointHeads: [0, 0, 0],
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
      pointTails: [0, 0, 0,],
      sliceIndex: 0,
    },
    centerHeads: [300, 250, 0,],
    centerTails: [0, 0, 50,],
  };

  const actual = prepareData(addComponentArg);
  t.equal(actual, expected);
  t.end();
});
