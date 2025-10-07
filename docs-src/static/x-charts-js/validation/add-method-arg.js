//      strict
                                                         
import { isObject, } from '../utils/validation.js';
import { validate as validateByDictionary, } from './by-dictionary.js';

export function validate(dict                      ,
  allAddMethodArgs              )         {
  if (allAddMethodArgs.length !== 1) {
    return generateWrongNumberOfArgumentsErrorReturnValue();
  }
  if (!isObject(allAddMethodArgs[0])) {
    return generateNotObjectArgumentErrorReturnValue();
  }
  //the above call of isObject() is supposed to guarantee, that it's an object.
  //$FlowFixMe[incompatible-type]
  const arg          = allAddMethodArgs[0];
  return validateByDictionary({
    errorCode: 'ERR_XCHARTSJS_INVALID_ADD_METHOD_ARG',
    topLevelPropName: '.add() method argument',
    ignorePropsSet: getIgnorePropsSet(),
    dictionary: dict,
    value: arg,
  });

  function getIgnorePropsSet() {
    const setOnArg              = new Set(Object.keys(arg));
    const setOnDict = new Set(Object.keys(dict));
    setOnDict.forEach((p) => setOnArg.delete(p));
    return setOnArg;
  }
};

function generateWrongNumberOfArgumentsErrorReturnValue() {
  return [
    'ERR_XCHARTSJS_INVALID_ADD_METHOD_ARG:',
    'The .add() method expects a single argument',
  ].join('\n');
}

function generateNotObjectArgumentErrorReturnValue() {
  return [
    'ERR_XCHARTSJS_INVALID_ADD_METHOD_ARG:',
    'Argument to the .add() method must be an object',
    'e.g. {  }, Object.create(null)',
  ].join('\n');
}

export function getDictionary()                       {
  return {
    type(val) {
      return (typeof val !== 'string' || !val) ?
        'value must be a non-empty string' : '';
    },

    zIndex(val) {
      const errMsg =
        'value must be a numeric integer string with no white spaces';
      if (typeof val !== 'string') {
        return errMsg;
      }
      return /^-*\d+$/.test(val) ? '' : errMsg;
    },
  };
}
