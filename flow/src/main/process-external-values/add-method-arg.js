//@flow strict
import type {
  Schema,
  SchemaArray,
  CarryObj,
} from '../../external-values-processor/types.js';
import { process as processMain, }
  from '../../external-values-processor/main.js';

type AddMethodArgumentMainLevel = {
  +type: string,
  +zIndex: string,
}

export function process(userProvidedArguments: Array<mixed>): {
  validationErrorMessage: string,
  valueToUse: AddMethodArgumentMainLevel,
} {
  const schema: SchemaArray = {
    type: 'array',
    processPre(valueProvided, carryObj, valueToUse) {
      return {
        carryObj,
        valueToUse,
        validationErrorMessage: '',
      };
    },
    processPost(valueProvided, carryObj, valueToUse: Array<mixed>) {
      return {
        carryObj,
        valueToUse: valueToUse[0],
        validationErrorMessage: '',
      };
    },
    elements: {
      type: 'object',
      getStub() {
        return { type: '', zIndex: '', };
      },
      ignoreExtraPropertiesAll: true,
      properties: {
        type: {
          type: 'final',
          process(valueProvided: mixed, carryObj: CarryObj) {
            return {
              validationErrorMessage: '',
              carryObj,
              valueToUse: valueProvided,
            };
          },
        },
        zIndex: {
          type: 'final',
          process(valueProvided: mixed, carryObj: CarryObj) {
            return {
              validationErrorMessage: '',
              carryObj,
              valueToUse: valueProvided,
            };
          },
          getDefault() {
            return '1';
          },
        },
      },
    },
  };

  const processed = processMain(userProvidedArguments, schema);
  //At this stage the processed.valueToUse should be guaranteed to be of type
  //AddMethodArgumentMainLevel
  //$FlowFixMe[incompatible-type]
  return processed;
}
