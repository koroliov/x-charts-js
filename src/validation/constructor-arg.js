//@flow strict
import type { AddComponentArgument, ValidationDictionary, } from '../types.js';
import { isObject, } from '../utils/validation.js';
import { validate as validateByDictionary, } from './by-dictionary.js';

export function validate(dict: ValidationDictionary,
  allAddComponentArgs: Array<mixed>): string {
  return '';
};

export function getDictionary(): ValidationDictionary {
  return {
  };
}
