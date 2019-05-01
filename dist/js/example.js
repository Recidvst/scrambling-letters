(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var Scrambler = require('./scramble.js');

Scrambler({
  target: '[data-title-scrambler]',
  random: [1000, 5000],
  speed: 100
});
Scrambler('p:not(.no-scramble), ul:not(.no-scramble) li');
var buttonT = document.querySelector('#scramble-title-button');
var buttonP = document.querySelector('#scramble-paragraph-button');
var buttonN = document.querySelector('#scramble-paragraph-decode');
buttonT.addEventListener('click', function () {
  Scrambler({
    target: '[data-title-scrambler]',
    random: [1000, 10000]
  });
});
buttonP.addEventListener('click', function () {
  Scrambler({
    target: 'p:not(.no-scramble), ul:not(.no-scramble) li, h3:not(.no-scramble)',
    random: [1000, 30000]
  });
});
buttonN.addEventListener('click', function () {
  Scrambler({
    target: '[data-title-scrambler]',
    random: [1000, 20000],
    speed: 100,
    text: 'Secret message'
  });
});

},{"./scramble.js":2}],2:[function(require,module,exports){
"use strict";

/* eslint-disable import/prefer-default-export, no-console */
// get setup function
var ScrambleSetup = require('./scrambleSetup.js'); // export main api function


var Scrambler = function (setup) {
  // wrapper function
  return setup;
}(ScrambleSetup);

module.exports = Scrambler;

},{"./scrambleSetup.js":3}],3:[function(require,module,exports){
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-disable import/prefer-default-export, no-console */
// get util functions
var ScramblerUtils = require('./scrambleUtil.js'); // export main setup function - this is imported in the main api export


var ScrambleSetup = function () {
  // wrapper function
  var scrambleFire = function scrambleFire(scrambleFireArgs) {
    // return if array passed (needs string or object)
    if (ScramblerUtils.isArray(scrambleFireArgs) || ScramblerUtils.isBool(scrambleFireArgs)) {
      return false;
    } // set function default arguments if it was an object


    var passedAsObject = ScramblerUtils.isObject(scrambleFireArgs) || _typeof(scrambleFireArgs) === 'object';

    if (passedAsObject) {
      scrambleFireArgs.target = typeof scrambleFireArgs.target !== 'undefined' && passedAsObject ? scrambleFireArgs.target : '[data-scrambler]';
      scrambleFireArgs.random = typeof scrambleFireArgs.random !== 'undefined' && passedAsObject ? scrambleFireArgs.random : [1000, 3000];
      scrambleFireArgs.speed = typeof scrambleFireArgs.speed !== 'undefined' && passedAsObject ? scrambleFireArgs.speed : 100;
      scrambleFireArgs.text = typeof scrambleFireArgs.text !== 'undefined' && passedAsObject ? scrambleFireArgs.text : false;
    } // get chosen scramble items


    var scramble = passedAsObject ? _toConsumableArray(document.querySelectorAll(scrambleFireArgs.target)) : _toConsumableArray(document.querySelectorAll(scrambleFireArgs)); // for each scramble element

    scramble.forEach(function (element) {
      if (element.getAttribute('data-scramble-active') !== 'true') {
        element.setAttribute('data-scramble-active', 'true');
        var truth = element.textContent.split(''); // get letters

        var truthHTML = element.innerHTML; // get html

        var startText = truth;
        var newLetters = element.textContent.split('');
        var revert = []; // init empty kill switch array

        var speed = scrambleFireArgs.speed ? scrambleFireArgs.speed : 100;
        var HTMLreset = false; // if user defines an ending text string then use that instead of the original text

        var defineEndText = function defineEndText(end) {
          var endText = end || element.textContent;
          truth = endText.split('');
          newLetters = endText.split('');
          var startTextTemp = [];
          truth.forEach(function (item, index) {
            if (' \t\n\r\v'.indexOf(truth[index]) > -1) {
              startTextTemp.push(' ');
            } else {
              startTextTemp.push(ScramblerUtils.randomChar());
            }
          });
          startText = startTextTemp;
        }; // first check passed option and then data-attribute


        if (scrambleFireArgs.text && scrambleFireArgs.text !== '' && (typeof scrambleFireArgs.text === 'string' || scrambleFireArgs.text instanceof String)) {
          defineEndText(scrambleFireArgs.text);
          HTMLreset = true;
        } else if (element.getAttribute('data-scramble-text') && element.getAttribute('data-scramble-text') !== '') {
          defineEndText(element.getAttribute('data-scramble-text'));
          HTMLreset = true;
        }

        var ticker = setInterval(function () {
          // map over letters and replace with random or revert back to truth
          startText.map(function (letter, i) {
            // break if a space
            if (' \t\n\r\v'.indexOf(letter) > -1) return false; // set new random letter

            newLetters[i] = ScramblerUtils.randomChar(); // set random timeout to make letters reset at different times

            setTimeout(function () {
              revert[i] = true;
            }, ScramblerUtils.randomTime(ScramblerUtils.isObject(scrambleFireArgs), scrambleFireArgs.random)); // reset individual letter if kill switch

            if (revert[i] === true) {
              newLetters[i] = truth[i];
            } // set html


            element.textContent = newLetters.join('');
            return true;
          }); // kill interval after all letter returned to normal to save stack

          var killCheck = newLetters.length === truth.length && newLetters.every(function (e, i) {
            return e === truth[i];
          });

          if (killCheck) {
            element.innerHTML = truthHTML;

            if (HTMLreset) {
              var innerContent = element.children[0];

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

    return true;
  }; // end scrambleFire
  // expose function


  return scrambleFire;
}(); // end ScramblerSetup


module.exports = ScrambleSetup;

},{"./scrambleUtil.js":4}],4:[function(require,module,exports){
"use strict";

/* eslint-disable import/prefer-default-export, no-console */
// export helper functions - these are used in the ScrambleSetup wrapper
// object test
var isObject = function isObject(a) {
  return !!a && a.constructor === Object;
}; // array test


var isArray = function isArray(a) {
  return !!a && a.constructor === Array;
}; // boolean test


var isBool = function isBool(a) {
  return typeof a === 'boolean';
}; // utility fn to get a random character


var randomChar = function randomChar(length, debug) {
  var l = length || 1;
  var d = debug || false;
  var r = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, l);
  if (' \t\n\r\v'.indexOf(r) < 0 && d !== true) return r;
  return false;
}; // utility fn to get a random delay time


var randomTime = function randomTime(arg, rand) {
  var asObj = arg || false;

  if (asObj && isArray(rand) && rand.length > 1) {
    return rand[0] + (Math.random() * (1 - rand[1]) + rand[1]);
  }

  return 1000 + (Math.random() * (1 - 3000) + 3000);
};

module.exports = {
  isObject: isObject,
  isArray: isArray,
  isBool: isBool,
  randomChar: randomChar,
  randomTime: randomTime
};

},{}]},{},[1]);
