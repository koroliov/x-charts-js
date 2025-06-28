//@flow strict
import type {
  AddComponentArgument,
  ValidationDictionary,
  ValidationDictionaryPure,
} from '../types.js';
import { isObject, } from '../utils/validation.js';

const validationMapper: ValidationDictionaryPure = {
  type(val) {
    if (typeof val !== 'string' || !val) {
      return [
        'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
        "Property 'type' must be a non-empty string",
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
        'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
        "Property 'zIndex' must be a numeric integer string",
        'no white space is allowed',
      ].join('\n');
    }
  },
};

export function validate(allAddComponentArgs: Array<mixed>): {
  errorMsg: string,
  propsToCheck: Set<string>,
} {
  if (allAddComponentArgs.length !== 1) {
    return generateWrongNumberOfArgumentsErrorReturnValue();
  }
  if (!isObject(allAddComponentArgs[0])) {
    return generateNotObjectArgumentErrorReturnValue();
  }
  //the above call of isObject() is supposed to guarantee, that it's an object.
  //$FlowFixMe[incompatible-type]
  const arg: { ... } = allAddComponentArgs[0];
  const argumentPropsSet: Set<$Keys<typeof arg>> = new Set(Object.keys(arg));
  const handledPropsSet = new Set(Object.keys(validationMapper));
  for (const p of argumentPropsSet) {
    if (handledPropsSet.has(p)) {
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
  return {
    errorMsg: '',
    //This value was taken from the above Object.keys() call, so it definitely
    //should qualify for the Set<string> type. And we use it, instead of
    //Set<Keys<typeof arg>>, b/c the latter would force us to do some insane
    //type checks/casts later.
    //$FlowFixMe[prop-missing]
    propsToCheck: argumentPropsSet as Set<string>,
  };
};

function generateWrongNumberOfArgumentsErrorReturnValue() {
  return {
    errorMsg: [
      'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG_WRONG_NUMBER_OF_ARGS:',
      'The .add() method expects a single argument',
    ].join('\n'),
    propsToCheck: new Set() as Set<string>,
  };
}

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

export function getDictionary(): ValidationDictionary {
  return {
    type(val) {
      if (typeof val !== 'string' || !val) {
        return [
          'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
          "Property 'type' must be a non-empty string",
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
          'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
          "Property 'zIndex' must be a numeric integer string",
          'no white space is allowed',
        ].join('\n');
      }
    },
  };
}
