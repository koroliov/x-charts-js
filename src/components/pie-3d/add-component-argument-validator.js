//@flow strict
import type { AddComponentArgument, } from '../../types.js';
import type { AddComponentPie3dArgument, } from './types.js';

export function validate(propsToCheck: Set<string>, arg: AddComponentArgument):
  string {
  //take props from the mapper
  //take handled props -> set
  //take props from the arg -> set, exclude handled props from set
  //for each prop from mapper:
    //validate
    //remove from arg props set
  //check extra remaining props
  return '';
}
