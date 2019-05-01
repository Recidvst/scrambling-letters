/* eslint-disable import/prefer-default-export, no-console */

// get setup function
const ScrambleSetup = require('./scrambleSetup.js');

// export main api function
const Scrambler = (function (setup) { // wrapper function
  return setup;
}(ScrambleSetup));

module.exports = Scrambler;