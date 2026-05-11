//@flow strict
import type { SchemaObject, SchemaFinal, CarryObj, }
  from '../../../external-values-processor/types.js';
import { process as processMain, }
  from '../../../external-values-processor/main.js';
import { isPureObject, } from '../../../utils/validation.js';
import type { PureObject, } from '../../../../src/types.js';
import type { AddMethodArgumentLegend2, }
  from '../../../../src/components/legend/types.js';
import { getArgumentSchema as getArgumentSchemaMain, } from
  '../../../../src/main/process-external-values/add-method-arg.js';

export function process(userProvidedArgument: PureObject): {
  validationErrorMessage: string,
  valueToUse: AddMethodArgumentLegend2,
} {
  const argumentsSchema = getArgumentSchema();

  const processed = processMain(userProvidedArgument, argumentsSchema);
  const retVal = {
    validationErrorMessage: prepareFinalErrorMessage(),
    valueToUse: processed.valueToUse,
  };
  //At this stage the processed.valueToUse should be guaranteed to be of type
  //AddMethodArgumentLegend2
  //$FlowFixMe[incompatible-type]
  return retVal;

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
            'Value must be a non-empty valid HTML string';
        }
        return retVal;
      },
    };
  }

  function getArgumentSchema(): SchemaObject {
    const addMethodArgSchemaMain = getArgumentSchemaMain(new Set());
    const propsHandledOnMainLevel =
      new Set(Object.keys(addMethodArgSchemaMain.properties));
    return {
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
        return { carryObj, valueToUse, validationErrorMessage: '', };
      },
      getStub() {
        return { htmlFragment: '', };
      },
      ignoreExtraPropertiesAll: false,
      ignoreExtraPropertiesSet: propsHandledOnMainLevel,
      properties: {
        htmlFragment: getHtmlFragmentSchema(),
      },
    };
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
