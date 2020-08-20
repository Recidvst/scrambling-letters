/* global Scrambler */
/* eslint-disable import/prefer-default-export, no-console */

Scrambler({
  target: '[data-title-scrambler]',
  random: [1000, 4000],
  speed: 100,
});

const buttonT = document.querySelector('#scramble-title-button');
const buttonP = document.querySelector('#scramble-paragraph-button');
const buttonN = document.querySelector('#scramble-paragraph-decode');

buttonT.addEventListener('click', () => {
  Scrambler({
    target: '[data-title-scrambler]',
    random: [2000, 3000],
    speed: 100,
    beforeAll: function() {
      d1 = Date.now();
      console.log(d1);
    }, 
    afterAll: function() {
      d2 = Date.now();
      console.log(d2);
      console.warn(d2 - d1);
    },
    errorHandler: function(e) {
      console.log('error', e);
    }
  });
});


buttonP.addEventListener('click', () => {
  Scrambler({
    target: 'p:not(.no-scramble), ul:not(.no-scramble) li, h3:not(.no-scramble)',
    random: [2000, 4000],
    beforeAll: function() {
      console.log('example - before all');
    },
    afterAll: function(els) {
      console.log('example - after all');
      console.log(els);
    }
  });
});

buttonN.addEventListener('click', () => {
  Scrambler({
    target: '[data-title-scrambler]',
    random: [3000, 10000],
    speed: 100,
    text: 'Secret message',
  });
});
