//@flow strict
import type { AddComponentArgument, } from '../../types.js';
import type { AddComponentPie3dArgument, } from './types.js';
import {
  handledPropsSet as topLevelHandledPropsSet,
} from '../../add-component-argument-validator.js';

export function validate(arg: AddComponentArgument):
  string {
  const a: AddComponentPie3dArgument =
    //$FlowFixMe[incompatible-cast] See commit message
    //$FlowFixMe[incompatible-variance] See commit message
    //$FlowFixMe[incompatible-indexer] See commit message
    (arg: AddComponentPie3dArgument);
  //take props from the mapper
  //take handled props -> set
  //take props from the arg -> set, exclude handled props from set
  //for each prop from mapper:
    //validate
    //remove from arg props set
  //check extra remaining props
  return '';
}
