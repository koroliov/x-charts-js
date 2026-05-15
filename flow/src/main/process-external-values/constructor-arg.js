//@flow strict
import type { SchemaArray, SchemaObject, SchemaFinal, CarryObj, }
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
  const argumentsSchema = getArgumentsSchema();
  const processed = processMain(userProvidedArguments, argumentsSchema);
  const retVal = {
    validationErrorMessage: prepareFinalErrorMessage(),
    valueToUse: processed.valueToUse,
  };
  //At this stage the processed.valueToUse should be guaranteed to be of type
  //AddMethodArgumentMainLevel
  //$FlowFixMe[incompatible-type]
  return retVal;

  function getArgumentsSchema(): SchemaArray {
    return {
      type: 'array',
      processPre(valueProvided, carryObj, valueToUse) {
        if (Array.isArray(valueProvided) && valueProvided.length !== 1) {
          return {
            carryObj,
            valueToUse: null,
            validationErrorMessage: [
              'new XChartsJs() constructor call expects a single',
              `argument, received ${ valueProvided.length }`,
            ].join(' '),
          };
        }
        return { carryObj, valueToUse, validationErrorMessage: '', };
      },
      processPost(valueProvided, carryObj, valueToUse: Array<mixed>) {
        return { carryObj, valueToUse: valueToUse[0],
          validationErrorMessage: '', };
      },
      elements: getArgumentSchema(),
    };
  }

  function getBgColorSchema(): SchemaFinal {
    return {
      type: 'final',
      process(valueProvided: mixed, carryObj: CarryObj) {
        const valueProvidedStr = String(valueProvided);
        //TODO: use error message from the validateHexColor()
        const isInvalid = validateHexColor(valueProvidedStr);
        if (isInvalid) {
          return {
            validationErrorMessage: [
              'value must be a full (6 char long) hex string,',
              'e.g. #ffffff, not #fff',
            ].join('\n'),
            carryObj,
            valueToUse: null,
          };
        }
        return { validationErrorMessage: '', carryObj,
            valueToUse: valueProvided, };
      },
      getDefault() { return '#ffffff'; },
    };
  }

  function getIsComponentInspectModeSchema(): SchemaFinal {
    return {
      type: 'final',
      process(valueProvided: mixed, carryObj: CarryObj) {
        if (typeof valueProvided !== 'boolean') {
          return {
            validationErrorMessage: 'value must be a boolean',
            carryObj,
            valueToUse: null,
          };
        }
        return { validationErrorMessage: '', carryObj,
            valueToUse: valueProvided, };
      },
      getDefault() { return false; },
    };
  }

  function getContainerDivSchema(): SchemaFinal {
    return {
      type: 'final',
      process(valueProvided: mixed, carryObj: CarryObj) {
        const valueProvidedStr = String(valueProvided);
        if (!(valueProvided instanceof containerClass)) {
          return {
            carryObj,
            valueToUse: null,
            validationErrorMessage: 'Must be an HTMLDivElement',
          };
        }
        return { carryObj, valueToUse: valueProvided,
            validationErrorMessage: '', };
      },
    };
  }

  function getOptionsSchema(): SchemaObject {
    return {
      type: 'object',
      getStub() {
        return { backgroundColor: '', isComponentInspectMode: false, };
      },
      properties: {
        backgroundColor: getBgColorSchema(),
        isComponentInspectMode: getIsComponentInspectModeSchema(),
      },
      ignoreExtraPropertiesAll: false,
      ignoreExtraPropertiesSet: new Set(),
    };
  }

  function getArgumentSchema(): SchemaObject {
    return {
      type: 'object',
      processPre(valueProvided, carryObj, valueToUse) {
        if (!isPureObject(valueProvided)) {
          return {
            carryObj,
            valueToUse,
            validationErrorMessage:
              'value must be an object, e.g. {  }, Object.create(null)',
          };
        }
        return { carryObj, valueToUse, validationErrorMessage: '', };
      },
      getStub() {
        return { containerDiv: null, options: null, };
      },
      ignoreExtraPropertiesAll: true,
      properties: {
        containerDiv: getContainerDivSchema(),
        options: getOptionsSchema(),
      },
      ignoreExtraPropertiesAll: false,
      ignoreExtraPropertiesSet: new Set(),
    };
  }

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
