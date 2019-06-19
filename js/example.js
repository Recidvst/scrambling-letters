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
    random: [1000, 10000],
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
