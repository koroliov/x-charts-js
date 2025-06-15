//@flow strict
import type { AddComponentArgument, } from './types.js';

const validationMapper: {
  [string]: (arg: AddComponentArgument) => string,
} = {
  type(arg: AddComponentArgument) {
    if (typeof arg.type !== 'string' || !arg.type) {
      return [
        'ERR_X_CHARTS_INVALID_COMPONENT_TYPE_ON_ADD:',
        "Property 'type' must be a non-empty string",
        `Provided ${ typeof arg.type  } '${ arg.type }' in argument`,
        'to the .add() method (JSON stringified):',
        JSON.stringify(arg, null, 2),
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
        'ERR_X_CHARTS_INVALID_ZINDEX_ON_ADD:',
        "Property 'zIndex' must be a numeric integer string",
        'no white space is allowed',
        `Provided ${ typeof arg.zIndex } '${ arg.zIndex }' in argument`,
        'to the .add() method (JSON stringified):',
      ].join('\n');
    }
  },
};

export const handledPropsSet: Set<$Keys<typeof validationMapper>> =
  new Set(Object.keys(validationMapper));

export function validate(arg: AddComponentArgument): string {
  const msg = validateArgumentIsObject(arg);
  if (msg) {
    return msg;
  }
  const argumentProto = Object.getPrototypeOf(arg);
  const checkPropertyIsPresentOnArgument =
    getCheckPropertyIsPresentOnArgument();
  for (const p of handledPropsSet) {
    let msg = checkPropertyIsPresentOnArgument(p);
    if (msg) {
      return msg;
    }
    msg = validationMapper[p](arg);
    if (msg) {
      return msg;
    }
  }
  return '';

  function getCheckPropertyIsPresentOnArgument() {
    return argumentProto !== null ? checkWithHasOwnProp : checkWithIn;

    function checkWithHasOwnProp(propName: string): string {
      return arg.hasOwnProperty(propName) ?
        '' : handleErrorPropMissing(propName);
    }

    function checkWithIn(propName: string): string {
      return (propName in arg) ? '' : handleErrorPropMissing(propName);
    }

    function handleErrorPropMissing(propName: string) {
      return [
        'ERR_X_CHARTS_MISSING_PROP_IN_ADD_METHOD_ARG:',
        `Property '${ propName }' is missing on the provided argument`,
        'to the .add() method (JSON stringified):',
        JSON.stringify(arg, null, 2),
      ].join('\n')
    }
  }
};

function validateArgumentIsObject(arg: AddComponentArgument) {
  if (arg === undefined) {
    return generateMessage(false);
  }
  if (arg === null) {
    return generateMessage(true);
  }
  const p = Object.getPrototypeOf(arg);
  if (p !== null && p !== Object.getPrototypeOf({})) {
    return generateMessage(false);
  }
  return '';

  function generateMessage(isNull: boolean) {
    return [
      'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
      'Argument to the .add() method must be an object litteral {}, or',
      'created with Object.create(null)',
    ].join('\n');
  }
}
