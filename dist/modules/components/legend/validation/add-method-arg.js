//      strict
                                                               
import { validate as validateByDictionary, } from
  '../../../validation/by-dictionary.js';
import { getDictionary as getDictionaryCommon, }
  from '../../../validation/add-method-arg.js';


export function validate(
  dict                      ,
  userProvidedArg                      
)         {
  let errMsg = '';
  if (errMsg = validateByDictionary({
    errorCode: 'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG',
    topLevelPropName: '.add() method argument, component legend',
    ignorePropsSet: new Set(Object.keys(getDictionaryCommon())),
    dictionary: dict,
    value: userProvidedArg,
  })) {
    return errMsg;
  }
  return errMsg;
}

export function getDictionary()                       {
  return {
    htmlFragment(val) {
      return (typeof val !== 'string' || !val) ?
        'value must be a non-empty valid HTML string' : '';
    },
  };
}
