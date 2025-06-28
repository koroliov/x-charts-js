//@flow strict
//$FlowFixMe[cannot-resolve-module]
import tp from 'tape';
import { validate, getDictionary, } from '../../validation/constructor-arg.js';

tp.test('valid argument case', (t) => {
  const constructorArg = [
    {
    },
  ];
  const dict = getDictionary();
  const expected = '';

  const actual = validate(dict, constructorArg);
  t.deepEqual(actual, expected);
  t.end();
});
