//@flow strict
//$FlowFixMe[cannot-resolve-module]
import tp from 'tape';
import { validate, }
  from '../../../components/pie-3d/add-component-argument-validator.js';

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
  const propsToCheck = new Set([
    'options',
    'data',
  ]);
  const expected = '';

  const actual = validate(propsToCheck, addComponentArg);
  t.equal(actual, expected);
  t.end();
});

//============ top level props ========================
tp.test('extra property present', (t) => {
  const addComponentArg = {
    type: 'pie-3d',
    zIndex: '1',
    someUnknownProp: 'foo',
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
  const propsToCheck = new Set([
    'someUnknownProp',
    'options',
    'data',
  ]);

  const expected = [
    'ERR_X_CHARTS_PIE_3D_INVALID_ADD_METHOD_ARG_UNKNOWN_PROP:',
    "Component pie-3d doesn't support property 'someUnknownProp'",
  ].join('\n');

  const actual = validate(propsToCheck, addComponentArg);
  t.equal(actual, expected);
  t.end();
});

tp.test.skip('property missing', (t) => {
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
  };
  const propsToCheck = new Set([
    'options',
  ]);

  const expected = [
    'ERR_X_CHARTS_PIE_3D_INVALID_ADD_METHOD_ARG_MISSING_PROP:',
    "Component pie-3d doesn't support property 'someUnknownProp'",
  ].join('\n');

  const actual = validate(propsToCheck, addComponentArg);
  t.equal(actual, expected);
  t.end();
});
