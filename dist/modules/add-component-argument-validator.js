//      strict
                                                        

const validationMapper   
                                                  
  = {
  type(arg                      ) {
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
  zIndex(arg                      ) {
    return '';
  },
};

export const handledPropsSet                                      =
  new Set(Object.keys(validationMapper));

export function validate(arg                      )         {
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

  function handleErrorPropMissing(p        ) {
    return [
      'ERR_X_CHARTS_MISSING_PROP_IN_ADD_METHOD_ARG:',
      `Property '${ p }' is missing on the provided argument`,
      'to the .add() method (JSON stringified):',
      JSON.stringify(arg, null, 2),
    ].join('\n')
  }
};

function validateArgumentIsObject(arg                      ) {
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

  function generateMessage(isNull         ) {
    return [
      'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
      `Must be an instance of Object`,
      `Provided ${ isNull ? 'null' : typeof arg }`,
    ].join('\n');
  }
}
