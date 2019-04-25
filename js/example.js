import { Scrambler } from './scramble';

Scrambler({
  target: '[data-title-scrambler]',
  random: [1000, 30000],
  speed: 100,
});

Scrambler('p:not(.no-scramble), ul:not(.no-scramble) li');

Scrambler({
  target: '#scramble-text-id',
  random: [1000, 30000],
  speed: 100,
});

const buttonT = document.querySelector('#scramble-title-button');
const buttonP = document.querySelector('#scramble-paragraph-button');
const buttonN = document.querySelector('#scramble-paragraph-new');

buttonT.addEventListener('click', () => {
  Scrambler('[data-title-scrambler]');
  Scrambler({
    target: '#scramble-text-id',
    random: [1000, 30000],
    speed: 100,
  });
});

buttonP.addEventListener('click', () => {
  Scrambler('p:not(.no-scramble), ul:not(.no-scramble) li, h3:not(.no-scramble)');
});

buttonN.addEventListener('click', () => {
  Scrambler({
    target: '[data-title-scrambler]',
    random: [1000, 30000],
    speed: 100,
    text: 'Secret message',
  });
});
