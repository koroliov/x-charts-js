//@flow strict
import type {
  Schema,
  SchemaObject,
  SchemaArray,
  SchemaFinal,
  CarryObj,
} from './types.js';
import type { PureObject, } from '../types.js';
import { isPureObject, } from '../utils/validation.js';

type StackEntryArray = {
  type: 'array',
  schema: SchemaArray,
  valueToUse: Array<mixed>,
  externalValueCurrent: Array<mixed>,
  i: number,
}

type StackEntryObject = {
  type: 'object',
  schema: SchemaObject,
  valueToUse: { [string]: mixed, },
  propsPresent: Array<string>,
  propsSchema: Array<string>,
  externalValueCurrent: PureObject,
  i: number,
}

export function process(externalValue: mixed, schema: Schema): {
  validationErrorMessage: string,
  valueToUse: mixed,
} {
  const carry = Object.create(null);
  const stack: Array<StackEntryArray | StackEntryObject> = [];
  let schemaCurrent: Schema = schema;
  let valueToUse: mixed = null;
  let i = -1;
  let externalValueCurrent = externalValue;

  try {
    while (true) {
      const lastStackEntry = stack.at(-1);
      if (!lastStackEntry) {
        if (schemaCurrent.type === 'array') {
          handleTopLevelExternalValueArray(schemaCurrent);
          continue;
        }
      } else {
        i = ++lastStackEntry.i;
        if (lastStackEntry.type === 'array') {
          if (handleDeepLevelExternalValueArray(lastStackEntry)) {
            continue;
          }
        } else if (lastStackEntry.type === 'object') {
          if (handleDeepLevelExternalValueObject(lastStackEntry)) {
            continue;
          }
          schemaCurrent =
            lastStackEntry.schema.properties[lastStackEntry.propsSchema[i]];
          if (schemaCurrent.type === 'final') {
            if (handleDeepLevelExternalValueFinalInObject(lastStackEntry,
                schemaCurrent)) {
              continue;
            }
          }
        }
      }
      break;
    }
  } catch(e) {
    return {
      validationErrorMessage: e.message,
      valueToUse: null,
    };
  }
  return {
    validationErrorMessage: '',
    valueToUse,
  };

  function isArray(param: mixed): param is Array<mixed> {
    //Seems to be a Flow bug
    //$FlowFixMe[incompatible-type-guard]
    return Array.isArray(param);
  }

  function handleTopLevelExternalValueArray(schemaCurrentPassed: SchemaArray) {
    const valueToUseArray: Array<mixed> = [];
    if (!isArray(externalValueCurrent)) {
      throw new Error('must be an array');
    }
    if (schemaCurrentPassed.processPre) {
      const rv = schemaCurrentPassed
        .processPre(externalValueCurrent, carry, valueToUseArray);
      if (rv.validationErrorMessage) {
        throw new Error('aaa');
      }
    }
    stack.push({
      type: 'array',
      schema: schemaCurrentPassed,
      valueToUse: valueToUseArray,
      externalValueCurrent,
      i: -1,
    });
    schemaCurrent = schemaCurrentPassed.elements;
    if (0 === externalValueCurrent.length) {
      throw new Error('aaa');
    }
  }

  function handleDeepLevelExternalValueArray(lastStackEntry: StackEntryArray) {
    const extArray: Array<mixed> = lastStackEntry.externalValueCurrent;
    schemaCurrent = lastStackEntry.schema.elements;
    if (i >= extArray.length) {
      lastStackEntry.valueToUse.push(valueToUse);
      valueToUse = lastStackEntry.valueToUse;
      if (lastStackEntry.schema.processPost) {
        valueToUse = lastStackEntry.schema
          .processPost(externalValueCurrent, carry, valueToUse).valueToUse;
      }
      stack.pop();
      return true;
    }
    const extValueEl = extArray[i];
    if (schemaCurrent.type === 'object') {
      const schemaCasted: SchemaObject = schemaCurrent;
      if (!isPureObject(extValueEl)) {
        throw new Error('must be an object');
      }
      const propsPresent = Object.keys(extValueEl);
      const valueToUse = schemaCasted.getStub();
      stack.push({
        type: 'object',
        schema: schemaCasted,
        valueToUse,
        propsPresent,
        propsSchema: Object.keys(schemaCasted.properties),
        externalValueCurrent: extValueEl,
        i: -1,
      });
      return true;
    }
    return false;
  }

  function handleDeepLevelExternalValueObject(
      lastStackEntry: StackEntryObject) {
    const prop = lastStackEntry.propsSchema[i]
    if (i >= lastStackEntry.propsSchema.length) {
      valueToUse = lastStackEntry.valueToUse;
      stack.pop();
      return true;
    }
    if (!Object.hasOwn(lastStackEntry.schema.properties, prop)) {
      if (lastStackEntry.schema.ignoreExtraPropertiesAll) {
        return true;
      }
    }
    return false;
  }

  function handleDeepLevelExternalValueFinalInObject(lastStackEntry:
      StackEntryObject, schemaCurrent: SchemaFinal) {
    const prop = lastStackEntry.propsSchema[i];
    const extObj = lastStackEntry.externalValueCurrent;
    const schemaCasted: SchemaFinal = schemaCurrent;
    //If it's a StackEntryObject then it must be a PureObject and should
    //be allowed here
    //$FlowFixMe[incompatible-type]
    if (!Object.hasOwn(extObj, prop)) {
      if (Object.hasOwn(schemaCasted, 'getDefault')) {
        //if it exists, then it's a function
        //$FlowFixMe[not-a-function]
        const m = schemaCasted.getDefault();
        const valueToUse = lastStackEntry.valueToUse;
        valueToUse[prop] = m;
        return true;
      } else {
        throw new Error('no value');
      }
    }
    const procValue = schemaCasted.process(extObj[prop], carry);
    if (procValue.validationErrorMessage) {
      throw new Error(procValue.validationErrorMessage);
    }
    lastStackEntry.valueToUse[prop] = procValue.valueToUse;
    return true;
  }
}
