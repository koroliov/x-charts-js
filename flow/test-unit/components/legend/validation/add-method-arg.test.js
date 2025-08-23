//@flow strict
//$FlowFixMe[cannot-resolve-module]
import tp from 'tape';
import { validate, getDictionary, }
  from '../../../../src/components/legend/validation/add-method-arg.js';

tp.test('valid argument case', (t) => {
  const addMethodArg = {
    type: 'legend',
    zIndex: '1',
    htmlFragment: '<style>div { color: red; }</style><div></div>',
  };
  const dict = getDictionary();
  const expected = '';

  const actual = validate(dict, addMethodArg);
  t.equal(actual, expected);
  t.end();
});

//============ top level props ========================
tp.test('extra property present', (t) => {
  const addMethodArg = {
    type: 'legend',
    zIndex: '1',
    someUnknownProp: 1,
    htmlFragment: '<style>div { color: red; }</style><div></div>',
  };
  const dict = getDictionary();

  const expected = [
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
    '.add() method argument, component legend:',
    "  unknown property 'someUnknownProp'",
  ].join('\n');

  const actual = validate(dict, addMethodArg);
  t.equal(actual, expected);
  t.end();
});

tp.test('htmlFragment is not string', (t) => {
  const addMethodArg = {
    type: 'legend',
    zIndex: '1',
    htmlFragment: 0,
  };
  const dict = getDictionary();

  const expected = [
    'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
    '.add() method argument, component legend -> htmlFragment:',
    '  value must be a non-empty valid HTML string',
  ].join('\n');

  const actual = validate(dict, addMethodArg);
  t.equal(actual, expected);
  t.end();
});
