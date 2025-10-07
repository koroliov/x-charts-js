//      strict
                                                               
                                              
import { isObject, validateHexColor, } from '../../../utils/validation.js';
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
    topLevelPropName: '.add() method argument, component pie-3d',
    ignorePropsSet: new Set(Object.keys(getDictionaryCommon())),
    dictionary: dict,
    value: userProvidedArg,
  })) {
    return errMsg;
  } else if (errMsg = validateTotalValue()) {
    return errMsg;
  }
  return errMsg;

  function validateTotalValue()         {
    const total = userProvidedArg.data
      //After the validateByDictionary() call this is guaranteed to
      //be an array of DataEntry
      //$FlowFixMe[incompatible-use]
      .reduce((t        , d           ) => t + d.value, 0);
    return total > 0 ? '' : [
      'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
      '.add() method argument, component pie-3d -> data:',
      '  total value must be >= 0',
    ].join('\n');
  }
}

export function getDictionary()                       {
  return {
    options: {
      thicknessPx(val) {
        return Number.isFinite(val) ? '' : 'value must be a number';
      },
      radiusPx(val) {
        return Number.isFinite(val) ? '' : 'value must be a number';
      },
      centerXPx(val) {
        return Number.isFinite(val) ? '' : 'value must be a number';
      },
      centerYPx(val) {
        return Number.isFinite(val) ? '' : 'value must be a number';
      },
      startAtDeg(val) {
        //The .isFinite() call is supposed to guarantee that it's a number
        //$FlowFixMe[invalid-compare]
        return Number.isFinite(val) && val >= 0 && val < 360 ?
          '' : 'value must be a number in [+0, 360) range';
      },
      rotationAroundCenterXAxisDeg(val) {
        //The .isFinite() call is supposed to guarantee that it's a number
        //$FlowFixMe[invalid-compare]
        return Number.isFinite(val) && val >= 0 && val < 360 ?
          '' : 'value must be a number in [+0, 360) range';
      },
      rotationAroundCenterZAxisDeg(val) {
        //The .isFinite() call is supposed to guarantee that it's a number
        //$FlowFixMe[invalid-compare]
        return Number.isFinite(val) && val >= 0 && val < 360 ?
          '' : 'value must be a number in [+0, 360) range';
      },
    },
    data: [
      {
        value(val) {
          //The .isFinite() call is supposed to guarantee that it's a number
          //$FlowFixMe[invalid-compare]
          return Number.isFinite(val) && val >= 0 ?
            '' : 'value must be a finite number >= 0';
        },
        meta: {
          faceColor: validateHexColor,
          rimColor: validateHexColor,
        },
      },
    ],
  };
}
