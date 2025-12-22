//@flow strict
import type { Schema, SchemaObject, SchemaArray, SchemaFinal, CarryObj, }
  from './types.js';
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
  noValueProvided: boolean,
  i: number,
}

export function process(externalValue: mixed, schema: Schema): {
  validationError: null | {
    path: Array<string>,
    message: string,
  },
  valueToUse: mixed,
} {
  let valueToUse: mixed = null;
  const stack: Array<StackEntryArray | StackEntryObject> = [];

  try {
    iterateInWhile();
  } catch(e) {
    return {
      validationError: {
        path: generateErrorValuePath(),
        message: e.message,
      },
      valueToUse: null,
    };
  }
  return {
    validationError: null,
    valueToUse,
  };

  function iterateInWhile() {
    const carry = Object.create(null);
    let schemaCurrent: Schema = schema;
    let i = -1;
    let externalValueCurrent = externalValue;

    while (true) {
      const lastStackEntry = stack.at(-1);
      if (!lastStackEntry) {
        if (schemaCurrent.type === 'array') {
          handleTopLevelExternalValueArray(schemaCurrent);
          continue;
        }
      } else if (handleDeepLevelValue(lastStackEntry)) {
        continue;
      }
      break;
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
        const schemaCasted: SchemaFinal = schemaCurrent;
        //If it's a StackEntryObject then it must be a PureObject and should be
        //allowed here
        //$FlowFixMe[incompatible-type]
        if (!Object.hasOwn(extObj, prop) || lastStackEntry.noValueProvided) {
          if (Object.hasOwn(schemaCasted, 'getDefault')) {
            //if it exists, then it's a function
            //$FlowFixMe[not-a-function]
            const m = schemaCasted.getDefault();
            const valueToUse = lastStackEntry.valueToUse;
            valueToUse[prop] = m;
            return true;
          } else {
            throw new Error('Property is missing');
          }
        }
        const procValue = schemaCasted.process(extObj[prop], carry);
        if (procValue.validationErrorMessage) {
          throw new Error(procValue.validationErrorMessage);
        }
        lastStackEntry.valueToUse[prop] = procValue.valueToUse;
        return true;
      }

      function handleDeepLevelExternalValueArray(lastStackEntry:
          StackEntryArray) {
        const extArray: Array<mixed> = lastStackEntry.externalValueCurrent;
        const schemaOfArrayElement = lastStackEntry.schema.elements;
        if (i >= extArray.length) {
          return handleAllElementsProcessedInProvidedArray();
        }
        const extValueEl = extArray[i];
        if (schemaOfArrayElement.type === 'object') {
          return handleArrayEntryIsObject();
        }
        return false;

        function handleAllElementsProcessedInProvidedArray() {
          lastStackEntry.valueToUse.push(valueToUse);
          valueToUse = lastStackEntry.valueToUse;
          if (lastStackEntry.schema.processPost) {
            valueToUse = lastStackEntry.schema
              .processPost(externalValueCurrent, carry, valueToUse).valueToUse;
          }
          stack.pop();
          return true;
        }

        function handleArrayEntryIsObject() {
          //This function is supposed to be called only if schemaOfArrayElement
          //is SchemaObject
          //$FlowFixMe[incompatible-type]
          const schemaCasted: SchemaObject = schemaOfArrayElement;
          const valueToUse = schemaCasted.getStub();
          if (Object.hasOwn(schemaCasted, 'processPre')) {
            //If it's a SchemaObject and it has own property processPre, then it
            //must be a function, don't want to use the typeof operator
            //$FlowFixMe[not-a-function]
            const rv = schemaCasted.processPre(extValueEl, carry, valueToUse);
            if (rv.validationErrorMessage) {
              throw new Error(rv.validationErrorMessage);
            }
          }
          if (!isPureObject(extValueEl)) {
            throw new Error('must be an object');
          }
          const propsPresent = Object.keys(extValueEl);
          const propsSchema = Object.keys(schemaCasted.properties);
          if (!schemaCasted.ignoreExtraPropertiesAll) {
            checkProps(propsSchema, propsPresent);
          }
          stack.push({
            type: 'object',
            schema: schemaCasted,
            valueToUse,
            propsPresent,
            propsSchema,
            externalValueCurrent: extValueEl,
            noValueProvided: false,
            i: -1,
          });
          return true;
        }
      }

      function handleDeepLevelExternalValueObject(
          lastStackEntry: StackEntryObject) {
        if (i >= lastStackEntry.propsSchema.length) {
          const prop = lastStackEntry.propsSchema[lastStackEntry.i - 1];
          valueToUse = lastStackEntry.valueToUse;
          stack.pop();
          return true;
        }
        const prop = lastStackEntry.propsSchema[i];
        if (!Object.hasOwn(lastStackEntry.schema.properties, prop)) {
          if (lastStackEntry.schema.ignoreExtraPropertiesAll) {
            return true;
          }
        }
        if (lastStackEntry.schema.properties[prop].type === 'object') {
          let noValueProvided = false;
          const schemaCasted: SchemaObject =
            lastStackEntry.schema.properties[prop];
          const valueToUseInner = schemaCasted.getStub();
          valueToUse = valueToUseInner;
          lastStackEntry.valueToUse[prop] = valueToUseInner;
          const propsSchema = Object.keys(schemaCasted.properties);
          if (!isPureObject(lastStackEntry.externalValueCurrent[prop])) {
            const propsPresent = Object.keys(valueToUseInner);
            if (!lastStackEntry.schema.ignoreExtraPropertiesAll) {
              checkProps(propsSchema, propsPresent);
            }
            //the first argument is an object, and even if it wasn't the
            //hasOwn() method accepts any value
            //$FlowFixMe[incompatible-type]
            if (!Object.hasOwn(lastStackEntry.externalValueCurrent, prop)) {
              noValueProvided = true;
              stack.push({
                type: 'object',
                schema: schemaCasted,
                valueToUse: valueToUseInner,
                propsPresent,
                propsSchema,
                externalValueCurrent: valueToUseInner,
                noValueProvided,
                i: -1,
              });
              return true;
            }
            throw new Error(
                'Must be an object, e.g. {  }, Object.create(null)');
          }
          const extValueEl: PureObject =
            lastStackEntry.externalValueCurrent[prop];
          const propsPresent = Object.keys(extValueEl);
          if (!lastStackEntry.schema.ignoreExtraPropertiesAll) {
            checkProps(propsSchema, propsPresent);
          }
          stack.push({
            type: 'object',
            schema: schemaCasted,
            valueToUse: valueToUseInner,
            propsPresent,
            propsSchema: Object.keys(schemaCasted.properties),
            externalValueCurrent: extValueEl,
            noValueProvided,
            i: -1,
          });
          return true;
        }
        return false;
      }

      function checkProps(propsSchema: Array<string>,
          propsPresent: Array<string>) {
        const setSchema = new Set(propsSchema);
        const setPresent = new Set(propsPresent);
        setPresent.forEach(p => {
          if (!setSchema.has(p)) {
            throw new Error(`Unknown property '${ p }'`);
          }
        });
      }
    }

    function isArray(param: mixed): param is Array<mixed> {
      //Seems to be a Flow bug
      //$FlowFixMe[incompatible-type-guard]
      return Array.isArray(param);
    }

    function handleTopLevelExternalValueArray(schemaCurrentPassed:
        SchemaArray) {
      const valueToUseArray: Array<mixed> = [];
      if (!isArray(externalValueCurrent)) {
        throw new Error('must be an array');
      }
      if (schemaCurrentPassed.processPre) {
        const rv = schemaCurrentPassed
          .processPre(externalValueCurrent, carry, valueToUseArray);
        if (rv.validationErrorMessage) {
          throw new Error(rv.validationErrorMessage);
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
}
