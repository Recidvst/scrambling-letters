/* eslint-disable import/prefer-default-export, no-console */

// get util functions
import { isObject, randomChar, randomTime } from './scrambleUtil.js';
// get action functions
import { killCheck, activateDOM, deactivateDOM } from './scrambleActions.js';

export default function (element) {
  if (typeof element === "undefined") return false;

  if (element.getAttribute('data-scramble-active') !== 'true') {
    
    element.setAttribute('data-scramble-active', 'true');
    element.classList.add('scrambling');

    let truth = element.textContent.split(''); // get letters
    const truthHTML = element.innerHTML; // get html
    let startText = truth;
    let newLetters = element.textContent.split('');
    const revert = []; // init empty kill switch array
    const speed = (scrambleFireArgs.speed) ? scrambleFireArgs.speed : 100;
    let HTMLreset = false;

    // if user defines an ending text string then use that instead of the original text
    const defineEndText = function defEndText (end) {
      const endText = end || element.textContent;
      truth = endText.split('');
      newLetters = endText.split('');
      const startTextTemp = [];
      // ADD TEST HERE
      truth.forEach((item, index) => {
        if (' \t\n\r\v'.indexOf(truth[index]) > -1) {
          startTextTemp.push(' ');
        } else {
          startTextTemp.push(randomChar());
        }
      });
      startText = startTextTemp;
    };
    // first check passed option and then data-attribute
    // ADD TEST HERE
    if (scrambleFireArgs.text && scrambleFireArgs.text !== '' && (typeof scrambleFireArgs.text === 'string' || scrambleFireArgs.text instanceof String)) {
      defineEndText(scrambleFireArgs.text);
      HTMLreset = true;
    } else if (element.getAttribute('data-scramble-text') && element.getAttribute('data-scramble-text') !== '') {
      defineEndText(element.getAttribute('data-scramble-text'));
      HTMLreset = true;
    }

    const ticker = setInterval(() => {
      // map over letters and replace with random or revert back to truth
      startText.map((letter, i) => {
        // break if a space
        if (' \t\n\r\v'.indexOf(letter) > -1) return false;
        // set new random letter
        newLetters[i] = randomChar();
        // set random timeout to make letters reset at different times
        setTimeout(() => {
          revert[i] = true;
        }, randomTime(isObject(scrambleFireArgs), scrambleFireArgs.random));
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
      }
    }, speed); // end ticker
  } // end check for active

  return true;
};