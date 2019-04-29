// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/scrambleUtil.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBool = exports.isArray = exports.isObject = exports.randomTime = exports.randomChar = void 0;

/* eslint-disable import/prefer-default-export, no-console */
// export helper functions - these are used in the ScrambleSetup wrapper
// utility fn to get a random character
var randomChar = function randomChar(length, debug) {
  var l = length || 1;
  var d = debug || false;
  var r = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, l);
  if (' \t\n\r\v'.indexOf(r) < 0 && debug !== true) return r;
  return false;
}; // utility fn to get a random delay time


exports.randomChar = randomChar;

var randomTime = function randomTime(arg, rand) {
  var asObj = arg || false;

  if (asObj && isArray(rand) && rand.length > 1) {
    return rand[0] + (Math.random() * (1 - rand[1]) + rand[1]);
  }

  return 1000 + (Math.random() * (1 - 3000) + 3000);
}; // object test


exports.randomTime = randomTime;

var isObject = function isObject(a) {
  return !!a && a.constructor === Object;
}; // array test


exports.isObject = isObject;

var isArray = function isArray(a) {
  return !!a && a.constructor === Array;
}; // boolean test


exports.isArray = isArray;

var isBool = function isBool(a) {
  return typeof a === "boolean";
};

exports.isBool = isBool;
},{}],"js/scrambleSetup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrambleSetup = void 0;

var _scrambleUtil = require("./scrambleUtil");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// export main setup function - this is imported in the main api export
var ScrambleSetup = function () {
  // wrapper function
  var scrambleFire = function scrambleFire(scrambleFireArgs) {
    // return if array passed (needs string or object)
    if ((0, _scrambleUtil.isArray)(scrambleFireArgs) || (0, _scrambleUtil.isBool)(scrambleFireArgs)) {
      return false;
    } // set function default arguments if it was an object


    var passedAsObject = (0, _scrambleUtil.isObject)(scrambleFireArgs) || _typeof(scrambleFireArgs) === 'object';

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
              startTextTemp.push((0, _scrambleUtil.randomChar)());
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

            newLetters[i] = (0, _scrambleUtil.randomChar)(); // set random timeout to make letters reset at different times

            setTimeout(function () {
              revert[i] = true;
            }, (0, _scrambleUtil.randomTime)((0, _scrambleUtil.isObject)(scrambleFireArgs), scrambleFireArgs.random)); // reset individual letter if kill switch

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


exports.ScrambleSetup = ScrambleSetup;
},{"./scrambleUtil":"js/scrambleUtil.js"}],"js/scramble.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scrambler = void 0;

var _scrambleSetup = require("./scrambleSetup");

/* eslint-disable import/prefer-default-export, no-console */
// get setup function
// export main api function
var Scrambler = function (setup) {
  // wrapper function
  return setup;
}(_scrambleSetup.ScrambleSetup);

exports.Scrambler = Scrambler;
},{"./scrambleSetup":"js/scrambleSetup.js"}],"js/example.js":[function(require,module,exports) {
"use strict";

var _scramble = require("./scramble");

/* eslint-disable no-console */
(0, _scramble.Scrambler)({
  target: '[data-title-scrambler]',
  random: [1000, 5000],
  speed: 100
});
(0, _scramble.Scrambler)('p:not(.no-scramble), ul:not(.no-scramble) li');
var buttonT = document.querySelector('#scramble-title-button');
var buttonP = document.querySelector('#scramble-paragraph-button');
var buttonN = document.querySelector('#scramble-paragraph-decode');
buttonT.addEventListener('click', function () {
  (0, _scramble.Scrambler)({
    target: '[data-title-scrambler]',
    random: [1000, 10000]
  });
});
buttonP.addEventListener('click', function () {
  (0, _scramble.Scrambler)({
    target: 'p:not(.no-scramble), ul:not(.no-scramble) li, h3:not(.no-scramble)',
    random: [1000, 30000]
  });
});
buttonN.addEventListener('click', function () {
  (0, _scramble.Scrambler)({
    target: '[data-title-scrambler]',
    random: [1000, 20000],
    speed: 100,
    text: 'Secret message'
  });
});
},{"./scramble":"js/scramble.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50337" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/example.js"], null)
//# sourceMappingURL=/example.2342ae25.js.map