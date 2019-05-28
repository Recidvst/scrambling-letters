/* eslint-disable import/prefer-default-export, no-console */

// export actions for the Scrambler fn

// sets args after checking
export const setArgs = function (args, t) {
  let passedAsObject = t || false;
  // default args
  let obj = {
    target: '[data-scrambler]',
    random: [1000, 3000],
    speed: 100,
    text: false
  };
  // update if arg object present
  if ( args && passedAsObject ) {
    obj.target = (typeof args.target !== 'undefined') ? args.target : '[data-scrambler]';
    obj.random = (typeof args.random !== 'undefined') ? args.random : [1000, 3000];
    obj.speed = (typeof args.speed !== 'undefined') ? args.speed : 100;
    obj.text = (typeof args.text !== 'undefined') ? args.text : false;
  }
  return obj;
}

// check if animation has completed
export const killCheck = function(newLetters, truth) {
  let result = (newLetters.length === truth.length) && newLetters.every((e, i) => e === truth[i]);
  if ( result ) {
    return true;
  }
  return false;
}