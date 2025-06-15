//@flow strict
import type { AddComponentArgument, } from '../../types.js';
import type { AddComponentPie3dArgument, } from './types.js';

export function validateAddComponentArgumentExternal(arg: AddComponentArgument):
  string {
  const a: AddComponentPie3dArgument =
    //$FlowFixMe[incompatible-cast] See commit message
    //$FlowFixMe[incompatible-variance] See commit message
    //$FlowFixMe[incompatible-indexer] See commit message
    (arg: AddComponentPie3dArgument);
  return '';
}
