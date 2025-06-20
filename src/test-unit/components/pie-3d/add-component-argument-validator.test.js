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
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
    'Component pie-3d:',
    "  unknown property 'someUnknownProp'",
  ].join('\n');

  const actual = validate(propsToCheck, addComponentArg);
  t.equal(actual, expected);
  t.end();
});

tp.test('missing property', (t) => {
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
    //data: [],
  };
  const propsToCheck = new Set([
    'options',
  ]);

  const expected = [
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
    'Component pie-3d:',
    "  missing properties: data",
  ].join('\n');

  const actual = validate(propsToCheck, addComponentArg);
  t.equal(actual, expected);
  t.end();
});

tp.test('missing properties', (t) => {
  const addComponentArg = {
    type: 'pie-3d',
    zIndex: '1',
    //options: { },
    //data: [],
  };
  const propsToCheck: Set<string> = new Set();

  const expected = [
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
    'Component pie-3d:',
    "  missing properties: options, data",
  ].join('\n');

  const actual = validate(propsToCheck, addComponentArg);
  t.equal(actual, expected);
  t.end();
});

//============ options props ========================

tp.test('extra property', (t) => {
  const addComponentArg = {
    type: 'pie-3d',
    zIndex: '1',
    options: {
      someUnknownProp: 'foo',
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

  const expected = [
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
    'Component pie-3d -> options:',
    "  unknown property 'someUnknownProp'",
  ].join('\n');

  const actual = validate(propsToCheck, addComponentArg);
  t.equal(actual, expected);
  t.end();
});

tp.test('missing property', (t) => {
  const addComponentArg = {
    type: 'pie-3d',
    zIndex: '1',
    options: {
      thicknessPx: 50,
      //radiusPx: 150,
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

  const expected = [
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
    'Component pie-3d -> options:',
    "  missing properties: radiusPx",
  ].join('\n');

  const actual = validate(propsToCheck, addComponentArg);
  t.equal(actual, expected);
  t.end();
});

tp.test('missing properties', (t) => {
  const addComponentArg = {
    type: 'pie-3d',
    zIndex: '1',
    options: {
      thicknessPx: 50,
      //radiusPx: 150,
      centerXPx: 300,
      centerYPx: 250,
      //startAtDeg: 20,
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

  const expected = [
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
    'Component pie-3d -> options:',
    "  missing properties: radiusPx, startAtDeg",
  ].join('\n');

  const actual = validate(propsToCheck, addComponentArg);
  t.equal(actual, expected);
  t.end();
});

tp.test('startAtDeg invalid', (t) => {
  const addComponentArg = {
    type: 'pie-3d',
    zIndex: '1',
    options: {
      thicknessPx: 50,
      radiusPx: 150,
      centerXPx: 300,
      centerYPx: 250,
      startAtDeg: -1,
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

  const expected = [
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
    'Component pie-3d -> options -> startAtDeg:',
    "  value must be a number in [+0, 360) range",
  ].join('\n');

  const actual = validate(propsToCheck, addComponentArg);
  t.equal(actual, expected);
  t.end();
});
