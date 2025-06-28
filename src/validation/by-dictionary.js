//@flow strict
import type { AddComponentArgument, ValidationDictionary, } from '../types.js';
import { isObject, } from '../utils/validation.js';

export function validate(arg: {
  errorCode: string,
  topLevelPropName: string,
  ignorePropsSet: Set<string>,
  dictionary: ValidationDictionary,
  value: { [string]: mixed, },
}): string {
  let propNameForErrMsg = arg.topLevelPropName;
  let userProvidedDataToCheck = arg.value;
  const propsToCheckSet = getPropsToCheckSet();
  let propsToCheckArray = Array.from(propsToCheckSet);
  let mapper = arg.dictionary;
  const mapperPropsArray = Object.keys(mapper);
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

  function getPropsToCheckSet() {
    const propsInArg: Set<string> = new Set(Object.keys(arg.value));
    const propsCheckedInCommonValidation = arg.ignorePropsSet;
    propsCheckedInCommonValidation.forEach((p) => propsInArg.delete(p));
    return propsInArg;
  }

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
      //It's okay to treat ValidationDictionaryPure as ValidationDictionary
      //here, because ValidationDictionaryPure is a subtype of
      //ValidationDictionary and it's supposed to fit whereever a
      //ValidationDictionary fits.
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
          `${ arg.errorCode }:`,
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
      //It's okay to treat ValidationDictionaryPure as ValidationDictionary
      //here, because ValidationDictionaryPure is a subtype of
      //ValidationDictionary and it's supposed to fit whereever a
      //ValidationDictionary fits.
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
          `${ arg.errorCode }:`,
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
      `${ arg.errorCode }:`,
      `Component ${ nestedPropPath }:`,
      `  missing properties: ${
        Array.from(mapperPropsSet).join(', ') }`,
    ].join('\n');
  }

  function getUnknownPropertyError(propOnArg: string) {
    const nestedPropPath = getPropNestedPath();
    return [
      `${ arg.errorCode }:`,
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
      `${ arg.errorCode }:`,
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
};
