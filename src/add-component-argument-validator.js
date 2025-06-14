//@flow strict
import type { AddComponentArgument, } from './types.js';

const validationMapper: {
  [string]: (arg: AddComponentArgument) => string,
} = {
  type(arg: AddComponentArgument) {
    if (typeof arg.type !== 'string' || !arg.type) {
      return [
        'ERR_X_CHARTS_INVALID_COMPONENT_TYPE_ON_ADD:',
        `.type must be a non-empty string`,
        `Provided ${ typeof arg.type } ${ arg.type } in argument`,
        'to the .add() method (JSON stringified):',
        JSON.stringify(arg, null, 2),
      ].join('\n');
    }
    return '';
  },
  zIndex(arg: AddComponentArgument) {
    return '';
  },
};

export const handledPropsSet: Set<$Keys<typeof validationMapper>> =
  new Set(Object.keys(validationMapper));

export function validate(arg: AddComponentArgument): string {
  const msg = validateArgumentIsObject(arg);
  if (msg) {
    return msg;
  }
  for (const p of handledPropsSet) {
    if (arg.hasOwnProperty()) {
    }
    const msg = validationMapper[p](arg);
    if (arg.hasOwnProperty) {
      if (!arg.hasOwnProperty(p)) {
        return handleErrorPropMissing(p);
      }
    } else if (!(p in arg)) {
      return handleErrorPropMissing(p);
    }
  }
  return '';

  function handleErrorPropMissing(p: string) {
    return [
      'ERR_X_CHARTS_MISSING_PROP_IN_ADD_METHOD_ARG:',
      `Property '${ p }' is missing on the provided argument`,
      'to the .add() method (JSON stringified):',
      JSON.stringify(arg, null, 2),
    ].join('\n')
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
      `Must be an instance of Object`,
      `Provided ${ isNull ? 'null' : typeof arg }`,
    ].join('\n');
  }
}
