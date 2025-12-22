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
        backgroundColor: '#ffffff' /* white */,
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
