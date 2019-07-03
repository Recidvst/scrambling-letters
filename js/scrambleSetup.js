/* eslint-disable import/prefer-default-export, no-console */

// get util functions
import { isObject, isValidArgType } from './scrambleUtil.js';
// get action functions
import { setArgs } from './scrambleActions.js';
// get main function to do the actual scrambling
import Scramble from './scrambleMain.js';

// export main setup function - this is imported in the main api export
export default function (passedArgs) {

  if ( isValidArgType(passedArgs) ) {

    // set function default arguments if it was an object
    const scrambleFireArgs = setArgs(passedArgs, isObject(passedArgs));
    
    // get chosen scramble items
    const scrambleElements = (isObject(scrambleFireArgs)) ? [...document.querySelectorAll(scrambleFireArgs.target)] : [...document.querySelectorAll(scrambleFireArgs)];

    // create promises from chosen items
    let promiseArr = [];
    scrambleElements.forEach( (item) => {
      let promise = Scramble(item, scrambleFireArgs);
      promiseArr.push(promise);
    });

    if (promiseArr.length > 0) {
      // beforeAll hook
      if (scrambleFireArgs.beforeAll) {
        scrambleFireArgs.beforeAll(scrambleElements);      
      }
      // use promise.all to wait for all promises to complete
      Promise.all(promiseArr)
      .then(function(els) {
        // afterAll hook
        if (scrambleFireArgs.afterAll) {
          scrambleFireArgs.afterAll(els);
        }
      })
      .catch((e) => {
        // error handler, also fires when anim locked (running)
        if (scrambleFireArgs.errorHandler) {
          scrambleFireArgs.errorHandler(e);
        }
      });
    } 
    else {
      return false;
    }
  }
  else {
    return false;
  }
}