/* eslint-disable import/prefer-default-export, no-console */

// get util functions
import { isObject, isArray, isValidString, randomChar, randomTime } from './scrambleUtil.js';
// get action functions
import { killCheck, defineEndText } from './scrambleActions.js';

export default function (element, scrambleFireArgs) {
  return new Promise((resolve, reject) => { // create promise to wrap fn

    if (typeof element === "undefined") reject('Target element is undefined');

    if (element.getAttribute('data-scramble-active') !== 'true') {
      
      if (scrambleFireArgs.beforeEach) { // callback fired before fn
        scrambleFireArgs.beforeEach(element);
      }

      element.setAttribute('data-scramble-active', 'true');
      element.classList.add('scrambling');

      const truthHTML = element.innerHTML; // get html
      const revert = []; // init empty kill switch array
      const speed = (scrambleFireArgs.speed) ? scrambleFireArgs.speed : 100;
      let truth = element.textContent.split(''); // get letters
      let startText = truth;
      let newLetters = element.textContent.split('');
      let HTMLreset = false;

      // if user defines an ending text string then use that instead of the original text   
      let newTextResult;
      // first check passed option and then data-attribute
      if ( isValidString(scrambleFireArgs.text) ) {
        newTextResult = defineEndText(scrambleFireArgs.text);
      } else if ( element.getAttribute('data-scramble-text') && element.getAttribute('data-scramble-text') !== '' ) {
        newTextResult = defineEndText(element.getAttribute('data-scramble-text'));
      }
      // reset vars
      if ( newTextResult ) {
        HTMLreset = true;
        truth = newTextResult.truth;
        newLetters = newTextResult.newLetters;
        startText = newTextResult.startText;
      }

      // set random killswitch timers to reset letters to original states
      const timeoutHandler = function(arr) {
        if (arr && isArray(arr)) {
          for (let i = 0; i <= arr.length; i++ ) {
            setTimeout(() => {
              revert[i] = true;
            }, randomTime(isObject(scrambleFireArgs), scrambleFireArgs.random, scrambleFireArgs.speed));
          }
        }
        return false;
      }

      const intervalHandler = function() {
        // map over letters and replace with random or revert back to truth
        startText.map((letter, i) => {
          // break if a space
          if (' \t\n\r\v'.indexOf(letter) > -1) return false;
          // set new random letter
          newLetters[i] = randomChar();
          // reset individual letter if kill switch
          if (revert[i] === true) {
            newLetters[i] = truth[i];
          }
          // set html
          element.textContent = newLetters.join('');
          return true;
        });

        // kill interval after all letter returned to normal to save stack
        if ( killCheck(newLetters, truth) ) {
          element.innerHTML = truthHTML;
          if (HTMLreset) {
            const innerContent = element.children[0];
            if (innerContent && innerContent !== '') {
              innerContent.textContent = newLetters.join('');
            } else {
              element.textContent = newLetters.join('');
            }
          }
          clearInterval(ticker); // stop looping
          element.setAttribute('data-scramble-active', 'false');
          element.classList.remove('scrambling');

          if (scrambleFireArgs.afterEach) { // callback fired after fn
            scrambleFireArgs.afterEach(element);
          }

          resolve(element); // resolve promise
        }
      }

      // fire timeouts and interval
      timeoutHandler(startText);
      intervalHandler();
      const ticker = setInterval(() => {
        intervalHandler();
      }, speed);
    } // end check for active
    else {
      reject('Animation already triggered');
    }

  });
}