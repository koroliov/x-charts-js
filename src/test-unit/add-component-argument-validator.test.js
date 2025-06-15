//@flow strict
//$FlowFixMe[cannot-resolve-module]
import tp from 'tape';
import { validate, } from '../add-component-argument-validator.js';

tp.test('valid argument case', (t) => {
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
    ],
  };
  const expected = '';

  const actual = validate(addComponentArg);
  t.equal(actual, expected);
  t.end();
});

tp.test.skip('missing type property', (t) => {
  const addComponentArg = {
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
    ],
  };
  const expected = '';

  //$FlowFixMe[prop-missing] we have to test invalid arguments
  const actual = validate(addComponentArg);
  t.equal(actual, expected);
  t.end();
});
