/* global Scrambler */

/* eslint-disable import/prefer-default-export, no-console */
Scrambler({
  target: '[data-title-scrambler]',
  random: [1000, 5000],
  speed: 100
});
Scrambler('p:not(.no-scramble), ul:not(.no-scramble) li');
var buttonT = document.querySelector('#scramble-title-button');
var buttonP = document.querySelector('#scramble-paragraph-button');
var buttonN = document.querySelector('#scramble-paragraph-decode');
buttonT.addEventListener('click', function () {
  Scrambler({
    target: '[data-title-scrambler]',
    random: [1000, 10000]
  });
});
buttonP.addEventListener('click', function () {
  Scrambler({
    target: 'p:not(.no-scramble), ul:not(.no-scramble) li, h3:not(.no-scramble)',
    random: [1000, 30000]
  });
});
buttonN.addEventListener('click', function () {
  Scrambler({
    target: '[data-title-scrambler]',
    random: [1000, 20000],
    speed: 100,
    text: 'Secret message'
  });
});
