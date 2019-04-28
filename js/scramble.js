/* eslint-disable import/prefer-default-export, no-console */

// get setup function
import { ScramblerSetup } from './scrambleSetup';

// export main api function
export const Scrambler = (function (setup) { // wrapper function
  return setup.scrambleFire;
}(ScramblerSetup)); 