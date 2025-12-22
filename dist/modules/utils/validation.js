//      strict
                                               
export function isPureObject(val       )                            {
  if (val === null || Array.isArray(val) || typeof val !== 'object') {
    return false;
  }
  const proto = Object.getPrototypeOf(val);
  //In this case we explicitly want to check if it's null, which is a normal
  //practice of object instantiation Object.create(null);
  //$FlowFixMe[invalid-compare]
  if (proto === null) {
    //The error message was incomprehensible, about the 'object [1]', probably
    //the argument val having RO key/value signature, but the TypeGuard's
    //is clause having the RW signature
    //$FlowFixMe[incompatible-type-guard]
    return true;
  }
  const objProto = Object.prototype;
  if (proto === objProto) {
    //The error message was incomprehensible, about the 'object [1]', probably
    //the argument val having RO key/value signature, but the TypeGuard's
    //is clause having the RW signature
    //$FlowFixMe[incompatible-type-guard]
    return true;
  }
  return false;
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
