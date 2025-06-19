//@flow strict
//$FlowFixMe[cannot-resolve-module]
import tp from 'tape';
import type { AddComponentArgument, } from '../types.js';
import { validate, } from '../add-component-argument-validator.js';

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

  const expected = {
    errorMsg: '',
    propsToCheck: new Set([ 'options', 'data', ]),
  };

  const actual = validate(addComponentArguments);
  t.deepEqual(actual, expected);
  t.end();
});

//================= general checks ========================

tp.test('no arguments', (t) => {
  const addComponentArguments: Array<mixed> = [];
  const expected = {
    errorMsg: [
      'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG_WRONG_NUMBER_OF_ARGS:',
      'The .add() method expects a single argument',
    ].join('\n'),
    propsToCheck: new Set() as Set<string>,
  };

  const actual = validate(addComponentArguments);
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
  const expected = {
    errorMsg: [
      'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG_WRONG_NUMBER_OF_ARGS:',
      'The .add() method expects a single argument',
    ].join('\n'),
    propsToCheck: new Set() as Set<string>,
  };

  const actual = validate(addComponentArguments);
  t.deepEqual(actual, expected);
  t.end();
});

tp.test('arg is not object', (t) => {
  const addComponentArguments = ['abc',];
  const expected = {
    errorMsg: [
      'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
      'Argument to the .add() method must be an object',
      'e.g. {  }, Object.create(null)',
    ].join('\n'),
    propsToCheck: new Set() as Set<string>,
  };

  const actual = validate(addComponentArguments);
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
  const expected = {
    errorMsg: [
      'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG_PROPS_MISSING:',
      `Properties: type`,
      'are missing on the provided argument to the add method()',
    ].join('\n'),
    propsToCheck: new Set() as Set<string>,
  };

  const actual = validate(addComponentArguments);
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
  const expected = {
    errorMsg: [
      'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG_TYPE_VAL:',
      "Property 'type' must be a non-empty string",
      "Provided string '' in argument",
      'to the .add() method',
    ].join('\n'),
    propsToCheck: new Set() as Set<string>,
  };

  const actual = validate(addComponentArguments);
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
  const expected = {
    errorMsg: '',
    propsToCheck: new Set([ 'options', 'data', ]),
  };

  const actual = validate(addComponentArguments);
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
  const expected = {
    errorMsg: [
      'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG_ZINDEX_VAL:',
      "Property 'zIndex' must be a numeric integer string",
      'no white space is allowed',
      "Provided string '1 ' in argument",
      'to the .add() method',
    ].join('\n'),
    propsToCheck: new Set() as Set<string>,
  };

  const actual = validate(addComponentArguments);
  t.deepEqual(actual, expected);
  t.end();
});
