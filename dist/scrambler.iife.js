var Scrambler = (function () {
  'use strict';

  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  // export helper functions for the Scrambler fn

  // object test
  var isObject = function isObject(a) {
    return !!a && a.constructor === Object;
  };

  // array test
  var isArray = function isArray(a) {
    return !!a && a.constructor === Array;
  };

  // boolean test
  var isBool = function isBool(a) {
    return typeof a === 'boolean';
  };

  // function test
  var isFunction = function isFunction(a) {
    return typeof a === 'function';
  };

  // integer test
  var isInteger = function isInteger(a) {
    return Number.isInteger(a);
  };

  // is a string and valid
  var isValidString = function isValidString(argsText) {
    if (argsText && argsText !== '' && (typeof argsText === 'string' || argsText instanceof String)) {
      return true;
    }
    return false;
  };

  // only if string or object
  var isValidArgType = function isValidArgType(args) {
    if (isArray(args) || isBool(args) || typeof args === 'number' || typeof args === 'function' || typeof args === 'undefined') {
      return false;
    }
    return true;
  };

  // utility fn to get a random character
  var randomChar = function randomChar(length, debug) {
    var l = length || 1;
    var d = debug || false;
    var r = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, l);
    if (' \t\n\r\v'.indexOf(r) < 0 && d !== true) return r;
    return false;
  };

  // utility fn to get a random delay time
  var randomTime = function randomTime(obj, rand, speed) {
    var asObj = obj || false;
    var compensater = speed || 100;
    var output = 1000; // default output

    if (asObj && isArray(rand) && rand.length > 1) {
      var _rand = _slicedToArray(rand, 2),
        timing1 = _rand[0],
        timing2 = _rand[1]; // destructure duration

      if (speed >= timing2 || compensater >= timing2) {
        // check the speed value isn't higher than the duration
        compensater = timing2 - 1;
      }
      timing2 = timing2 - compensater;
      if (timing1 > timing2) {
        timing1 = timing2;
      }
      if (isInteger(timing1) && isInteger(timing2)) {
        output = Math.floor(Math.random() * (timing2 - timing1)) + timing1;
        // return output - compensater;
        return output;
      }
    }

    // fallback
    output = Math.floor(Math.random() * (3000 - (1000 + 1))) + 1000;
    // return output - compensater;
    return output;
  };

  // export actions for the Scrambler fn


  // sets args after checking
  var setArgs = function setArgs(args, t) {
    var passedAsObject = t || false;
    // default args
    var obj = {
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
    if (args && passedAsObject) {
      obj.target = typeof args.target !== 'undefined' ? args.target : '[data-scrambler]';
      obj.random = typeof args.random !== 'undefined' ? args.random : [1000, 3000];
      obj.speed = typeof args.speed !== 'undefined' ? args.speed : 100;
      obj.text = typeof args.text !== 'undefined' ? args.text : false;
      obj.beforeEach = typeof args.beforeEach !== 'undefined' && isFunction(args.beforeEach) ? args.beforeEach : false;
      obj.afterEach = typeof args.afterEach !== 'undefined' && isFunction(args.afterEach) ? args.afterEach : false;
      obj.beforeAll = typeof args.beforeAll !== 'undefined' && isFunction(args.beforeAll) ? args.beforeAll : false;
      obj.afterAll = typeof args.afterAll !== 'undefined' && isFunction(args.afterAll) ? args.afterAll : false;
      obj.errorHandler = typeof args.errorHandler !== 'undefined' && isFunction(args.errorHandler) ? args.errorHandler : false;
    }
    return obj;
  };

  // check if animation has completed
  var killCheck = function killCheck(newLetters, truth) {
    var result = newLetters.length === truth.length && newLetters.every(function (e, i) {
      return e === truth[i];
    });
    if (result) {
      return true;
    }
    return false;
  };

  // set end state of text if user specifies
  var defineEndText = function defineEndText(end) {
    if (!end || end === undefined || !(typeof end === 'string' || end instanceof String)) return false; // break if no string passed
    var endText = end;
    var truth = endText.split('');
    var newLetters = endText.split('');
    var startTextTemp = [];
    var startText;
    truth.forEach(function (item, index) {
      if (' \t\n\r\v'.indexOf(truth[index]) > -1) {
        startTextTemp.push(' ');
      } else {
        startTextTemp.push(randomChar());
      }
    });
    startText = startTextTemp;
    return {
      truth: truth,
      newLetters: newLetters,
      startText: startText
    };
  };

  // get util functions
  function Scramble (element, scrambleFireArgs) {
    return new Promise(function (resolve, reject) {
      // create promise to wrap fn

      if (typeof element === "undefined") reject('Target element is undefined');
      if (element.getAttribute('data-scramble-active') !== 'true') {
        if (scrambleFireArgs.beforeEach) {
          // callback fired before fn
          scrambleFireArgs.beforeEach(element);
        }
        element.setAttribute('data-scramble-active', 'true');
        element.classList.add('scrambling');
        var truthHTML = element.innerHTML; // get html
        var revert = []; // init empty kill switch array
        var speed = scrambleFireArgs.speed ? scrambleFireArgs.speed : 100;
        var truth = element.textContent.split(''); // get letters
        var startText = truth;
        var newLetters = element.textContent.split('');
        var HTMLreset = false;

        // if user defines an ending text string then use that instead of the original text   
        var newTextResult;
        // first check passed option and then data-attribute
        if (isValidString(scrambleFireArgs.text)) {
          newTextResult = defineEndText(scrambleFireArgs.text);
        } else if (element.getAttribute('data-scramble-text') && element.getAttribute('data-scramble-text') !== '') {
          newTextResult = defineEndText(element.getAttribute('data-scramble-text'));
        }
        // reset vars
        if (newTextResult) {
          HTMLreset = true;
          truth = newTextResult.truth;
          newLetters = newTextResult.newLetters;
          startText = newTextResult.startText;
        }

        // set random killswitch timers to reset letters to original states
        var timeoutHandler = function timeoutHandler(arr) {
          if (arr && isArray(arr)) {
            var _loop = function _loop(i) {
              setTimeout(function () {
                revert[i] = true;
              }, randomTime(isObject(scrambleFireArgs), scrambleFireArgs.random, scrambleFireArgs.speed));
            };
            for (var i = 0; i <= arr.length; i++) {
              _loop(i);
            }
          }
          return false;
        };
        var intervalHandler = function intervalHandler() {
          // map over letters and replace with random or revert back to truth
          startText.map(function (letter, i) {
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
          if (killCheck(newLetters, truth)) {
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
            element.classList.remove('scrambling');
            if (scrambleFireArgs.afterEach) {
              // callback fired after fn
              scrambleFireArgs.afterEach(element);
            }
            resolve(element); // resolve promise
          }
        };

        // fire timeouts and interval
        timeoutHandler(startText);
        intervalHandler();
        var ticker = setInterval(function () {
          intervalHandler();
        }, speed);
      } // end check for active
      else {
        reject('Animation already triggered');
      }
    });
  }

  // export main setup function - this is imported in the main api export
  function ScramblerSetup (passedArgs) {
    if (isValidArgType(passedArgs)) {
      // set function default arguments if it was an object
      var scrambleFireArgs = setArgs(passedArgs, isObject(passedArgs));

      // get chosen scramble items
      var scrambleElements = isObject(scrambleFireArgs) ? _toConsumableArray(document.querySelectorAll(scrambleFireArgs.target)) : _toConsumableArray(document.querySelectorAll(scrambleFireArgs));

      // create promises from chosen items
      var promiseArr = [];
      scrambleElements.forEach(function (item) {
        var promise = Scramble(item, scrambleFireArgs);
        promiseArr.push(promise);
      });
      if (promiseArr.length > 0) {
        // beforeAll hook
        if (scrambleFireArgs.beforeAll) {
          scrambleFireArgs.beforeAll(scrambleElements);
        }
        // use promise.all to wait for all promises to complete
        Promise.all(promiseArr).then(function (els) {
          // afterAll hook
          if (scrambleFireArgs.afterAll) {
            scrambleFireArgs.afterAll(els);
          }
        })["catch"](function (e) {
          // error handler, also fires when anim locked (running)
          if (scrambleFireArgs.errorHandler) {
            scrambleFireArgs.errorHandler(e);
          }
        });
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  // get setup function

  // export main api function
  var scrambler = (function () {
    return ScramblerSetup;
  })();

  return scrambler;

})();
