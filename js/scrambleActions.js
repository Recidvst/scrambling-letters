/* eslint-disable import/prefer-default-export, no-console */

// export actions for the Scrambler fn

// import randomChar
import { randomChar, isFunction } from './scrambleUtil.js';

// sets args after checking
export const setArgs = function (args, t) {
  let passedAsObject = t || false;
  // default args
  let obj = {
    target: '[data-scrambler]',
    random: [1000, 3000],
    speed: 100,
    text: false,
    beforeEach: false,
    afterEach: false,
    beforeAll: false,
    afterAll: false,
    errorHandler: false
  };
  // update if arg object present
  if ( args && passedAsObject ) {
    obj.target = (typeof args.target !== 'undefined') ? args.target : '[data-scrambler]';
    obj.random = (typeof args.random !== 'undefined') ? args.random : [1000, 3000];
    obj.speed = (typeof args.speed !== 'undefined') ? args.speed : 100;
    obj.text = (typeof args.text !== 'undefined') ? args.text : false;
    obj.beforeEach = (typeof args.beforeEach !== 'undefined' && isFunction(args.beforeEach)) ? args.beforeEach : false;
    obj.afterEach = (typeof args.afterEach !== 'undefined' && isFunction(args.afterEach)) ? args.afterEach : false;
    obj.beforeAll = (typeof args.beforeAll !== 'undefined' && isFunction(args.beforeAll)) ? args.beforeAll : false;
    obj.afterAll = (typeof args.afterAll !== 'undefined' && isFunction(args.afterAll)) ? args.afterAll : false;
    obj.errorHandler = (typeof args.errorHandler !== 'undefined' && isFunction(args.errorHandler)) ? args.errorHandler : false;
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

// set end state of text if user specifies
export const defineEndText = function(end) {
  if ( !end || end === undefined || !(typeof end === 'string' || end instanceof String) ) return false; // break if no string passed
  const endText = end;
  const truth = endText.split('');
  const newLetters = endText.split('');
  const startTextTemp = [];
  let startText;

  truth.forEach((item, index) => {
    if (' \t\n\r\v'.indexOf(truth[index]) > -1) {
      startTextTemp.push(' ');
    } else {
      startTextTemp.push(randomChar());
    }
  });
  startText = startTextTemp;

  return {
    truth,
    newLetters,
    startText
  }
};