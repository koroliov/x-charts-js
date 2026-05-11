//@flow strict
import type { PureObject, } from '../types.js';

export type CarryObj = { +[string]: mixed, __proto__: null, }

type ProcessMethod = (valueProvided: mixed, carryObj: CarryObj) => {
  +validationErrorMessage: string,
  +valueToUse: mixed,
  +carryObj: CarryObj,
}

type ProcessPreOrPostMethodObject = (valueProvided: mixed, carryObj: CarryObj,
    valueToUse: { [string]: mixed, }) => {
  +validationErrorMessage: string,
  +valueToUse: mixed,
  +carryObj: CarryObj,
}

type ProcessPreOrPostMethodArray = (valueProvided: mixed, carryObj: CarryObj,
    valueToUse: Array<mixed>) => {
  +validationErrorMessage: string,
  +valueToUse: mixed,
  +carryObj: CarryObj,
}

type ExtraPropertiesHandling = {
  +ignoreExtraPropertiesAll: false,
  +ignoreExtraPropertiesSet: Set<string>,
} | {
  +ignoreExtraPropertiesAll: true,
};

export type SchemaFinal = {
  +type: 'final',
  +getDefault?: () => mixed,
  +process: ProcessMethod,
}

export type SchemaObject = {
  +type: 'object',
  +getStub: () => { [string]: mixed, },
  +processPre?: ProcessPreOrPostMethodObject,
  +processPost?: ProcessPreOrPostMethodObject,
  +properties: { [string]: Schema, },
  ...ExtraPropertiesHandling,
}

export type SchemaArray = {
  +type: 'array',
  +processPre?: ProcessPreOrPostMethodArray,
  +processPost?: ProcessPreOrPostMethodArray,
  +elements: Schema,
}

export type Schema = SchemaFinal | SchemaArray | SchemaObject

export type StackEntryArray = {
  type: 'array',
  schema: SchemaArray,
  valueToUse: Array<mixed>,
  externalValueCurrent: $ReadOnlyArray<mixed>,
  i: number,
}

export type StackEntryObject = {
  type: 'object',
  schema: SchemaObject,
  valueToUse: { [string]: mixed, },
  propsSchema: Array<string>,
  externalValueCurrent: PureObject,
  noValueProvided: boolean,
  i: number,
}
