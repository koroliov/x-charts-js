//      strict
             
         
              
           
                                                  
import { process as processMain, }
  from '../../external-values-processor/main.js';

                                   
                
                  
 

export function process(userProvidedArguments              )   
                                 
                                         
  {
  const schema              = {
    type: 'array',
    processPre(valueProvided, carryObj, valueToUse) {
      return {
        carryObj,
        valueToUse,
        validationErrorMessage: '',
      };
    },
    processPost(valueProvided, carryObj, valueToUse              ) {
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
          process(valueProvided       , carryObj          ) {
            return {
              validationErrorMessage: '',
              carryObj,
              valueToUse: valueProvided,
            };
          },
        },
        zIndex: {
          type: 'final',
          process(valueProvided       , carryObj          ) {
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
