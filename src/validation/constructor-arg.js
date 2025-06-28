//@flow strict
import type { AddComponentArgument, ValidationDictionary, } from '../types.js';
import { isObject, } from '../utils/validation.js';
import { validate as validateByDictionary, } from './by-dictionary.js';

export function validate(dict: ValidationDictionary,
  allAddComponentArgs: Array<mixed>): string {
  if (allAddComponentArgs.length !== 1) {
    return generateWrongNumberOfArgumentsErrorReturnValue();
  }
  if (!isObject(allAddComponentArgs[0])) {
    return generateNotObjectArgumentErrorReturnValue();
  }
  //the above call of isObject() is supposed to guarantee, that it's an object.
  //$FlowFixMe[incompatible-type]
  const arg: { ... } = allAddComponentArgs[0];
  return validateByDictionary({
    errorCode: 'ERR_X_CHARTS_INVALID_CONSTRUCTOR_ARG',
    topLevelPropName: 'new XCharts() argument',
    ignorePropsSet: new Set(),
    dictionary: dict,
    value: arg,
  });
};

export function getDictionary(containerClass: Class<HTMLDivElement>):
  ValidationDictionary {
  return {
    containerDiv(val) {
      return (val instanceof containerClass) ?
        '' : 'value must be an HTMLDivElement';
    },
    options: {
      backgroundColor(val) {
        const msg = [
          'value must be a full (6 char long) hex string,',
          'e.g. #ffffff, not #fff',
        ].join(' ');
        if (typeof val !== 'string') {
          return msg;
        }
        return /^#[0-9A-F]{6}$/i.test(val) ? '' : msg;
      },
    },
  };
}

function generateWrongNumberOfArgumentsErrorReturnValue() {
  return [
    'ERR_X_CHARTS_INVALID_CONSTRUCTOR_ARG:',
    'The new XCharts() constructor expects a single argument',
  ].join('\n');
}

function generateNotObjectArgumentErrorReturnValue() {
  return [
    'ERR_X_CHARTS_INVALID_CONSTRUCTOR_ARG:',
    'Argument to the new XCharts() constructor must be an object',
    'e.g. {  }, Object.create(null)',
  ].join('\n');
}
