/* global Scrambler */

/* eslint-disable import/prefer-default-export, no-console */
Scrambler({
  target: '[data-title-scrambler]',
  random: [1000, 4000],
  speed: 100
});
var buttonT = document.querySelector('#scramble-title-button');
var buttonP = document.querySelector('#scramble-paragraph-button');
var buttonN = document.querySelector('#scramble-paragraph-decode');
buttonT.addEventListener('click', function () {
  Scrambler({
    target: '[data-title-scrambler]',
    random: [2000, 3000],
    speed: 100,
    beforeAll: function beforeAll() {
      d1 = Date.now();
      console.log(d1);
    },
    afterAll: function afterAll() {
      d2 = Date.now();
      console.log(d2);
      console.warn(d2 - d1);
    },
    errorHandler: function errorHandler(e) {
      console.log('error', e);
    }
  });
});
buttonP.addEventListener('click', function () {
  Scrambler({
    target: 'p:not(.no-scramble), ul:not(.no-scramble) li, h3:not(.no-scramble)',
    random: [2000, 4000],
    beforeAll: function beforeAll() {
      console.log('example - before all');
    },
    afterAll: function afterAll(els) {
      console.log('example - after all');
      console.log(els);
    }
  });
});
buttonN.addEventListener('click', function () {
  Scrambler({
    target: '[data-title-scrambler]',
    random: [3000, 10000],
    speed: 100,
    text: 'Secret message'
  });
});
