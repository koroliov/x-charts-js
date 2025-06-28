//@flow strict
import type { AddComponentArgument, ValidationDictionaryPure, }
  from '../types.js';
import { isObject, } from '../utils/validation.js';

export function validate(arg: {
  errorCode: string,
  topLevelPropName: string,
  ignorePropsSet: Set<string>,
  dictionary: ValidationDictionaryPure,
}): string {
  return '';
};
