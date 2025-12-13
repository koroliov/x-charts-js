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
