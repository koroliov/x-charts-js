//@flow strict
//$FlowFixMe[cannot-resolve-module]
import tp from 'tape';
import { validate, getDictionary, }
  from '../../../../components/pie-3d/validation/add-method-arg.js';

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
  const dict = getDictionary();
  const expected = '';

  const actual = validate(dict, addComponentArg);
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
  const dict = getDictionary();

  const expected = [
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
    'Component pie-3d:',
    "  unknown property 'someUnknownProp'",
  ].join('\n');

  const actual = validate(dict, addComponentArg);
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
  const dict = getDictionary();

  const expected = [
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
    'Component pie-3d:',
    "  missing properties: data",
  ].join('\n');

  const actual = validate(dict, addComponentArg);
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
  const dict = getDictionary();

  const expected = [
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
    'Component pie-3d:',
    "  missing properties: options, data",
  ].join('\n');

  const actual = validate(dict, addComponentArg);
  t.equal(actual, expected);
  t.end();
});

//============ options ========================

tp.test('options is not object', (t) => {
  const addComponentArg = {
    type: 'pie-3d',
    zIndex: '1',
    options: true,
    data: [
      { value: 40, meta: { color: '#ff0000' /* red */, }, },
      { value: 25, meta: { color: '#37ff00' /* green */, }, },
      { value: 35, meta: { color: '#000aff' /* blue */, }, },
    ],
  };
  const dict = getDictionary();

  const expected = [
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
    'Component pie-3d -> options:',
    '  must be an object',
  ].join('\n');

  const actual = validate(dict, addComponentArg);
  t.equal(actual, expected);
  t.end();
});

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
  const dict = getDictionary();

  const expected = [
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
    'Component pie-3d -> options:',
    "  unknown property 'someUnknownProp'",
  ].join('\n');

  const actual = validate(dict, addComponentArg);
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
  const dict = getDictionary();

  const expected = [
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
    'Component pie-3d -> options:',
    "  missing properties: radiusPx",
  ].join('\n');

  const actual = validate(dict, addComponentArg);
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
  const dict = getDictionary();

  const expected = [
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
    'Component pie-3d -> options:',
    "  missing properties: radiusPx, startAtDeg",
  ].join('\n');

  const actual = validate(dict, addComponentArg);
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
  const dict = getDictionary();

  const expected = [
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
    'Component pie-3d -> options -> startAtDeg:',
    "  value must be a number in [+0, 360) range",
  ].join('\n');

  const actual = validate(dict, addComponentArg);
  t.equal(actual, expected);
  t.end();
});

//============ data values ========================

tp.test('data is not array', (t) => {
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
    data: true,
  };
  const dict = getDictionary();

  const expected = [
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
    'Component pie-3d -> data:',
    '  must be an non empty array',
  ].join('\n');

  const actual = validate(dict, addComponentArg);
  t.equal(actual, expected);
  t.end();
});

tp.test('data is empty array', (t) => {
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
    data: [],
  };
  const dict = getDictionary();

  const expected = [
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
    'Component pie-3d -> data:',
    '  must be an non empty array',
  ].join('\n');

  const actual = validate(dict, addComponentArg);
  t.equal(actual, expected);
  t.end();
});

tp.test('data array has non index property, allowed, ignored', (t) => {
  const data = [
    { value: 40, meta: { color: '#ff0000' /* red */, }, },
  ];
  //This is needed to check an error case
  //$FlowFixMe[prop-missing]
  data.fooProp = { value: -1, meta: { color: '#000aff' /* blue */, }, };
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
    data,
  };
  const dict = getDictionary();

  const expected = '';

  const actual = validate(dict, addComponentArg);
  t.equal(actual, expected);
  t.end();
});

tp.test('data array has sparse elements', (t) => {
  const data = [
    { value: 40, meta: { color: '#ff0000' /* red */, }, },
  ];
  data[4] = { value: 10, meta: { color: '#000aff' /* blue */, }, };
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
    data,
  };
  const dict = getDictionary();

  const expected = [
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
    'Component pie-3d -> data -> 1:',
    '  must be an object',
  ].join('\n');

  const actual = validate(dict, addComponentArg);
  t.equal(actual, expected);
  t.end();
});

tp.test('data array has total value 0', (t) => {
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
      { value: 0, meta: { color: '#ff0000' /* red */, }, },
      { value: 0, meta: { color: '#000aff' /* blue */, }, },
    ],
  };
  const dict = getDictionary();

  const expected = [
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
    'Component pie-3d -> data:',
    '  total value must be >= 0',
  ].join('\n');

  const actual = validate(dict, addComponentArg);
  t.equal(actual, expected);
  t.end();
});

tp.test('data element is not object', (t) => {
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
      true,
      { value: 35, meta: { color: '#000aff' /* blue */, }, },
    ],
  };
  const dict = getDictionary();

  const expected = [
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
    'Component pie-3d -> data -> 1:',
    '  must be an object',
  ].join('\n');

  const actual = validate(dict, addComponentArg);
  t.equal(actual, expected);
  t.end();
});

tp.test('prop is missing', (t) => {
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
      { /*value: 35,*/ meta: { color: '#000aff' /* blue */, }, },
    ],
  };
  const dict = getDictionary();

  const expected = [
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
    'Component pie-3d -> data -> 1:',
    "  missing properties: value",
  ].join('\n');

  const actual = validate(dict, addComponentArg);
  t.equal(actual, expected);
  t.end();
});

tp.test('prop is not object', (t) => {
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
      { value: 35, meta: true, },
    ],
  };
  const dict = getDictionary();

  const expected = [
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
    'Component pie-3d -> data -> 1 -> meta:',
    "  must be an object",
  ].join('\n');

  const actual = validate(dict, addComponentArg);
  t.equal(actual, expected);
  t.end();
});

tp.test('value is not valid', (t) => {
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
      { value: -1, meta: { color: '#000aff' /* blue */, }, },
    ],
  };
  const dict = getDictionary();

  const expected = [
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
    'Component pie-3d -> data -> 1 -> value:',
    '  value must be a finite number >= 0',
  ].join('\n');

  const actual = validate(dict, addComponentArg);
  t.equal(actual, expected);
  t.end();
});

tp.test('prop is missing on level 1', (t) => {
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
      { value: 35, meta: { /*color: '#000aff' * blue ,*/ }, },
    ],
  };
  const dict = getDictionary();

  const expected = [
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
    'Component pie-3d -> data -> 1 -> meta:',
    "  missing properties: color",
  ].join('\n');

  const actual = validate(dict, addComponentArg);
  t.equal(actual, expected);
  t.end();
});

tp.test('prop is invalid on level 1', (t) => {
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
      { value: 40, meta: { color: '#FF0000' /* red */, }, },
      { value: 35, meta: { color: '#000afg' /* blue */, }, },
    ],
  };
  const dict = getDictionary();

  const expected = [
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
    'Component pie-3d -> data -> 1 -> meta -> color:',
    '  value must be a full (6 char long) hex string, e.g. #ffffff, not #fff',
  ].join('\n');

  const actual = validate(dict, addComponentArg);
  t.equal(actual, expected);
  t.end();
});
