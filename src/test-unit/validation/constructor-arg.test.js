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

tp.test('no arguments', (t) => {
  const ContainerDiv = class ContainerDiv {  }
  const constructorArg: Array<mixed> = [
  ];
  //In tests it's acceptable
  //$FlowFixMe[incompatible-call]
  const dict = getDictionary(ContainerDiv);
  const expected = [
    'ERR_X_CHARTS_INVALID_CONSTRUCTOR_ARG:',
    'The new XCharts() constructor expects a single argument',
  ].join('\n');

  const actual = validate(dict, constructorArg);
  t.deepEqual(actual, expected);
  t.end();
});

tp.test('extra arguments', (t) => {
  const ContainerDiv = class ContainerDiv {  }
  const constructorArg = [
    {
      containerDiv: new ContainerDiv(),
      options: {
        backgroundColor: '#ffffff' /* white */,
      },
    },
    'foo',
  ];
  //In tests it's acceptable
  //$FlowFixMe[incompatible-call]
  const dict = getDictionary(ContainerDiv);
  const expected = [
    'ERR_X_CHARTS_INVALID_CONSTRUCTOR_ARG:',
    'The new XCharts() constructor expects a single argument',
  ].join('\n');

  const actual = validate(dict, constructorArg);
  t.deepEqual(actual, expected);
  t.end();
});

tp.test('argument is not object', (t) => {
  const ContainerDiv = class ContainerDiv {  }
  const constructorArg = [
    'foo',
  ];
  //In tests it's acceptable
  //$FlowFixMe[incompatible-call]
  const dict = getDictionary(ContainerDiv);
  const expected = [
    'ERR_X_CHARTS_INVALID_CONSTRUCTOR_ARG:',
    'Argument to the new XCharts() constructor must be an object',
    'e.g. {  }, Object.create(null)',
  ].join('\n');

  const actual = validate(dict, constructorArg);
  t.deepEqual(actual, expected);
  t.end();
});
