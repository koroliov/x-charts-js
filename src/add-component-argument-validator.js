//@flow strict
import type { AddComponentArgument, } from './types.js';
import { isObject, } from './utils/validation.js';

const validationMapper: {
  [string]: (arg: AddComponentArgument) => string,
} = {
  type(arg: AddComponentArgument) {
    if (typeof arg.type !== 'string' || !arg.type) {
      return [
        'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG_TYPE_VAL:',
        "Property 'type' must be a non-empty string",
        `Provided ${ typeof arg.type  } '${ arg.type }' in argument`,
        'to the .add() method',
      ].join('\n');
    }
    return '';
  },

  zIndex(arg: AddComponentArgument) {
    if (typeof arg.zIndex !== 'string') {
      return generateMessage();
    }
    if (/^-*\d+$/.test(arg.zIndex)) {
      return '';
    }
    return generateMessage();

    function generateMessage() {
      return [
        'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG_ZINDEX_VAL:',
        "Property 'zIndex' must be a numeric integer string",
        'no white space is allowed',
        `Provided ${ typeof arg.zIndex } '${ arg.zIndex }' in argument`,
        'to the .add() method',
      ].join('\n');
    }
  },
};

export function validate(arg: AddComponentArgument): {
  errorMsg: string,
  propsToCheck: Set<string>,
} {
  if (!isObject(arg)) {
    return generateNotObjectArgumentErrorReturnValue();
  }
  const argumentPropsSet: Set<string> = new Set(Object.keys(arg));
  const handledPropsSet = new Set(Object.keys(validationMapper));
  for (const p of argumentPropsSet) {
    if (handledPropsSet.has(p)) {
      const msg = validationMapper[p](arg);
      if (msg) {
        return { errorMsg: msg, propsToCheck: new Set(), };
      }
      argumentPropsSet.delete(p);
      handledPropsSet.delete(p);
    }
  }
  if (handledPropsSet.size) {
    return generateMissingPropsErrorReturnValue(handledPropsSet);
  }
  return { errorMsg: '', propsToCheck: argumentPropsSet, };
};

function generateNotObjectArgumentErrorReturnValue() {
  return {
    errorMsg: [
      'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
      'Argument to the .add() method must be an object',
      'e.g. {  }, Object.create(null)',
    ].join('\n'),
    propsToCheck: new Set() as Set<string>,
  };
}

function generateMissingPropsErrorReturnValue(propNames: Set<string>) {
  return {
    errorMsg: [
      'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG_PROPS_MISSING:',
      `Properties: ${ Array.from(propNames).join(',') }`,
      'are missing on the provided argument to the add method()',
    ].join('\n'),
    propsToCheck: new Set() as Set<string>,
  };
}
