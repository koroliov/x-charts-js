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

const validationMapperPropsArray = Object.keys(validationMapper);

export function validate(
  propsToCheck: Set<string>,
  arg: { [string]: mixed, }
): string {
  const validationMapperProps = new Set(validationMapperPropsArray);

  let topPropName = 'pie-3d';
  let propsToCheckArray = Array.from(propsToCheck);
  let argDataToCheck = arg;
  let mapper = validationMapper;
  let mapperPropsToCheckSet = new Set(validationMapperPropsArray);
  let i = 0;
  const stack: Array<{
    topPropName: string,
    argDataToCheck: { [string]: mixed, },
    propsToCheckArray: Array<string>,
    mapperPropsToCheckSet: Set<string>,
    mapper: ValidationMapper,
    i: number,
  }> = [];

  for (; i < propsToCheckArray.length; i++) {
    const p = propsToCheckArray[i];
    if (!mapperPropsToCheckSet.has(p)) {
      const nestedPropPath = getPropNestedPath();
      return [
        'ERR_X_CHARTS_PIE_3D_INVALID_ADD_METHOD_ARG_UNKNOWN_PROP:',
        `Component ${ nestedPropPath }:`,
        `  unknown property '${ p }'`,
      ].join('\n');
    }
    if (isObject(mapper[p])) {
      stack.push({
        topPropName,
        argDataToCheck,
        propsToCheckArray,
        mapperPropsToCheckSet,
        mapper,
        i,
      });
      topPropName = p;
      if (!isObject(argDataToCheck[p])) {
        return [
          'FOO:',
        ].join('\n');
      }
      //After the above isObject() call it is guaranteed to be an object
      //$FlowFixMe[incompatible-type]
      argDataToCheck = argDataToCheck[p];
      //propsToCheckArray = Object.keys(propsToCheckArray[p]);
      //It's okay to treat ValidationMapperPure as ValidationMapper here,
      //because ValidationMapperPure is a subtype of ValidationMapper and it's
      //supposed to fit whereever a ValidationMapper fits.
      //$FlowFixMe[incompatible-type]
      //$FlowFixMe[incompatible-function-indexer]
      mapper = mapper[p];
      //After the above isObject() call it is guaranteed to be an object
      //$FlowFixMe[not-an-object]
      //$FlowFixMe[incompatible-type]
      propsToCheckArray = Object.keys(argDataToCheck);
      //The above call of isObject(mapper[p]) guaranteed that it's an object,
      //not a tuple [ ValidationMapper ]
      //$FlowFixMe[not-an-object]
      mapperPropsToCheckSet = new Set(Object.keys(mapper));
      i = -1;
      continue;
    } else if (Array.isArray(mapper[p])) {
      mapperPropsToCheckSet.delete(p);
    } else {
      //The type ValidationMapper says that if it's prop is not an Array and not
      //and Object, then it's a function with a particular signature. Flow is
      //not able to detect it yet.
      //$FlowFixMe[prop-missing]
      //$FlowFixMe[not-a-function]
      const msg = mapper[p](arg[p]);
      if (msg) {
        return msg;
      }
      mapperPropsToCheckSet.delete(p);
    }
    if (i === propsToCheckArray.length - 1) {
      if (mapperPropsToCheckSet.size > 0) {
        const nestedPropPath = getPropNestedPath();
        return [
          'ERR_X_CHARTS_PIE_3D_INVALID_ADD_METHOD_ARG_MISSING_PROP:',
          `Component ${ nestedPropPath }:`,
          `  missing properties: '${
            Array.from(mapperPropsToCheckSet).join(', ') }'`,
        ].join('\n');
      }
      if (stack.length) {
        //With the above .length check it's guaranteed not to be undefined
        //$FlowFixMe[incompatible-type]
        const popped: (typeof stack)[0] = stack.pop();
        topPropName = popped.topPropName;
        argDataToCheck = popped.argDataToCheck;
        propsToCheckArray = popped.propsToCheckArray;
        mapperPropsToCheckSet = popped.mapperPropsToCheckSet;
        mapper = popped.mapper;
        i = popped.i;
        mapperPropsToCheckSet.delete(propsToCheckArray[i]);
      }
      if (i === propsToCheckArray.length - 1 &&
        mapperPropsToCheckSet.size > 0) {
        const nestedPropPath = getPropNestedPath();
        return [
          'ERR_X_CHARTS_PIE_3D_INVALID_ADD_METHOD_ARG_MISSING_PROP:',
          `Component ${ nestedPropPath }:`,
          `  missing properties: '${
            Array.from(mapperPropsToCheckSet).join(', ') }'`,
        ].join('\n');
      }
    }
  }
  //have props to check array
  //mapper
  //index
  //stack
  //
  //=================
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

  function getPropNestedPath() {
    let prevPath = stack.map(i => i.topPropName).join(' -> ');
    if (prevPath.length) {
      prevPath += ' -> ';
    }
    return `${ prevPath }${ topPropName }`;
  }
}
