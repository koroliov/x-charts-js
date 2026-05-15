//@flow strict
import type { SchemaObject, SchemaFinal, CarryObj, }
  from '../../../external-values-processor/types.js';
import { process as processMain, }
  from '../../../external-values-processor/main.js';
import { isPureObject, } from '../../../utils/validation.js';
import type { PureObject, } from '../../../types.js';
import type { AddMethodArgumentLegendNormalized, } from '../types.js';
import { getArgumentSchema as getArgumentSchemaMain, } from
  '../../../main/process-external-values/add-method-arg.js';

export function process(userProvidedArgument: PureObject): {
  validationErrorMessage: string,
  valueToUse: AddMethodArgumentLegendNormalized,
} {
  const argumentSchema = getArgumentSchema();

  const processed = processMain(userProvidedArgument, argumentSchema);
  const retVal = {
    validationErrorMessage: prepareFinalErrorMessage(),
    valueToUse: processed.valueToUse,
  };
  //At this stage the processed.valueToUse should be guaranteed to be of type
  //AddMethodArgumentLegendNormalized
  //$FlowFixMe[incompatible-type]
  return retVal;

  function getArgumentSchema(): SchemaObject {
    const addMethodArgSchemaMain = getArgumentSchemaMain(new Set());
    const propsHandledOnMainLevel =
      new Set(Object.keys(addMethodArgSchemaMain.properties));
    return {
      type: 'object',
      getStub() {
        return { htmlFragment: '', };
      },
      ignoreExtraPropertiesAll: false,
      ignoreExtraPropertiesSet: propsHandledOnMainLevel,
      properties: {
        htmlFragment: getHtmlFragmentSchema(),
      },
    };

    function getHtmlFragmentSchema(): SchemaFinal {
      return {
        type: 'final',
        process(valueProvided: mixed, carryObj: CarryObj) {
          const retVal = {
            validationErrorMessage: '',
            carryObj,
            valueToUse: valueProvided,
          };
          if (valueProvided === '' || typeof valueProvided !== 'string') {
            retVal.valueToUse = null;
            retVal.validationErrorMessage =
              'value must be a non-empty valid HTML string';
          }
          return retVal;
        },
      };
    }
  }

  function prepareFinalErrorMessage() {
    if (!processed.validationError) {
      return '';
    }
    const errorMessageArray: Array<string> = [
      'ERR_X_CHARTS_JS_INVALID_ADD_METHOD_ARG:',
    ];
    processed.validationError.path.unshift('argument 0');
    errorMessageArray.push(`  ${
        //.path is definitely not null here, b/c we set its 0 element above
        //$FlowFixMe[incompatible-use]
        processed.validationError.path.join(' -> ') }:`);
    //if validationError is not null, then .message is string
    //$FlowFixMe[incompatible-use]
    errorMessageArray.push(`  ${ processed.validationError.message }`);
    return errorMessageArray.join('\n');
  }
}
