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
   
    // for each scramble element
    scrambleElements.forEach((sE) => {
      Scramble(sE, scrambleFireArgs);
    });

    return true;
  }
  else {
    return false;
  }

}