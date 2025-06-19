//      strict
                                                                              
import { isObject, } from './utils/validation.js';

const validationMapper                       = {
  type(val) {
    if (typeof val !== 'string' || !val) {
      return [
        'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG_TYPE_VAL:',
        "Property 'type' must be a non-empty string",
        `Provided ${ typeof val  } '${ String(val) }' in argument`,
        'to the .add() method',
      ].join('\n');
    }
    return '';
  },

  zIndex(val) {
    if (typeof val !== 'string') {
      return generateMessage();
    }
    if (/^-*\d+$/.test(val)) {
      return '';
    }
    return generateMessage();

    function generateMessage() {
      return [
        'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG_ZINDEX_VAL:',
        "Property 'zIndex' must be a numeric integer string",
        'no white space is allowed',
        `Provided ${ typeof val } '${ String(val) }' in argument`,
        'to the .add() method',
      ].join('\n');
    }
  },
};

export function validate(arg                      )   
                   
                            
  {
  if (!isObject(arg)) {
    return generateNotObjectArgumentErrorReturnValue();
  }
  const argumentPropsSet              = new Set(Object.keys(arg));
  const handledPropsSet = new Set(Object.keys(validationMapper));
  for (const p of argumentPropsSet) {
    if (handledPropsSet.has(p)) {
      //$FlowFixMe[invalid-computed-prop] see commit message
      const msg = validationMapper[p](arg[p]);
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
    propsToCheck: new Set()               ,
  };
}

function generateMissingPropsErrorReturnValue(propNames             ) {
  return {
    errorMsg: [
      'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG_PROPS_MISSING:',
      `Properties: ${ Array.from(propNames).join(',') }`,
      'are missing on the provided argument to the add method()',
    ].join('\n'),
    propsToCheck: new Set()               ,
  };
}
