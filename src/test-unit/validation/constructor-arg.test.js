//@flow strict
//$FlowFixMe[cannot-resolve-module]
import tp from 'tape';
import { validate, getDictionary, } from '../../validation/constructor-arg.js';

tp.test('valid argument case', (t) => {
  const ContainerDiv = class ContainerDiv {  }
  const constructorArg = [
    {
      containerDiv: new ContainerDiv(),
      options: {
        backgroundColor: '#ffffff' /* white */,
      },
    },
  ];
  //In tests it's acceptable
  //$FlowFixMe[incompatible-call]
  const dict = getDictionary(ContainerDiv);
  const expected = '';

  const actual = validate(dict, constructorArg);
  t.deepEqual(actual, expected);
  t.end();
});
