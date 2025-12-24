//@flow strict
//$FlowFixMe[cannot-resolve-module]
import tp from 'tape';
import { process, } from
  '../../../../src/components/legend/process-external-values/add-method-arg.js';
import type { PureObject, } from '../../../../src/types.js';

tp.test('valid argument case', (t) => {
  const addMethodArg: PureObject = {
    type: 'legend',
    zIndex: '1',
    htmlFragment: '<style>div { color: red; }</style><div></div>',
  };
  const expected = {
    validationErrorMessage: '',
    valueToUse: {
      htmlFragment: '<style>div { color: red; }</style><div></div>',
    },
  };

  const actual = process(addMethodArg);
  t.deepEqual(actual, expected);
  t.end();
});

//Invalid cases
tp.test('extra property present', (t) => {
  const addMethodArg: PureObject = {
    type: 'legend',
    zIndex: '1',
    foo: 1,
    htmlFragment: '<style>div { color: red; }</style><div></div>',
  };
  const expected = {
    validationErrorMessage: [
      'ERR_X_CHARTS_JS_INVALID_ADD_METHOD_ARG:',
      '  argument 0:',
      "  Unknown property 'foo'",
    ].join('\n'),
    valueToUse: null,
  };

  const actual = process(addMethodArg);
  t.deepEqual(actual, expected);
  t.end();
});

tp.test('htmlFragment is not string', (t) => {
  const addMethodArg: PureObject = {
    type: 'legend',
    zIndex: '1',
    htmlFragment: 0,
  };
  const expected = {
    validationErrorMessage: [
      'ERR_X_CHARTS_JS_INVALID_ADD_METHOD_ARG:',
      '  argument 0 -> htmlFragment:',
      '  Value must be a non-empty valid HTML string',
    ].join('\n'),
    valueToUse: null,
  };

  const actual = process(addMethodArg);
  t.deepEqual(actual, expected);
  t.end();
});

tp.test('htmlFragment is missing', (t) => {
  const addMethodArg: PureObject = {
    type: 'legend',
    zIndex: '1',
  };
  const expected = {
    validationErrorMessage: [
      'ERR_X_CHARTS_JS_INVALID_ADD_METHOD_ARG:',
      '  argument 0 -> htmlFragment:',
      '  Property is missing',
    ].join('\n'),
    valueToUse: null,
  };

  const actual = process(addMethodArg);
  t.deepEqual(actual, expected);
  t.end();
});
