/* eslint-disable import/prefer-default-export, no-console */

// export helper functions - these are used in the ScrambleSetup wrapper

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