/* eslint-disable import/prefer-default-export, no-console */

// get setup function
// import { ScrambleSetup } from './scrambleSetup';
const ScrambleSetup = require('./scrambleSetup.js');
console.log(ScrambleSetup.ScrambleSetup);
// export main api function
window.Scrambler = ScrambleSetup.ScrambleSetup;