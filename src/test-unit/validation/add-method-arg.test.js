//@flow strict
//$FlowFixMe[cannot-resolve-module]
import tp from 'tape';
import { validate, getDictionary, } from '../../validation/add-method-arg.js';

tp.test('valid argument case', (t) => {
  const addComponentArguments = [
    {
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
    },
  ];
  const dict = getDictionary();
  const expected = '';

  const actual = validate(dict, addComponentArguments);
  t.deepEqual(actual, expected);
  t.end();
});

//================= general checks ========================

tp.test('no arguments', (t) => {
  const addComponentArguments: Array<mixed> = [];
  const dict = getDictionary();
  const expected = [
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
    'The .add() method expects a single argument',
  ].join('\n');

  const actual = validate(dict, addComponentArguments);
  t.deepEqual(actual, expected);
  t.end();
});

tp.test('extra arguments', (t) => {
  const addComponentArguments = [
    {
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
    },
    'foo',
  ];
  const dict = getDictionary();
  const expected = [
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
    'The .add() method expects a single argument',
  ].join('\n');

  const actual = validate(dict, addComponentArguments);
  t.deepEqual(actual, expected);
  t.end();
});

tp.test('arg is not object', (t) => {
  const addComponentArguments = ['abc',];
  const dict = getDictionary();
  const expected = [
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
    'Argument to the .add() method must be an object',
    'e.g. {  }, Object.create(null)',
  ].join('\n');

  const actual = validate(dict, addComponentArguments);
  t.deepEqual(actual, expected);
  t.end();
});

tp.test('missing property', (t) => {
  const addComponentArguments = [
    {
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
    },
  ];
  const dict = getDictionary();
  const expected = [
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
    '.add() method argument:',
    '  missing properties: type',
  ].join('\n');

  const actual = validate(dict, addComponentArguments);
  t.deepEqual(actual, expected);
  t.end();
});

//================ type property checks ===============
tp.test('invalid type property, empty string ""', (t) => {
  const addComponentArguments = [
    {
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
    },
  ];
  const dict = getDictionary();
  const expected = [
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
    '.add() method argument -> type:',
    '  value must be a non-empty string',
  ].join('\n');

  const actual = validate(dict, addComponentArguments);
  t.deepEqual(actual, expected);
  t.end();
});

//================ zIndex property checks ===============
tp.test('zIndex property negative integers allowed', (t) => {
  const addComponentArguments = [
    {
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
    },
  ];
  const dict = getDictionary();
  const expected = '';

  const actual = validate(dict, addComponentArguments);
  t.deepEqual(actual, expected);
  t.end();
});

tp.test('invalid zIndex property', (t) => {
  const addComponentArguments = [
    {
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
    },
  ];
  const dict = getDictionary();
  const expected = [
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
    '.add() method argument -> zIndex:',
    '  value must be a numeric integer string with no white spaces',
  ].join('\n');

  const actual = validate(dict, addComponentArguments);
  t.deepEqual(actual, expected);
  t.end();
});
