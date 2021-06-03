
### Examples

Just some basic examples to show common use cases.

Please let me know if you have found any particularly interesting uses and I'll add them here!

> ## Standard usage

```js
Scrambler({
  target: '#scramble-id',
  random: [1000, 12000],
  speed: 100,
  beforeEach: function(element) {
    console.log(`${element} about to scramble`);
  },
  afterAll: function(elements) {
    console.log('all done!');
  }
});
```

> ## Faster scramble

```js
const fasterScramble = x.hasAttribute('data-scrambler-fast');
Scrambler({
  target: '.fastscramble',
  random: fasterScramble ? [1000, 2000] : [3000, 6000],
  speed: fasterScramble ? 80 : 100,
  afterAll: function() {
    fasterScrambleAction(arg);
  },
});
```

> ## Recursive Scrambler

```js
const scramblingTextElementsArr = [...document.querySelectorAll("[class*=scrambling-text__]")];

let recursiveScramblerIndex = 0;
function recursiveScrambler(limit, curIndex) {
  if (curIndex >= limit) {
    setTimeout( () => {
      someCustomAction(arg);
    }, 500);
    return;
  }
  let ind = curIndex;

  Scrambler({
    target: `.scrambling-text__${ind}`,
    random: [600, 1200],
    beforeAll: function() {
      document.querySelector(`.scrambling-text__${ind}`).classList.remove('hidden');
    },
    afterAll: function() {
      ind++;
      recursiveScrambler(scramblingTextElementsArr.length, ind);
    },
  });
}
```

> ## Change element text

```js
<h1 id="target">Normal text</h1>
Scrambler({
  target: '#target',
  text: 'Secret text'
});
```

> ## Factory with default options

```js
import Scrambler from 'scrambling-letters';

export function scramblerTrigger(options = {
  target: 'h1',
  random: [1750, 3000],
  speed: 100,
}) {
  Scrambler({
    ...options,
  });
}
```
