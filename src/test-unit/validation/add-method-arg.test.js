//@flow strict
//$FlowFixMe[cannot-resolve-module]
import tp from 'tape';
import type { AddComponentArgument, } from '../../types.js';
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
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG_WRONG_NUMBER_OF_ARGS:',
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
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG_WRONG_NUMBER_OF_ARGS:',
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
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG_PROPS_MISSING:',
    `Properties: type`,
    'are missing on the provided argument to the add method()',
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
    "Property 'type' must be a non-empty string",
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
    "Property 'zIndex' must be a numeric integer string",
    'no white space is allowed',
  ].join('\n');

  const actual = validate(dict, addComponentArguments);
  t.deepEqual(actual, expected);
  t.end();
});
