"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var Scrambler = function Scrambler(scrambleArgs) {
  try {
    // call action fn
    var scrambleFire = function scrambleFire(scrambleArgs) {
      // remember, hoisted
      // get chosen scramble items
      var scramble = passedAsObject ? _toConsumableArray(document.querySelectorAll(scrambleArgs.target)) : _toConsumableArray(document.querySelectorAll(scrambleArgs)); // for each scramble element

      scramble.forEach(function (element, which) {
        if (element.getAttribute('data-scramble-active') !== 'true') {
          element.setAttribute('data-scramble-active', 'true');
          var truth = element.textContent.split(''); // get letters

          var truthHTML = element.innerHTML; // get html

          var startText = truth;
          var newLetters = element.textContent.split('');
          var revert = []; // init empty kill switch array	

          var speed = scrambleArgs.speed ? scrambleArgs.speed : 100;
          var HTMLreset = false; // if user defines an ending text string then use that instead of the original text

          var defineEndText = function defineEndText(end) {
            var endText = end || element.textContent;
            truth = endText.split('');
            newLetters = endText.split('');
            startText = [];
            truth.forEach(function (item, index) {
              if (' \t\n\r\v'.indexOf(truth[index]) > -1) {
                startText.push(' ');
              } else {
                startText.push(randomChar());
              }
            });
            startText = startText;
          }; // first check passed option and then data-attribute 


          if (scrambleArgs.text && scrambleArgs.text !== "" && (typeof scrambleArgs.text === 'string' || _instanceof(scrambleArgs.text, String))) {
            defineEndText(scrambleArgs.text);
            HTMLreset = true;
          } else if (element.getAttribute('data-scramble-text') && element.getAttribute('data-scramble-text') !== "") {
            defineEndText(element.getAttribute('data-scramble-text'));
            HTMLreset = true;
          }

          var ticker = setInterval(function () {
            // map over letters and replace with random or revert back to truth
            startText.map(function (letter, i) {
              // break if a space
              if (' \t\n\r\v'.indexOf(letter) > -1) return; // set new random letter

              newLetters[i] = randomChar(); // set random timeout to make letters reset at different times

              setTimeout(function () {
                revert[i] = true;
              }, randomTime()); // reset individual letter if kill switch

              if (revert[i] === true) {
                newLetters[i] = truth[i];
              }

              ; // set html

              element.textContent = newLetters.join('');
            }); // kill interval after all letter returned to normal to save stack

            var killCheck = newLetters.length == truth.length && newLetters.every(function (e, i) {
              return e === truth[i];
            });

            if (killCheck) {
              element.innerHTML = truthHTML;

              if (HTMLreset) {
                var innerContent = element.children[0];

                if (innerContent && innerContent !== "") {
                  innerContent.textContent = newLetters.join('');
                } else {
                  element.textContent = newLetters.join('');
                }
              }

              clearInterval(ticker); // stop looping

              element.setAttribute('data-scramble-active', 'false');
            }

            ;
          }, speed); // end ticker
        } // end check for active

      }); // end forEach
    };

    /*** helper functions ***/
    // utility fn to get a random character 
    var randomChar = function randomChar(length) {
      var l = length || 1;
      var r = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, l);
      if (' \t\n\r\v'.indexOf(r) < 0) return r;
    }; // object test


    var isObject = function isObject(a) {
      return !!a && a.constructor === Object;
    }; // did the user pass an object as an argument?


    var passedAsObject = isObject(scrambleArgs) || _typeof(scrambleArgs) == 'object'; // set function default arguments if it was an object

    if (passedAsObject) {
      scrambleArgs.target = typeof scrambleArgs.target !== 'undefined' && passedAsObject ? scrambleArgs.target : '[data-scrambler]';
      scrambleArgs.random = typeof scrambleArgs.random !== 'undefined' && passedAsObject ? scrambleArgs.random : [1000, 3000];
      scrambleArgs.speed = typeof scrambleArgs.speed !== 'undefined' && passedAsObject ? scrambleArgs.speed : 100;
      scrambleArgs.text = typeof scrambleArgs.text !== 'undefined' && passedAsObject ? scrambleArgs.text : false;
    } // utility fn to get a random delay time 


    var randomTime = function randomTime() {
      if (passedAsObject) {
        return scrambleArgs.random[0] + (Math.random() * (1 - scrambleArgs.random[1]) + scrambleArgs.random[1]);
      }

      return 1000 + (Math.random() * (1 - 3000) + 3000);
    };

    scrambleFire(scrambleArgs);
    ; // end scrambleFire
  } catch (e) {
    console.trace('%cuh-oh: %c' + e + '', 'color:indianred;', 'color:cornflowerblue;');
  }
}; // end Scramble