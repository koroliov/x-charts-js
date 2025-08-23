//      strict
                                                         
import { isObject, } from '../utils/validation.js';
import { validate as validateByDictionary, } from './by-dictionary.js';

export function validate(dict                      ,
  allConstructorArgs              )         {
  if (allConstructorArgs.length !== 1) {
    return generateWrongNumberOfArgumentsErrorReturnValue();
  }
  if (!isObject(allConstructorArgs[0])) {
    return generateNotObjectArgumentErrorReturnValue();
  }
  //the above call of isObject() is supposed to guarantee, that it's an object.
  //$FlowFixMe[incompatible-type]
  const arg          = allConstructorArgs[0];
  return validateByDictionary({
    errorCode: 'ERR_X_CHARTS_INVALID_CONSTRUCTOR_ARG',
    topLevelPropName: 'new XCharts() argument',
    ignorePropsSet: new Set(),
    dictionary: dict,
    value: arg,
  });
};

export function getDictionary(containerClass                       ) 
                       {
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
      isComponentInspectMode(val) {
        if (typeof val !== 'boolean') {
          return 'value must be boolean';
        }
        return '';
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
