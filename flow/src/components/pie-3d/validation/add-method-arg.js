//@flow strict
import type { ValidationDictionary, ComponentDatum, } from '../../../types.js';
import { isObject, } from '../../../utils/validation.js';
import { validate as validateByDictionary, } from
  '../../../validation/by-dictionary.js';
import { getDictionary as getDictionaryCommon, }
  from '../../../validation/add-method-arg.js';


export function validate(
  dict: ValidationDictionary,
  userProvidedArg: { [string]: mixed, }
): string {
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

  function validateTotalValue(): string {
    const total = userProvidedArg.data
      //After the validateByDictionary() call this is guaranteed to
      //be an array of ComponentDatum
      //$FlowFixMe[incompatible-use]
      .reduce((t: number, d: ComponentDatum) => t + d.value, 0);
    return total > 0 ? '' : [
      'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
      '.add() method argument, component pie-3d -> data:',
      '  total value must be >= 0',
    ].join('\n');
  }
}

export function getDictionary(): ValidationDictionary {
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
          color(val) {
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
      },
    ],
  };
}
