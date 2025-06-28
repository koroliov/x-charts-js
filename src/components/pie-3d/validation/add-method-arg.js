//@flow strict
import type { ValidationDictionary, ComponentDatum, } from '../../../types.js';
import { isObject, } from '../../../utils/validation.js';

const validationMapper = getValidationDictionary();
const mapperPropsArray = Object.keys(validationMapper);

export function validate(
  propsToCheck: Set<string>,
  userProvidedArg: { [string]: mixed, }
): string {
  let errMsg = '';
  if (errMsg = handleStructureAndPrimitiveValues()) {
    return errMsg;
  } else if (errMsg = validateTotalValue()) {
    return errMsg;
  }
  return errMsg;

  function validateTotalValue(): string {
    const total = userProvidedArg.data
      //After the handleStructureAndPrimitiveValues() call this is guaranteed to
      //be an array of ComponentDatum
      //$FlowFixMe[incompatible-use]
      .reduce((t: number, d: ComponentDatum) => t + d.value, 0);
    return total > 0 ? '' : [
      'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
      'Component pie-3d -> data:',
      '  total value must be >= 0',
    ].join('\n');
  }

  function handleStructureAndPrimitiveValues(): string {
    let propNameForErrMsg = 'pie-3d';
    let userProvidedDataToCheck = userProvidedArg;
    let propsToCheckArray = Array.from(propsToCheck);
    let mapper = validationMapper;
    let mapperPropsSet = new Set(mapperPropsArray);
    let i = 0;
    let isArrayInProcess = false;
    const stack: Array<{
      propNameForErrMsg: string,
      userProvidedDataToCheck: { [string]: mixed, },
      propsToCheckArray: Array<string>,
      mapperPropsSet: Set<string>,
      mapper: ValidationDictionary,
      i: number,
      isArrayInProcess: boolean,
    }> = [];

    for (; i < propsToCheckArray.length; i++) {
      const propOnMapper = isArrayInProcess ? '0' : propsToCheckArray[i];
      const propOnArg = isArrayInProcess ? String(i) : propsToCheckArray[i];
      let errMsg = '';
      if (errMsg = checkUnknownOrUnexpectedProperty(propOnMapper, propOnArg)) {
        return errMsg;
      } else if (errMsg = handleExpectedProperty(propOnMapper, propOnArg)) {
        return errMsg;
      } else if (errMsg = moveUpIfFinishedOnThisLevel()) {
        return errMsg;
      }
    }
    if (mapperPropsSet.size > 0) {
      return getMissingPropErrorMsg();
    }
    return '';

    function moveUpIfFinishedOnThisLevel() {
      if (i === propsToCheckArray.length - 1) {
        do {
          if (mapperPropsSet.size > 0) {
            return getMissingPropErrorMsg();
          }
          if (stack.length) {
            popStack();
          }
          if (i === propsToCheckArray.length - 1 && mapperPropsSet.size > 0) {
            return getMissingPropErrorMsg();
          }
        } while (stack.length && i === propsToCheckArray.length - 1);
      }
      return '';
    }

    function handleExpectedProperty(propOnMapper: string, propOnArg: string) {
      let msg = '';
      if (isObject(mapper[propOnMapper])) {
        msg = enterObjectInMapper();
      } else if (Array.isArray(mapper[propOnMapper])) {
        msg = enterArrayInMapper();
      } else {
        msg = handleFunctionInMapper();
      }
      return msg;

      function enterObjectInMapper() {
        stack.push({
          propNameForErrMsg,
          userProvidedDataToCheck,
          propsToCheckArray,
          mapperPropsSet,
          mapper,
          i,
          isArrayInProcess,
        });
        propNameForErrMsg = propOnArg;
        if (!isObject(userProvidedDataToCheck[propOnMapper])) {
          return getNonObjectErrorMsg();
        }
        isArrayInProcess = false;
        //After the above isObject() call it is guaranteed to be an object
        //$FlowFixMe[incompatible-type]
        userProvidedDataToCheck = userProvidedDataToCheck[propOnArg];
        //It's okay to treat ValidationDictionaryPure as ValidationDictionary here,
        //because ValidationDictionaryPure is a subtype of ValidationDictionary and it's
        //supposed to fit whereever a ValidationDictionary fits.
        //$FlowFixMe[incompatible-type]
        //$FlowFixMe[incompatible-function-indexer]
        mapper = mapper[propOnMapper];
        //After the above isObject() call it is guaranteed to be an object
        //$FlowFixMe[not-an-object]
        //$FlowFixMe[incompatible-type]
        propsToCheckArray = Object.keys(userProvidedDataToCheck);
        mapperPropsSet = new Set(Object.keys(mapper));
        i = -1;
        return '';
      }

      function enterArrayInMapper() {
        stack.push({
          propNameForErrMsg,
          userProvidedDataToCheck,
          propsToCheckArray,
          mapperPropsSet,
          mapper,
          i,
          isArrayInProcess,
        });
        propNameForErrMsg = propOnArg;
        if (!(Array.isArray(userProvidedDataToCheck[propOnArg]) &&
          userProvidedDataToCheck[propOnArg].length)) {
          const nestedPropPath = getPropNestedPath();
          return [
            'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
            `Component ${ nestedPropPath }:`,
            '  must be an non empty array',
          ].join('\n');
        }
        isArrayInProcess = true;
        //After the above Array.isArray() call it is guaranteed to be a non
        //empty array, also it's been decided in this validation logic to treat
        //an array as an object with string, integer properties: '0' etc.
        //$FlowFixMe[incompatible-type]
        userProvidedDataToCheck = userProvidedDataToCheck[propOnArg];
        //It's okay to treat ValidationDictionaryPure as ValidationDictionary here,
        //because ValidationDictionaryPure is a subtype of ValidationDictionary and it's
        //supposed to fit whereever a ValidationDictionary fits.
        //$FlowFixMe[incompatible-type]
        //$FlowFixMe[incompatible-function-indexer]
        mapper = mapper[propOnMapper];
        propsToCheckArray = getPropsToCheckArray();
        mapperPropsSet = new Set(propsToCheckArray);
        i = -1;
        return '';

        function getPropsToCheckArray() {
          const props = [];
          //It's checked above that it's an array
          //$FlowFixMe[invalid-compare]
          for (let i = 0; i < userProvidedDataToCheck.length; i++) {
            props.push(String(i));
          }
          return props;
        }
      }

      function handleFunctionInMapper() {
        //The type ValidationDictionary says that if it's prop is not an Array and
        //not an Object, then it's a function with a particular signature. Flow
        //is not able to detect it yet.
        //$FlowFixMe[prop-missing]
        //$FlowFixMe[not-a-function]
        const msg = mapper[isArrayInProcess ?
          '0' : propOnMapper](userProvidedDataToCheck[propOnArg]);
        if (msg) {
          const nestedPropPath = getPropNestedPath();
          const pathEnding = nestedPropPath.length ?
            ` -> ${ propOnMapper }` : '';
          return [
            'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
            `Component ${ nestedPropPath }${ pathEnding }:`,
            `  ${ msg }`,
          ].join('\n');
        }
        mapperPropsSet.delete(propOnMapper);
        return '';
      }
    }

    function checkUnknownOrUnexpectedProperty(
      propOnMapper: string,
      propOnArg: string) {
      if (isArrayInProcess) {
        if (isNonObjectInArrayError(propOnMapper, propOnArg)) {
          return getNonObjectErrorMsg(propOnArg);
        }
      } else {
        if (!mapperPropsSet.has(propOnArg)) {
          return getUnknownPropertyError(propOnArg);
        }
      }
      return '';
    }

    function popStack() {
      //With the .length check it's guaranteed not to be undefined
      //$FlowFixMe[incompatible-type]
      const popped: (typeof stack)[0] = stack.pop();
      propNameForErrMsg = popped.propNameForErrMsg;
      userProvidedDataToCheck = popped.userProvidedDataToCheck;
      propsToCheckArray = popped.propsToCheckArray;
      mapperPropsSet = popped.mapperPropsSet;
      mapper = popped.mapper;
      i = popped.i;
      isArrayInProcess = popped.isArrayInProcess;
      mapperPropsSet.delete(propsToCheckArray[i]);
    }

    function getMissingPropErrorMsg() {
      const nestedPropPath = getPropNestedPath();
      return [
        'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
        `Component ${ nestedPropPath }:`,
        `  missing properties: ${
          Array.from(mapperPropsSet).join(', ') }`,
      ].join('\n');
    }

    function getUnknownPropertyError(propOnArg: string) {
      const nestedPropPath = getPropNestedPath();
      return [
        'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
        `Component ${ nestedPropPath }:`,
        `  unknown property '${ propOnArg }'`,
      ].join('\n');
    }

    function isNonObjectInArrayError(propOnMapper: string, propOnArg: string) {
      return isObject(mapper[propOnMapper]) &&
        !isObject(userProvidedDataToCheck[propOnArg]);
    }

    function getNonObjectErrorMsg(propOnArg?: string) {
      const nestedPropPath = getPropNestedPath();
      const pathEnding = propOnArg?.length ? ` -> ${ propOnArg }` : '';
      return [
        'ERR_X_CHARTS_INVALID_ADD_METHOD_ARG:',
        `Component ${ nestedPropPath }${ pathEnding}:`,
        '  must be an object',
      ].join('\n');
    }

    function getPropNestedPath() {
      let prevPath = stack.map(i => i.propNameForErrMsg).join(' -> ');
      if (prevPath.length) {
        prevPath += ' -> ';
      }
      return `${ prevPath }${ propNameForErrMsg }`;
    }
  }

}

function getValidationDictionary(): ValidationDictionary {
  return {
    options: {
      thicknessPx(val) {
        return Number.isFinite(val) ? '' : 'value must be a number';
      },
      radiusPx(val) {
        return Number.isFinite(val) ? '' : 'value must be a number';
      },
      centerXPx(val) {
        return Number.isFinite(val) ? '' : 'value must be a number';
      },
      centerYPx(val) {
        return Number.isFinite(val) ? '' : 'value must be a number';
      },
      startAtDeg(val) {
        //The .isFinite() call is supposed to guarantee that it's a number
        //$FlowFixMe[invalid-compare]
        return Number.isFinite(val) && val >= 0 && val < 360 ?
          '' : 'value must be a number in [+0, 360) range';
      },
      rotationAroundCenterXAxisDeg(val) {
        //The .isFinite() call is supposed to guarantee that it's a number
        //$FlowFixMe[invalid-compare]
        return Number.isFinite(val) && val >= 0 && val < 360 ?
          '' : 'value must be a number in [+0, 360) range';
      },
      rotationAroundCenterZAxisDeg(val) {
        //The .isFinite() call is supposed to guarantee that it's a number
        //$FlowFixMe[invalid-compare]
        return Number.isFinite(val) && val >= 0 && val < 360 ?
          '' : 'value must be a number in [+0, 360) range';
      },
    },
    data: [
      {
        value(val) {
          //The .isFinite() call is supposed to guarantee that it's a number
          //$FlowFixMe[invalid-compare]
          return Number.isFinite(val) && val >= 0 ?
            '' : 'value must be a finite number >= 0';
        },
        meta: {
          color(val) {
            const msg = [
              'value must be a full (6 char long) hex string,',
              'e.g. #ffffff, not #fff',
            ].join(' ');
            if (typeof val !== 'string') {
              return msg;
            }
            return /^#[0-9A-F]{6}$/i.test(val) ? '' : msg;
          },
        },
      },
    ],
  };
}
