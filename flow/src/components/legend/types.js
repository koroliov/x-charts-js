//@flow strict
import type { XChartsAddMethodArgument, } from '../../types.js';

export type AddMethodArgumentLegend = {
  +type: XChartsAddMethodArgument['type'],
  +zIndex: XChartsAddMethodArgument['zIndex'],
  +htmlFragment: string,
}
