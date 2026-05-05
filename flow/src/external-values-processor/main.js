//@flow strict
import type { Schema, SchemaObject, SchemaArray, SchemaFinal, CarryObj, }
  from './types.js';
import type { PureObject, } from '../types.js';
import { isPureObject, isReadOnlyArray, } from '../utils/validation.js';

type StackEntryArray = {
  type: 'array',
  schema: SchemaArray,
  valueToUse: Array<mixed>,
  externalValueCurrent: $ReadOnlyArray<mixed>,
  i: number,
}

type StackEntryObject = {
  type: 'object',
  schema: SchemaObject,
  valueToUse: { [string]: mixed, },
  propsSchema: Array<string>,
  externalValueCurrent: PureObject,
  noValueProvided: boolean,
  i: number,
}

export function process(externalValue: mixed, schema: Schema): {
  validationError: null | { path: Array<string>, message: string, },
  valueToUse: mixed,
} {
  let valueToUse: mixed = null;
  const stack: Array<StackEntryArray | StackEntryObject> = [];

  try {
    iterateInWhile();
  } catch(e) {
    return {
      validationError: { path: generateErrorValuePath(), message: e.message, },
      valueToUse: null,
    };
  }
  return { validationError: null, valueToUse, };

  function iterateInWhile() {
    const carry = Object.create(null);
    let schemaCurrent: Schema = schema;
    let i = -1;
    let externalValueCurrent = externalValue;

    while (true) {
      const lastStackEntry = stack.at(-1);
      if (!lastStackEntry) {
        switch (schemaCurrent.type) {
          case 'array':
            handleTopLevelExternalValueArray(schemaCurrent);
            continue;
          case 'object':
            handleExpectedObjectCase(schemaCurrent, externalValue);
            continue;
        }
      } else if (handleDeepLevelValue(lastStackEntry)) {
        continue;
      }
      break;
    }

    function handleExpectedObjectCase(schemaObj: SchemaObject,
        extValueEl: mixed) {
      const valueToUse = schemaObj.getStub();
      if (Object.hasOwn(schemaObj, 'processPre') &&
          typeof schemaObj.processPre === 'function') {
        const rv = schemaObj.processPre(extValueEl, carry, valueToUse);
        throwIfValidationError(rv);
      }
      if (!isPureObject(extValueEl)) {
        throw new Error('must be an object');
      }
      const propsSchema = Object.keys(schemaObj.properties);
      if (!schemaObj.ignoreExtraPropertiesAll) {
        const extraPropsToIgnore = schemaObj.ignoreExtraPropertiesSet;
        const propsPresent = Object.keys(extValueEl);
        checkExtraProps(propsSchema, propsPresent, extraPropsToIgnore);
      }
      stack.push({
        type: 'object',
        schema: schemaObj,
        valueToUse,
        propsSchema,
        externalValueCurrent: extValueEl,
        noValueProvided: false,
        i: -1,
      });
      return true;
    }

    function handleDeepLevelValue(lastStackEntry: typeof stack[0]) {
      i = ++lastStackEntry.i;
      if (lastStackEntry.type === 'array') {
        if (handleDeepLevelExternalValueArray(lastStackEntry)) {
          return true;
        }
      } else if (lastStackEntry.type === 'object') {
        if (handleDeepLevelExternalValueObject(lastStackEntry)) {
          return true;
        }
        schemaCurrent =
          lastStackEntry.schema.properties[lastStackEntry.propsSchema[i]];
        if (schemaCurrent.type === 'final') {
          if (handleDeepLevelExternalValueFinalInObject(lastStackEntry,
              schemaCurrent)) {
            return true;
          }
        }
      }
      return false;

      function handleDeepLevelExternalValueFinalInObject(lastStackEntry:
          StackEntryObject, schemaCurrent: SchemaFinal) {
        const prop = lastStackEntry.propsSchema[i];
        const extObj = lastStackEntry.externalValueCurrent;
        //extObj is guaranteed to be a PureObject by StackEntryObject.
        //$FlowFixMe[incompatible-type]
        if (!Object.hasOwn(extObj, prop) ||
            lastStackEntry.noValueProvided) {
          if (Object.hasOwn(schemaCurrent, 'getDefault') &&
              typeof schemaCurrent.getDefault === 'function') {
            const valueToUse = lastStackEntry.valueToUse;
            valueToUse[prop] = schemaCurrent.getDefault();
            return true;
          } else {
            throw new Error('Property is missing');
          }
        }
        const procValue = schemaCurrent.process(extObj[prop], carry);
        throwIfValidationError(procValue);
        lastStackEntry.valueToUse[prop] = procValue.valueToUse;
        return true;
      }

      function handleDeepLevelExternalValueArray(lastStackEntry:
          StackEntryArray) {
        const extArray = lastStackEntry.externalValueCurrent;
        if (i >= extArray.length) {
          return handleAllElementsProcessedInProvidedArray();
        }
        const extValueEl = extArray[i];
        const schemaOfArrayElement = lastStackEntry.schema.elements;
        if (schemaOfArrayElement.type === 'object') {
          return handleExpectedObjectCase(schemaOfArrayElement, extValueEl);
        }
        return false;

        function handleAllElementsProcessedInProvidedArray() {
          lastStackEntry.valueToUse.push(valueToUse);
          valueToUse = lastStackEntry.valueToUse;
          if (Object.hasOwn(lastStackEntry.schema, 'processPost') &&
              typeof lastStackEntry.schema.processPost === 'function') {
            valueToUse = lastStackEntry.schema.processPost(externalValueCurrent,
                carry, lastStackEntry.valueToUse).valueToUse;
          }
          stack.pop();
          return true;
        }
      }

      function handleDeepLevelExternalValueObject(
          lastStackEntry: StackEntryObject) {
        if (i >= lastStackEntry.propsSchema.length) {
          return moveLevelUp();
        }
        const prop = lastStackEntry.propsSchema[i];
        if (lastStackEntry.schema.properties[prop].type === 'object') {
          return moveLevelDownToProcessObject(
              lastStackEntry.schema.properties[prop]);
        }
        if (lastStackEntry.schema.properties[prop].type === 'final') {
          schemaCurrent =
            lastStackEntry.schema.properties[prop];
          if (handleDeepLevelExternalValueFinalInObject(lastStackEntry,
              schemaCurrent)) {
            return true;
          }
        }
        return false;

        function moveLevelDownToProcessObject(schema: SchemaObject) {
          const valueToUseInner = schema.getStub();
          valueToUse = valueToUseInner;
          lastStackEntry.valueToUse[prop] = valueToUseInner;
          const propsSchema = Object.keys(schema.properties);
          if (!isPureObject(lastStackEntry.externalValueCurrent[prop])) {
            return handleNotAnObjectProvidedCase();
          }
          return handleObjectProvidedCase(
              lastStackEntry.externalValueCurrent[prop]);

          function handleNotAnObjectProvidedCase() {
            //lastStackEntry.externalValueCurrent is an PureObject, b/c
            //lastStackEntry is StackEntryObject
            //$FlowFixMe[incompatible-type]
            if (!Object.hasOwn(lastStackEntry.externalValueCurrent, prop)) {
              return pushStack(valueToUseInner, true);
            }
            throw new Error(
                'Must be an object, e.g. {  }, Object.create(null)');
          }

          function handleObjectProvidedCase(extValueEl: PureObject) {
            const propsPresent = Object.keys(extValueEl);
            if (!lastStackEntry.schema.ignoreExtraPropertiesAll) {
              const extraPropsToIgnore =
                  lastStackEntry.schema.ignoreExtraPropertiesSet;
              checkExtraProps(propsSchema, propsPresent, extraPropsToIgnore);
            }
            return pushStack(extValueEl, false);
          }

          function pushStack(externalValueCurrent: PureObject,
              noValueProvided: boolean) {
            stack.push({
              type: 'object',
              schema,
              valueToUse: valueToUseInner,
              propsSchema,
              externalValueCurrent,
              noValueProvided,
              i: -1,
            });
            return true;
          }
        }

        function moveLevelUp() {
          valueToUse = lastStackEntry.valueToUse;
          stack.pop();
          return true;
        }
      }
    }

    function checkExtraProps(propsSchema: Array<string>,
        propsPresent: Array<string>, propsToIgnore: Set<string>) {
      const setSchema = new Set(propsSchema);
      propsPresent.forEach(p => {
        if (!setSchema.has(p) && !propsToIgnore.has(p)) {
          throw new Error(`Unknown property '${ p }'`);
        }
      });
    }

    function handleTopLevelExternalValueArray(schemaCurrentPassed:
        SchemaArray) {
      const valueToUseArray: Array<mixed> = [];
      if (!isReadOnlyArray(externalValueCurrent)) {
        throw new Error('must be an array');
      }
      if (schemaCurrentPassed.processPre) {
        const rv = schemaCurrentPassed
          .processPre(externalValueCurrent, carry, valueToUseArray);
        throwIfValidationError(rv);
      }
      stack.push({
        type: 'array',
        schema: schemaCurrentPassed,
        valueToUse: valueToUseArray,
        externalValueCurrent,
        i: -1,
      });
      schemaCurrent = schemaCurrentPassed.elements;
    }
  }

  function generateErrorValuePath() {
    return stack.reduce((a: Array<string>, el) => {
      if (el.type === 'array') {
        return a.push(String(el.i)), a;
      } else if (el.type === 'object') {
        return a.push(el.propsSchema[el.i]), a;
      }
      return a;
    }, []);
  }

  function throwIfValidationError(processed: {
    +validationErrorMessage: string,
    ...
  }) {
    if (processed.validationErrorMessage) {
      throw new Error(processed.validationErrorMessage);
    }
  }
}
