//@flow strict
import type { AddMethodArgument, } from '../../types.js';

export type AddMethodArgumentLegend = {
  +type: AddMethodArgument['type'],
  +zIndex: AddMethodArgument['zIndex'],
  +htmlFragment: string,
}
