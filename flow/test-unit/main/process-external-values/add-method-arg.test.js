//@flow strict
//$FlowFixMe[cannot-resolve-module]
import tp from 'tape';
import { process, } from
  '../../../src/main/process-external-values/add-method-arg.js';

tp.test('valid argument case', (t) => {
  const addMethodArguments: Array<mixed> = [
    {
      type: 'any',
      zIndex: '2',
      anyOtherProp: 'any',
    },
  ];
  const expected = {
    validationErrorMessage: '',
    valueToUse: {
      type: 'any',
      zIndex: '2',
    },
  };

  const actual = process(addMethodArguments);
  t.deepEqual(actual, expected);
  t.end();
});

tp.test('zIndex default value', (t) => {
  const addMethodArguments: Array<mixed> = [
    {
      type: 'any',
      anyOtherProp: 'any',
    },
  ];
  const expected = {
    validationErrorMessage: '',
    valueToUse: {
      type: 'any',
      zIndex: '1',
    },
  };

  const actual = process(addMethodArguments);
  t.deepEqual(actual, expected);
  t.end();
});
