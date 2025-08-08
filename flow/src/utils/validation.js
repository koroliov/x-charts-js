//@flow strict
export function isObject(val: mixed): boolean {
  if (val === undefined || val === null) {
    return false;
  }
  if (Array.isArray(val)) {
    return false;
  }
  return typeof val === 'object';
}
