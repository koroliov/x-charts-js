//      strict
export function isObject(val       )          {
  if (val === undefined || val === null) {
    return false;
  }
  if (Array.isArray(val)) {
    return false;
  }
  return typeof val === 'object';
}

export function validateHexColor(val       )         {
  const msg = [
    'value must be a full (6 char long) hex string,',
    'e.g. #ffffff, not #fff',
  ].join(' ');
  if (typeof val !== 'string') {
    return msg;
  }
  return /^#[0-9A-F]{6}$/i.test(val) ? '' : msg;
}
