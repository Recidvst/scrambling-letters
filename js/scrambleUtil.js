/* eslint-disable import/prefer-default-export, no-console */

// export helper functions for the Scrambler fn

// object test
export const isObject = function (a) {
  return (!!a) && (a.constructor === Object);
};

// array test
export const isArray = function (a) {
  return (!!a) && (a.constructor === Array);
};

// boolean test
export const isBool = function (a) {
  return typeof a === 'boolean';
};

// function test
export const isFunction = function (a) {
  return typeof a === 'function';
};

// integer test
export const isInteger = function (a) {
  return Number.isInteger(a);
};

// is a string and valid
export const isValidString = function (argsText) {
  if (argsText && argsText !== '' && (typeof argsText === 'string' || argsText instanceof String)) {
    return true;
  }
  return false;
};

// only if string or object
export const isValidArgType = function (args) {
  if (isArray(args) || isBool(args) || (typeof args === 'number') || (typeof args === 'function') || (typeof args === 'undefined') ) {
    return false;
  }
  return true;
}

// utility fn to get a random character
export const randomChar = function (length, debug) {
  const l = length || 1;
  const d = debug || false;
  const r = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, l);
  if (' \t\n\r\v'.indexOf(r) < 0 && d !== true) return r;
  return false;
};

// utility fn to get a random delay time
export const randomTime = function (obj, rand, speed) {
  const asObj = obj || false;
  let compensater = speed || 100;
  let output = 1000; // default output

  if (asObj && isArray(rand) && rand.length > 1) {
    let [ timing1, timing2 ] = rand; // destructure duration
    
    if (speed >= timing2 || compensater >= timing2) { // check the speed value isn't higher than the duration
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