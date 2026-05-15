//@flow strict
//$FlowFixMe[cannot-resolve-module]
import tp from 'tape';
import { process, } from
  '../../../src/main/process-external-values/add-method-arg.js';

tp.test('valid argument case', (t) => {
  const addMethodArguments: Array<mixed> = [
    {
      type: 'foo',
      zIndex: '2',
      anyOtherProp: 'any',
    },
  ];
  const registeredTypes = new Set([ 'foo', 'bar', ]);
  const expected = {
    validationErrorMessage: '',
    valueToUse: {
      type: 'foo',
      zIndex: '2',
    },
  };

  const actual = process(addMethodArguments, registeredTypes);
  t.deepEqual(actual, expected);
  t.end();
});

tp.test('zIndex default value', (t) => {
  const addMethodArguments: Array<mixed> = [
    {
      type: 'foo',
      anyOtherProp: 'any',
    },
  ];
  const registeredTypes = new Set([ 'foo', 'bar', ]);
  const expected = {
    validationErrorMessage: '',
    valueToUse: {
      type: 'foo',
      zIndex: '1',
    },
  };

  const actual = process(addMethodArguments, registeredTypes);
  t.deepEqual(actual, expected);
  t.end();
});

tp.test('zIndex negative value', (t) => {
  const addMethodArguments: Array<mixed> = [
    {
      type: 'foo',
      zIndex: '-1',
      anyOtherProp: 'any',
    },
  ];
  const registeredTypes = new Set([ 'foo', 'bar', ]);
  const expected = {
    validationErrorMessage: '',
    valueToUse: {
      type: 'foo',
      zIndex: '-1',
    },
  };

  const actual = process(addMethodArguments, registeredTypes);
  t.deepEqual(actual, expected);
  t.end();
});

//Invalid cases, arguments
tp.test('no arguments', (t) => {
  const addMethodArguments: Array<mixed> = [];
  const registeredTypes = new Set([ 'foo', 'bar', ]);
  const expected = {
    validationErrorMessage: [
      'ERR_X_CHARTS_JS_INVALID_ADD_METHOD_ARG:',
      '  The .add() method expects a single argument, received 0',
    ].join('\n'),
    valueToUse: null,
  };

  const actual = process(addMethodArguments, registeredTypes);
  t.deepEqual(actual, expected);
  t.end();
});

tp.test('extra arguments', (t) => {
  const addMethodArguments: Array<mixed> = [
    {
      type: 'foo',
      zIndex: '2',
      anyOtherProp: 'any',
    },
    null,
  ];
  const registeredTypes = new Set([ 'foo', 'bar', ]);
  const expected = {
    validationErrorMessage: [
      'ERR_X_CHARTS_JS_INVALID_ADD_METHOD_ARG:',
      '  The .add() method expects a single argument, received 2',
    ].join('\n'),
    valueToUse: null,
  };

  const actual = process(addMethodArguments, registeredTypes);
  t.deepEqual(actual, expected);
  t.end();
});

tp.test('argument is not object', (t) => {
  const addMethodArguments: Array<mixed> = [ 'foo', ];
  const registeredTypes = new Set([ 'foo', 'bar', ]);
  const expected = {
    validationErrorMessage: [
      'ERR_X_CHARTS_JS_INVALID_ADD_METHOD_ARG:',
      '  argument 0:',
      '  value must be an object, e.g. {  }, Object.create(null)',
    ].join('\n'),
    valueToUse: null,
  };

  const actual = process(addMethodArguments, registeredTypes);
  t.deepEqual(actual, expected);
  t.end();
});

tp.test('argument is not a pure object', (t) => {
  //For testing purposes
  //$FlowFixMe[invalid-constructor]
  const addMethodArguments: Array<mixed> = [ new function() {}, ];
  const registeredTypes = new Set([ 'foo', 'bar', ]);
  const expected = {
    validationErrorMessage: [
      'ERR_X_CHARTS_JS_INVALID_ADD_METHOD_ARG:',
      '  argument 0:',
      '  value must be an object, e.g. {  }, Object.create(null)',
    ].join('\n'),
    valueToUse: null,
  };

  const actual = process(addMethodArguments, registeredTypes);
  t.deepEqual(actual, expected);
  t.end();
});

//Invalid cases, type
tp.test('missed property type', (t) => {
  const addMethodArguments: Array<mixed> = [
    {
      zIndex: '2',
      anyOtherProp: 'any',
    },
  ];
  const registeredTypes = new Set([ 'foo', 'bar', ]);
  const expected = {
    validationErrorMessage: [
      'ERR_X_CHARTS_JS_INVALID_ADD_METHOD_ARG:',
      '  argument 0 -> type:',
      '  property is missing',
    ].join('\n'),
    valueToUse: null,
  };

  const actual = process(addMethodArguments, registeredTypes);
  t.deepEqual(actual, expected);
  t.end();
});

tp.test('unregistered type', (t) => {
  const addMethodArguments: Array<mixed> = [
    {
      type: 'unknownType',
      zIndex: '2',
      anyOtherProp: 'any',
    },
  ];
  const registeredTypes = new Set([ 'foo', 'bar', ]);
  const expected = {
    validationErrorMessage: [
      'ERR_X_CHARTS_JS_INVALID_ADD_METHOD_ARG:',
      '  argument 0 -> type:',
      `  component of type 'unknownType' has not been registered,`,
      'registered components are: foo, bar',
    ].join('\n'),
    valueToUse: null,
  };

  const actual = process(addMethodArguments, registeredTypes);
  t.deepEqual(actual, expected);
  t.end();
});

//Invalid cases, zIndex
tp.test('unregistered type', (t) => {
  const addMethodArguments: Array<mixed> = [
    {
      type: 'foo',
      zIndex: '1 ',
      anyOtherProp: 'any',
    },
  ];
  const registeredTypes = new Set([ 'foo', 'bar', ]);
  const expected = {
    validationErrorMessage: [
      'ERR_X_CHARTS_JS_INVALID_ADD_METHOD_ARG:',
      '  argument 0 -> zIndex:',
      '  value must be a numeric integer string with no white spaces',
    ].join('\n'),
    valueToUse: null,
  };

  const actual = process(addMethodArguments, registeredTypes);
  t.deepEqual(actual, expected);
  t.end();
});
