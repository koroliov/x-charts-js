//@flow strict
import type {
  AddComponentArgument, ValidationMapperPure, ValidationMapper,
} from '../../types.js';
import type { AddComponentPie3dArgument, } from './types.js';
import { isObject, } from '../../utils/validation.js';

const validationMapper: ValidationMapper = {
  options: {
    thicknessPx(val) {
      return '';
    },
    radiusPx(val) {
      return '';
    },
    centerXPx(val) {
      return '';
    },
    centerYPx(val) {
      return '';
    },
    startAtDeg(val) {
      return '';
    },
    rotationAroundCenterXAxisDeg(val) {
      return '';
    },
    rotationAroundCenterZAxisDeg(val) {
      return '';
    },
  },
  data: [
    {
      value(val) {
        return '';
      },
      meta: {
        color(val) {
          return '';
        },
      },
    },
  ],
};


export function validate(
  propsToCheck: Set<string>,
  arg: { [string]: mixed, }
): string {
  const validationMapperProps = new Set(Object.keys(validationMapper));
  for (const p of propsToCheck) {
    if (!validationMapperProps.has(p)) {
      return [
        'ERR_X_CHARTS_PIE_3D_INVALID_ADD_METHOD_ARG_UNKNOWN_PROP:',
        `Component pie-3d doesn't support property '${ p }'`,
      ].join('\n');
    }
    if (isObject(validationMapper[p])) {
      validationMapperProps.delete(p);
    } else if (Array.isArray(validationMapper[p])) {
      validationMapperProps.delete(p);
    } else {
      //$FlowFixMe[prop-missing] see commit message
      //$FlowFixMe[not-a-function] see commit message
      const msg = validationMapper[p](arg[p]);
    }
  }
  if (validationMapperProps.size > 0) {
    return [
      'ERR_X_CHARTS_PIE_3D_INVALID_ADD_METHOD_ARG_MISSING_PROP:',
      `Component pie-3d requires properties: '${
        Array.from(validationMapperProps).join(',') }'`,
    ].join('\n');
  }
  //have mapper
  //have set of mapper props
  //for each prop in propsToCheck
  //  if prop not present in mapper props
  //    error extra prop
  //  validate
  //  remove from propsToCheck
  //if propsToCheck remain
  //  error missing prop
  return '';
}
