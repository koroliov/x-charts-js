//@flow strict
//$FlowFixMe[cannot-resolve-module]
import tp from 'tape';
import { validate, getDictionary, } from
  '../../src/validation/constructor-arg.js';

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

tp.test('containerDiv is not valid', (t) => {
  const ContainerDiv = class ContainerDiv {  }
  const ContainerSpan = class ContainerSpan {  }
  const constructorArg = [
    {
      containerDiv: new ContainerSpan(),
      options: {
        backgroundColor: '#ffffff' /* white */,
      },
    },
  ];
  //In tests it's acceptable
  //$FlowFixMe[incompatible-call]
  const dict = getDictionary(ContainerDiv);
  const expected = [
    'ERR_X_CHARTS_INVALID_CONSTRUCTOR_ARG:',
    'new XCharts() argument -> containerDiv:',
    '  value must be an HTMLDivElement',
  ].join('\n');

  const actual = validate(dict, constructorArg);
  t.deepEqual(actual, expected);
  t.end();
});

//options validation
tp.test('extra argument in options', (t) => {
  const ContainerDiv = class ContainerDiv {  }
  const constructorArg = [
    {
      containerDiv: new ContainerDiv(),
      options: {
        foo: 'foo',
        backgroundColor: '#ffffff' /* white */,
      },
    },
  ];
  //In tests it's acceptable
  //$FlowFixMe[incompatible-call]
  const dict = getDictionary(ContainerDiv);
  const expected = [
    'ERR_X_CHARTS_INVALID_CONSTRUCTOR_ARG:',
    'new XCharts() argument -> options:',
    "  unknown property 'foo'",
  ].join('\n');

  const actual = validate(dict, constructorArg);
  t.deepEqual(actual, expected);
  t.end();
});
