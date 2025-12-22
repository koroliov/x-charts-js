//@flow strict
import type { SchemaArray, CarryObj, }
  from '../../external-values-processor/types.js';
import { process as processMain, }
  from '../../external-values-processor/main.js';
import { isPureObject, validateHexColor, } from '../../utils/validation.js';

type ConstructorArgument = {
  +containerDiv: HTMLDivElement,
  +options: {
    +backgroundColor: string,
    +isComponentInspectMode: boolean,
  },
}

export function process(userProvidedArguments: Array<mixed>, containerClass:
    Class<HTMLDivElement>): {
  validationErrorMessage: string,
  valueToUse: ConstructorArgument,
} {
  const schema: SchemaArray = {
    type: 'array',
    processPre(valueProvided, carryObj, valueToUse) {
      if (Array.isArray(valueProvided)) {
        if (valueProvided.length !== 1) {
          return {
            carryObj,
            valueToUse,
            validationErrorMessage: [
              'The new XChartsJs() constructor expects a single',
              `argument, received ${ valueProvided.length }`,
            ].join(' '),
          };
        }
      }
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
      processPre(valueProvided, carryObj, valueToUse) {
        if (!isPureObject(valueProvided)) {
          return {
            carryObj,
            valueToUse,
            validationErrorMessage:
              'Must be an object, e.g. {  }, Object.create(null)',
          };
        }
        return {
          carryObj,
          valueToUse,
          validationErrorMessage: '',
        };
      },
      getStub() {
        return { containerDiv: null, options: null, };
      },
      ignoreExtraPropertiesAll: true,
      properties: {
        containerDiv: {
          type: 'final',
          process(valueProvided: mixed, carryObj: CarryObj) {
            const valueProvidedStr = String(valueProvided);
            if (!(valueProvided instanceof containerClass)) {
              return {
                validationErrorMessage: 'Must be an HTMLDivElement',
                carryObj,
                valueToUse: null,
              };
            }
            return {
              validationErrorMessage: '',
              carryObj,
              valueToUse: valueProvided,
            };
          },
        },
        options: {
          type: 'object',
          getStub() {
            return { backgroundColor: '', isComponentInspectMode: false, };
          },
          ignoreExtraPropertiesAll: false,
          ignoreExtraPropertiesSet: new Set(),
          properties: {
            backgroundColor: {
              type: 'final',
              process(valueProvided: mixed, carryObj: CarryObj) {
                const valueProvidedStr = String(valueProvided);
                //TODO: use error message from the validateHexColor()
                const isInvalid = validateHexColor(valueProvidedStr);
                if (isInvalid) {
                  return {
                    validationErrorMessage: [
                      'Value must be a full (6 char long) hex string,',
                      'e.g. #ffffff, not #fff',
                    ].join('\n'),
                    carryObj,
                    valueToUse: null,
                  };
                }
                return {
                  validationErrorMessage: '',
                  carryObj,
                  valueToUse: valueProvided,
                };
              },
              getDefault() {
                return '#ffffff';
              },
            },
            isComponentInspectMode: {
              type: 'final',
              process(valueProvided: mixed, carryObj: CarryObj) {
                if (typeof valueProvided !== 'boolean') {
                  return {
                    validationErrorMessage: 'Value must be a boolean',
                    carryObj,
                    valueToUse: null,
                  };
                }
                return {
                  validationErrorMessage: '',
                  carryObj,
                  valueToUse: valueProvided,
                };
              },
              getDefault() {
                return false;
              },
            },
          },
        },
      },
      ignoreExtraPropertiesAll: false,
      ignoreExtraPropertiesSet: new Set(),
    },
  };

  const processed = processMain(userProvidedArguments, schema);
  const retVal = {
    validationErrorMessage: prepareFinalErrorMessage(),
    valueToUse: processed.valueToUse,
  };
  //At this stage the processed.valueToUse should be guaranteed to be of type
  //AddMethodArgumentMainLevel
  //$FlowFixMe[incompatible-type]
  return retVal;

  function prepareFinalErrorMessage() {
    if (!processed.validationError) {
      return '';
    }
    const errorMessageArray: Array<string> = [
      'ERR_X_CHARTS_JS_INVALID_CONSTRUCTOR_ARG:',
    ];
    if (processed.validationError.path.length) {
      processed.validationError.path[0] = 'argument 0';
      errorMessageArray.push(`  ${
          //.path is definitely not null here
          //$FlowFixMe[incompatible-use]
          processed.validationError.path.join(' -> ') }:`);
    }
    //if validationError is not null, then .message is string
    //$FlowFixMe[incompatible-use]
    errorMessageArray.push(`  ${ processed.validationError.message }`);
    return errorMessageArray.join('\n');
  }
}
