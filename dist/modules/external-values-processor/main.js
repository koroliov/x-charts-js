//      strict
             
         
               
              
              
           
                    
import { isObject, } from '../utils/validation.js';

export function process(extValue       , schema        )   
                                 
                    
  {
  const carry = Object.create(null);
  const stack         
                  
                        
                             
                                  
              
       
                   
                         
                                     
                                
                               
                                           
                                            
              
     = [];
  let doLoop = true;
  let schemaCurrent         = schema;
  let valueToUse        = null;
  let i = -1;
  let extValueCurrent = extValue;

  while (doLoop) {
    const lastStackEntry = stack.at(-1);
    if (!lastStackEntry) {
      if (schemaCurrent.type === 'array') {
        const valueToUseArray               = [];
        if (!isArray(extValueCurrent)) {
          throw new Error('must be an array');
        }
        if (schemaCurrent.processPre) {
          const rv = schemaCurrent
            .processPre(extValueCurrent, carry, valueToUseArray);
          if (rv.validationErrorMessage) {
            throw new Error('aaa');
          }
        }
        stack.push({
          type: 'array',
          schema: schemaCurrent,
          valueToUse: valueToUseArray,
          extValueCurrent,
          i: -1,
        });
        schemaCurrent = schemaCurrent.elements;
        if (0 === extValueCurrent.length) {
          throw new Error('aaa');
        }
        continue;
      }
    } else {
      i = ++lastStackEntry.i;
      if (lastStackEntry.type === 'array') {
        const extArray               = lastStackEntry.extValueCurrent;
        schemaCurrent = lastStackEntry.schema.elements;
        if (i >= extArray.length) {
          lastStackEntry.valueToUse.push(valueToUse);
          valueToUse = lastStackEntry.valueToUse;
          if (lastStackEntry.schema.processPost) {
            valueToUse = lastStackEntry.schema
              .processPost(extValueCurrent, carry, valueToUse).valueToUse;
          }
          stack.pop();
          continue;
        }
        const extValueEl = extArray[i];
        if (schemaCurrent.type === 'object') {
          if (!isObject(extValueEl)) {
            throw new Error('must be an object');
          }
          const propsPresent = Object.keys(extValueEl);
          const valueToUse                       = schemaCurrent.getStub();
          stack.push({
            type: 'object',
            schema: schemaCurrent,
            valueToUse,
            propsPresent,
            propsSchema: Object.keys(schemaCurrent.properties),
            extValueCurrent: extValueEl,
            i: -1,
          });
          continue;
        }
      }
      if (lastStackEntry.type === 'object') {
        const extObj = lastStackEntry.extValueCurrent;
        if (i >= lastStackEntry.propsSchema.length) {
          valueToUse = lastStackEntry.valueToUse;
          stack.pop();
          continue;
        }
        const prop = lastStackEntry.propsSchema[i];
        if (!Object.hasOwn(lastStackEntry.schema.properties, prop)) {
          if (lastStackEntry.schema.ignoreExtraPropertiesAll) {
            continue;
          }
        }
        schemaCurrent = lastStackEntry.schema.properties[prop];
        if (schemaCurrent.type === 'final') {
          //.hasOwn() should accept an object with null proto, this looks like a
          //bug in Flow
          //$FlowFixMe[incompatible-type]
          if (!Object.hasOwn(extObj, prop)) {
            if (Object.hasOwn(schemaCurrent, 'getDefault')) {
              //The hasOwn check should guarantee the prop is present, and it's
              //a function, since it's specified in the type
              //$FlowFixMe[not-a-function]
              const m = schemaCurrent.getDefault();
              const valueToUse = lastStackEntry.valueToUse;
              valueToUse[prop] = m;
              continue;
            } else {
              throw new Error('no value');
            }
          }
          const procValue = schemaCurrent.process(extObj[prop], carry);
          if (procValue.validationErrorMessage) {
            throw new Error('validation error');
          }
          lastStackEntry.valueToUse[prop] = procValue.valueToUse;
          continue;
        }
      }
    }
    break;
  }
  return {
    validationErrorMessage: '',
    valueToUse,
  };

  function isArray(param       )                        {
    //Seems to be a Flow bug
    //$FlowFixMe[incompatible-type-guard]
    return Array.isArray(param);
  }
}
