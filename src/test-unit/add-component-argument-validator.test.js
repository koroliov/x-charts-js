//@flow strict
//$FlowFixMe[cannot-resolve-module]
import tp from 'tape';
import type { AddComponentArgument, } from '../types.js';
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

//================= general checks ========================
tp.test('arg is not litteral or Object.create(null)', (t) => {
  let addComponentArg = Object.create({});
  //$FlowFixMe[prop-missing]
  addComponentArg = Object.assign(addComponentArg, {
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
  });
  const expected = [
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
    'Argument to the .add() method must be an object with prototype',
    'either Object.prototype, e.g. {  }, or null, i.e. Object.create(null)',
  ].join('\n');

  //$FlowFixMe[prop-missing] we have to test invalid arguments
  const actual = validate(addComponentArg);
  t.equal(actual, expected);
  t.end();
});

tp.test('missing type property and present on Object.protype', (t) => {
  //$FlowFixMe[prop-missing]
  Object.prototype.type = 'pie-3d';
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
  const expected = [
    'ERR_X_CHARTS_MISSING_PROP_IN_ADD_METHOD_ARG:',
    "Property 'type' is missing on the provided argument",
    'to the .add() method',
  ].join('\n');

  //$FlowFixMe[prop-missing] we have to test invalid arguments
  const actual = validate(addComponentArg);
  //$FlowFixMe[prop-missing]
  delete Object.prototype.type;
  t.ok(actual.startsWith(expected));
  t.end();
});

tp.test('missing type property with proto null', (t) => {
  //$FlowFixMe[incompatible-type]
  //$FlowFixMe[prop-missing]
  let addComponentArg: AddComponentArgument = Object.create(null);
  //$FlowFixMe[cannot-write]
  addComponentArg = Object.assign(addComponentArg, {
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
  });
  const expected = [
    'ERR_X_CHARTS_MISSING_PROP_IN_ADD_METHOD_ARG:',
    "Property 'type' is missing on the provided argument",
    'to the .add() method',
  ].join('\n');

  const actual = validate(addComponentArg);
  t.ok(actual.startsWith(expected));
  t.end();
});

//================ type property checks ===============
tp.test('invalid type property, empty string ""', (t) => {
  const addComponentArg = {
    type: '',
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
  const expected = [
    'ERR_X_CHARTS_INVALID_COMPONENT_TYPE_ON_ADD:',
    "Property 'type' must be a non-empty string",
    "Provided string '' in argument",
    'to the .add() method',
  ].join('\n');

  const actual = validate(addComponentArg);
  t.ok(actual.startsWith(expected));
  t.end();
});

tp.test('invalid type property, null', (t) => {
  const addComponentArg = {
    type: null,
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
  const expected = [
    'ERR_X_CHARTS_INVALID_COMPONENT_TYPE_ON_ADD:',
    "Property 'type' must be a non-empty string",
    "Provided object 'null' in argument",
    'to the .add() method',
  ].join('\n');

  //$FlowFixMe[incompatible-call]
  const actual = validate(addComponentArg);
  t.ok(actual.startsWith(expected));
  t.end();
});

//================ zIndex property checks ===============
tp.test('zIndex property negative integers allowed', (t) => {
  const addComponentArg = {
    type: 'pie-3d',
    zIndex: '-1',
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

tp.test('invalid zIndex property', (t) => {
  const addComponentArg = {
    type: 'pie-3d',
    zIndex: '1 ',
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
  const expected = [
    'ERR_X_CHARTS_INVALID_ZINDEX_ON_ADD:',
    "Property 'zIndex' must be a numeric integer string",
    'no white space is allowed',
    "Provided string '1 ' in argument",
    'to the .add() method',
  ].join('\n');

  const actual = validate(addComponentArg);
  t.ok(actual.startsWith(expected));
  t.end();
});
