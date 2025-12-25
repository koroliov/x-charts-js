//@flow strict
//$FlowFixMe[cannot-resolve-module]
import tp from 'tape';
import { process, } from
  '../../../src/main/process-external-values/constructor-arg.js';

tp.test('valid argument case, check references not copied', (t) => {
  //For testing purposes
  //$FlowFixMe[incompatible-type]
  const ContainerDiv: Class<HTMLDivElement> = class ContainerDiv {  };
  const constructorArguments: Array<mixed> = [
    {
      containerDiv: new ContainerDiv(),
      options: {
        backgroundColor: '#000000' /* black */,
        isComponentInspectMode: true,
      },
    },
  ];
  const expected = {
    validationErrorMessage: '',
    valueToUse: {
      containerDiv: new ContainerDiv(),
      options: {
        backgroundColor: '#000000' /* black */,
        isComponentInspectMode: true,
      },
    },
  };

  const actual = process(constructorArguments, ContainerDiv);
  t.deepEqual(actual, expected);
  t.notEqual(actual.valueToUse, constructorArguments[0]);
  //.options property is present in the constructorArguments
  //$FlowFixMe[incompatible-use]
  t.notEqual(actual.valueToUse.options, constructorArguments[0].options);
  //.options property is present in the constructorArguments
  //$FlowFixMe[incompatible-use]
  t.equal(actual.valueToUse.containerDiv, constructorArguments[0].containerDiv);
  t.end();
});

tp.test('valid argument case, default all options', (t) => {
  //For testing purposes
  //$FlowFixMe[incompatible-type]
  const ContainerDiv: Class<HTMLDivElement> = class ContainerDiv {  };
  const constructorArguments: Array<mixed> = [
    {
      containerDiv: new ContainerDiv(),
    },
  ];
  const expected = {
    validationErrorMessage: '',
    valueToUse: {
      containerDiv: new ContainerDiv(),
      options: {
        backgroundColor: '#ffffff' /* white */,
        isComponentInspectMode: false,
      },
    },
  };

  const actual = process(constructorArguments, ContainerDiv);
  t.deepEqual(actual, expected);
  t.end();
});

tp.test('valid argument case, default backgroundColor', (t) => {
  //For testing purposes
  //$FlowFixMe[incompatible-type]
  const ContainerDiv: Class<HTMLDivElement> = class ContainerDiv {  };
  const constructorArguments: Array<mixed> = [
    {
      containerDiv: new ContainerDiv(),
      options: {
        isComponentInspectMode: false,
      },
    },
  ];
  const expected = {
    validationErrorMessage: '',
    valueToUse: {
      containerDiv: new ContainerDiv(),
      options: {
        backgroundColor: '#ffffff' /* white */,
        isComponentInspectMode: false,
      },
    },
  };

  const actual = process(constructorArguments, ContainerDiv);
  t.deepEqual(actual, expected);
  t.end();
});

tp.test('valid argument case, default isComponentInspectMode', (t) => {
  //For testing purposes
  //$FlowFixMe[incompatible-type]
  const ContainerDiv: Class<HTMLDivElement> = class ContainerDiv {  };
  const constructorArguments: Array<mixed> = [
    {
      containerDiv: new ContainerDiv(),
      options: {
        backgroundColor: '#ffffff' /* white */,
      },
    },
  ];
  const expected = {
    validationErrorMessage: '',
    valueToUse: {
      containerDiv: new ContainerDiv(),
      options: {
        backgroundColor: '#ffffff' /* white */,
        isComponentInspectMode: false,
      },
    },
  };

  const actual = process(constructorArguments, ContainerDiv);
  t.deepEqual(actual, expected);
  t.end();
});

//Invalid cases, arguments
tp.test('no arguments', (t) => {
  //For testing purposes
  //$FlowFixMe[incompatible-type]
  const ContainerDiv: Class<HTMLDivElement> = class ContainerDiv {  };
  const constructorArguments: Array<mixed> = [];
  const expected = {
    validationErrorMessage: [
      'ERR_X_CHARTS_JS_INVALID_CONSTRUCTOR_ARG:',
      '  The new XChartsJs() constructor expects a single argument, received 0',
    ].join('\n'),
    valueToUse: null,
  };

  const actual = process(constructorArguments, ContainerDiv);
  t.deepEqual(actual, expected);
  t.end();
});

tp.test('extra arguments', (t) => {
  //For testing purposes
  //$FlowFixMe[incompatible-type]
  const ContainerDiv: Class<HTMLDivElement> = class ContainerDiv {  };
  const constructorArguments: Array<mixed> = [
    {
      containerDiv: new ContainerDiv(),
      options: {
        backgroundColor: '#ffffff' /* white */,
        isComponentInspectMode: false,
      },
    },
    null,
  ];
  const expected = {
    validationErrorMessage: [
      'ERR_X_CHARTS_JS_INVALID_CONSTRUCTOR_ARG:',
      '  The new XChartsJs() constructor expects a single argument, received 2',
    ].join('\n'),
    valueToUse: null,
  };

  const actual = process(constructorArguments, ContainerDiv);
  t.deepEqual(actual, expected);
  t.end();
});

//Invalid cases, argument
tp.test('argument is not object', (t) => {
  //For testing purposes
  //$FlowFixMe[incompatible-type]
  const ContainerDiv: Class<HTMLDivElement> = class ContainerDiv {  };
  const constructorArguments: Array<mixed> = [
    'foo',
  ];
  const expected = {
    validationErrorMessage: [
      'ERR_X_CHARTS_JS_INVALID_CONSTRUCTOR_ARG:',
      '  argument 0:',
      '  Must be an object, e.g. {  }, Object.create(null)',
    ].join('\n'),
    valueToUse: null,
  };

  const actual = process(constructorArguments, ContainerDiv);
  t.deepEqual(actual, expected);
  t.end();
});

tp.test('extra property in argument', (t) => {
  //For testing purposes
  //$FlowFixMe[incompatible-type]
  const ContainerDiv: Class<HTMLDivElement> = class ContainerDiv {  };
  const constructorArguments: Array<mixed> = [
    {
      containerDiv: new ContainerDiv(),
      foo: 'foo',
      options: {
        backgroundColor: '#ffffff' /* white */,
        isComponentInspectMode: false,
      },
    },
  ];
  const expected = {
    validationErrorMessage: [
      'ERR_X_CHARTS_JS_INVALID_CONSTRUCTOR_ARG:',
      '  argument 0:',
      "  Unknown property 'foo'",
    ].join('\n'),
    valueToUse: null,
  };

  const actual = process(constructorArguments, ContainerDiv);
  t.deepEqual(actual, expected);
  t.end();
});

tp.test('containerDiv is missing', (t) => {
  //For testing purposes
  //$FlowFixMe[incompatible-type]
  const ContainerDiv: Class<HTMLDivElement> = class ContainerDiv {  };
  const constructorArguments: Array<mixed> = [
    {
      options: {
        backgroundColor: '#ffffff' /* white */,
        isComponentInspectMode: false,
      },
    },
  ];
  const expected = {
    validationErrorMessage: [
      'ERR_X_CHARTS_JS_INVALID_CONSTRUCTOR_ARG:',
      '  argument 0 -> containerDiv:',
      '  Property is missing',
    ].join('\n'),
    valueToUse: null,
  };

  const actual = process(constructorArguments, ContainerDiv);
  t.deepEqual(actual, expected);
  t.end();
});

tp.test('containerDiv is not valid', (t) => {
  //For testing purposes
  //$FlowFixMe[incompatible-type]
  const ContainerDiv: Class<HTMLDivElement> = class ContainerDiv {  };
  //For testing purposes
  //$FlowFixMe[incompatible-type]
  const ContainerSpan: Class<HTMLSpanElement> = class ContainerSpan {  };
  const constructorArguments: Array<mixed> = [
    {
      containerDiv: new ContainerSpan(),
      options: {
        backgroundColor: '#ffffff' /* white */,
        isComponentInspectMode: false,
      },
    },
  ];
  const expected = {
    validationErrorMessage: [
      'ERR_X_CHARTS_JS_INVALID_CONSTRUCTOR_ARG:',
      '  argument 0 -> containerDiv:',
      '  Must be an HTMLDivElement',
    ].join('\n'),
    valueToUse: null,
  };

  const actual = process(constructorArguments, ContainerDiv);
  t.deepEqual(actual, expected);
  t.end();
});

//Invalid cases, options
tp.test('options is not valid', (t) => {
  //For testing purposes
  //$FlowFixMe[incompatible-type]
  const ContainerDiv: Class<HTMLDivElement> = class ContainerDiv {  };
  const constructorArguments: Array<mixed> = [
    {
      containerDiv: new ContainerDiv(),
      options: 'foo',
    },
  ];
  const expected = {
    validationErrorMessage: [
      'ERR_X_CHARTS_JS_INVALID_CONSTRUCTOR_ARG:',
      '  argument 0 -> options:',
      '  Must be an object, e.g. {  }, Object.create(null)',
    ].join('\n'),
    valueToUse: null,
  };

  const actual = process(constructorArguments, ContainerDiv);
  t.deepEqual(actual, expected);
  t.end();
});

tp.test('extra property in options', (t) => {
  //For testing purposes
  //$FlowFixMe[incompatible-type]
  const ContainerDiv: Class<HTMLDivElement> = class ContainerDiv {  };
  const constructorArguments: Array<mixed> = [
    {
      containerDiv: new ContainerDiv(),
      options: {
        backgroundColor: '#ffffff' /* white */,
        foo: 'foo',
        isComponentInspectMode: false,
      },
    },
  ];
  const expected = {
    validationErrorMessage: [
      'ERR_X_CHARTS_JS_INVALID_CONSTRUCTOR_ARG:',
      '  argument 0 -> options:',
      "  Unknown property 'foo'",
    ].join('\n'),
    valueToUse: null,
  };

  const actual = process(constructorArguments, ContainerDiv);
  t.deepEqual(actual, expected);
  t.end();
});

tp.test('backgroundColor is not valid', (t) => {
  //For testing purposes
  //$FlowFixMe[incompatible-type]
  const ContainerDiv: Class<HTMLDivElement> = class ContainerDiv {  };
  const constructorArguments: Array<mixed> = [
    {
      containerDiv: new ContainerDiv(),
      options: {
        backgroundColor: '#fffff' /* Invalid */,
        isComponentInspectMode: false,
      },
    },
  ];
  const expected = {
    validationErrorMessage: [
      'ERR_X_CHARTS_JS_INVALID_CONSTRUCTOR_ARG:',
      '  argument 0 -> options -> backgroundColor:',
      '  Value must be a full (6 char long) hex string,',
      'e.g. #ffffff, not #fff',
    ].join('\n'),
    valueToUse: null,
  };

  const actual = process(constructorArguments, ContainerDiv);
  t.deepEqual(actual, expected);
  t.end();
});

tp.test('isComponentInspectMode is not valid', (t) => {
  //For testing purposes
  //$FlowFixMe[incompatible-type]
  const ContainerDiv: Class<HTMLDivElement> = class ContainerDiv {  };
  const constructorArguments: Array<mixed> = [
    {
      containerDiv: new ContainerDiv(),
      options: {
        backgroundColor: '#ffffff' /* white */,
        isComponentInspectMode: 0,
      },
    },
  ];
  const expected = {
    validationErrorMessage: [
      'ERR_X_CHARTS_JS_INVALID_CONSTRUCTOR_ARG:',
      '  argument 0 -> options -> isComponentInspectMode:',
      '  Value must be a boolean',
    ].join('\n'),
    valueToUse: null,
  };

  const actual = process(constructorArguments, ContainerDiv);
  t.deepEqual(actual, expected);
  t.end();
});
