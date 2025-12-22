//      strict
                                                                 
                                                  
import { process as processMain, }
  from '../../external-values-processor/main.js';
import { isPureObject, } from '../../utils/validation.js';

                                   
                
                  
 

export function process(userProvidedArguments              , registeredTypes 
               )   
                                 
                                         
  {
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

  function getTypeSchema()              {
    return {
      type: 'final',
      process(valueProvided       , carryObj          ) {
        const valueProvidedStr = String(valueProvided);
        if (!registeredTypes.has(valueProvidedStr)) {
          return {
            validationErrorMessage: [
              `Component of type '${ valueProvidedStr
                }' has not been registered,`,
              `registered components are: ${
                Array.from(registeredTypes).join(', ') }`,
            ].join('\n'),
            carryObj,
            valueToUse: null,
          };
        }
        return { validationErrorMessage: '', carryObj,
            valueToUse: valueProvided, };
      },
    };
  }

  function getZIndexSchema()              {
    return {
      type: 'final',
      process(valueProvided       , carryObj          ) {
        const retVal = {
          validationErrorMessage: '',
          carryObj,
          valueToUse: valueProvided,
        };
        if (isInvalid()) {
          retVal.valueToUse = null;
          retVal.validationErrorMessage =
            'Value must be a numeric integer string with no white spaces';
        }
        return retVal;

        function isInvalid() {
          return typeof valueProvided !== 'string' ||
            !/^-*\d+$/.test(valueProvided);
        }
      },
      getDefault() { return '1'; },
    };
  }

  function getArgumentSchema()               {
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
        return { type: '', zIndex: '', };
      },
      ignoreExtraPropertiesAll: true,
      properties: {
        type: getTypeSchema(),
        zIndex: getZIndexSchema(),
      },
    };
  }

  function getArgumentsSchema()              {
    return {
      type: 'array',
      processPre(valueProvided, carryObj, valueToUse) {
        if (Array.isArray(valueProvided) && valueProvided.length !== 1) {
          return {
            carryObj,
            valueToUse,
            validationErrorMessage:
                `The .add() method expects a single argument, received ${
                    valueProvided.length }`,
          };
        }
        return { carryObj, valueToUse, validationErrorMessage: '', };
      },
      processPost(valueProvided, carryObj, valueToUse              ) {
        return { carryObj, valueToUse: valueToUse[0],
          validationErrorMessage: '', };
      },
      elements: getArgumentSchema(),
    };
  }

  function prepareFinalErrorMessage() {
    if (!processed.validationError) {
      return '';
    }
    const errorMessageArray                = [
      'ERR_X_CHARTS_JS_INVALID_ADD_METHOD_ARG:',
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
