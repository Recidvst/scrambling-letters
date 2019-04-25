/* eslint-disable import/prefer-default-export */

export const Scrambler = function (scrambleArgs) {
  /** * helper functions ** */
  // utility fn to get a random character
  const randomChar = function (length) {
    const l = length || 1;
    const r = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, l);
		if (' \t\n\r\v'.indexOf(r) < 0) return r;
		return false;
  };
  // object test
  const isObject = function (a) {
    return (!!a) && (a.constructor === Object);
  };
  // did the user pass an object as an argument?
  const passedAsObject = (isObject(scrambleArgs) || typeof scrambleArgs === 'object');
  // set function default arguments if it was an object
  if (passedAsObject) {
    scrambleArgs.target = (typeof scrambleArgs.target !== 'undefined' && (passedAsObject)) ? scrambleArgs.target : '[data-scrambler]';
    scrambleArgs.random = (typeof scrambleArgs.random !== 'undefined' && (passedAsObject)) ? scrambleArgs.random : [1000, 3000];
    scrambleArgs.speed = (typeof scrambleArgs.speed !== 'undefined' && (passedAsObject)) ? scrambleArgs.speed : 100;
    scrambleArgs.text = (typeof scrambleArgs.text !== 'undefined' && (passedAsObject)) ? scrambleArgs.text : false;
  }
  // utility fn to get a random delay time
  const randomTime = function () {
    if (passedAsObject) {
      return scrambleArgs.random[0] + ((Math.random() * (1 - scrambleArgs.random[1])) + scrambleArgs.random[1]);
    }
    return 1000 + ((Math.random() * (1 - 3000)) + 3000);
  };

  const scrambleFire = function (scrambleFireArgs) { // remember, hoisted
    // get chosen scramble items
    const scramble = (passedAsObject) ? [...document.querySelectorAll(scrambleFireArgs.target)] : [...document.querySelectorAll(scrambleFireArgs)];

    // for each scramble element
    scramble.forEach((element) => {
      if (element.getAttribute('data-scramble-active') !== 'true') {
        element.setAttribute('data-scramble-active', 'true');

        let truth = element.textContent.split(''); // get letters
        const truthHTML = element.innerHTML; // get html
        let startText = truth;
        let newLetters = element.textContent.split('');
        const revert = []; // init empty kill switch array
        const speed = (scrambleFireArgs.speed) ? scrambleFireArgs.speed : 100;
        let HTMLreset = false;

        // if user defines an ending text string then use that instead of the original text
        const defineEndText = function (end) {
          const endText = end || element.textContent;
          truth = endText.split('');
          newLetters = endText.split('');
          const startTextTemp = [];
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
            }, randomTime());
            // reset individual letter if kill switch
            if (revert[i] === true) {
              newLetters[i] = truth[i];
            }
            // set html
            element.textContent = newLetters.join('');
            return true;
          });

          // kill interval after all letter returned to normal to save stack
          const killCheck = (newLetters.length === truth.length) && newLetters.every((e, i) => e === truth[i]);
          if (killCheck) {
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
          }
        }, speed); // end ticker
      } // end check for active
    }); // end forEach
  }; // end scrambleFire

  scrambleFire(scrambleArgs); // call action fn
}; // end Scramble
