//@flow strict
//$FlowFixMe[cannot-resolve-module]
import tp from 'tape';
import {
  validateAddComponentArgumentExternal as validate,
} from '../../../components/pie-3d/add-component-argument-validator.js';

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
      { value: 35, meta: { color: '#000aff' /* blue */, }, },
    ],
  };
  const expected = '';

  const actual = validate(addComponentArg);
  t.equal(actual, expected);
  t.end();
});
