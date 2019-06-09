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
export const randomTime = function (arg, rand) {
  const asObj = arg || false;
  if (asObj && isArray(rand) && rand.length > 1) {
    return rand[0] + ((Math.random() * (1 - rand[1])) + rand[1]);
  }
  return 1000 + ((Math.random() * (1 - 3000)) + 3000);
};