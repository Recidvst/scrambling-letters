/* global Scrambler */
/* eslint-disable import/prefer-default-export, no-console */

Scrambler({
  target: '[data-title-scrambler]',
  random: [1000, 5000],
  speed: 100,
  beforeEach: function() {
    console.log('before1');
  },
  afterEach: function() {
    console.log('after1');
  }
});

Scrambler('p:not(.no-scramble), ul:not(.no-scramble) li');

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
    random: [1000, 30000],
    beforeEach: function() {
      console.log('before');
    },
    afterEach: function(element) {
      console.log(element);
    }
  });
});

buttonN.addEventListener('click', () => {
  Scrambler({
    target: '[data-title-scrambler]',
    random: [1000, 20000],
    speed: 100,
    text: 'Secret message',
  });
});
