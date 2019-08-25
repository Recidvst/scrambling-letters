
[![npm](https://img.shields.io/npm/dt/scrambling-letters.svg)](https://www.npmjs.com/package/scrambling-letters)
[![npm](https://img.shields.io/npm/v/scrambling-letters.svg)](https://www.npmjs.com/package/scrambling-letters)
[![Travis (.com)](https://img.shields.io/travis/com/Recidvst/scrambling-letters.svg)](https://travis-ci.com/Recidvst/scrambling-letters)
[![Coverage Status](https://coveralls.io/repos/github/Recidvst/scrambling-letters/badge.svg?branch=master)](https://coveralls.io/github/Recidvst/scrambling-letters?branch=master)
[![license](https://img.shields.io/github/license/recidvst/scrambling-letters.svg)](https://github.com/Recidvst/scrambling-letters/blob/master/LICENSE)

# Scrambling Letters
> A lightweight javascript library for scrambling letters within a piece of text, giving a nice decoding effect.

Loops through any elements with the relevant selector or data attribute and scrambles the letters randomly for a couple of seconds before returning them one by one to their original state or an alternate string.

[**Demo Page**](https://scrambling-letters.chris-snowden.me/ 'Scrambling Letters demo')

---


## Get Scrambling Letters

### Download/Install
- Download the Scrambling Letters dist files from [Github](https://github.com/Recidvst/scrambling-letters/archive/master.zip 'Github download') or install via [NPM](https://www.npmjs.com/package/scrambling-letters 'npm download').
- Pick the dist file you desire. Choose from UMD, ESM, CJS, IIFE or use the source code and build your own.
- Import or include the JS into your site/app. This will allow you to access the **Scrambler()** function.

### Initiate
- Scrambler() needs to be told which piece of text to scramble.
- Initiate a Scrambler instance by calling Scrambler() with a valid selector. 
- If you wish to add configuration, pass Scrambler an object containing config options (see below).

### Configure
You can configure your Scrambler instance by passing an object. The available options and callbacks are as follows:

#### Options

#### ```target```
**Purpose:** This is the text you wish to Scramble! Pass a selector or data attribute (or anything else valid for document.querySelectorAll).    
**Type:** String    
**Default:** '[data-scrambler]'     
**Required:** Yes.   

#### ```random```
**Purpose:** This controls the randomised time in milliseconds before each letter returns to its original state. The first value is the minimum delay and the second value is the maximum. E.g. changing [1000, 3000] to [1000, 9000] would increase the maximum time. Set both to the same value to make all letters finish together. This also controls the maximum time the animation will take e.g. if you want the animation to take 3 seconds then set both to 3000.    
**Type:** Array (ms)  
**Default:** [1000, 3000]    
**Required:** No.

#### ```speed```
**Purpose:** This controls the speed at which the letters will change. I would advise leaving it at the default 100ms, but you can tweak this value if you desire. This value should be substantially lower than than the length of the animation if it is to look good.    
**Type:** Integer (ms)   
**Default:** 100  
**Required:** No.  

#### ```text```
**Purpose:** This lets you specify the end state of the Scrambled text. By default the Scrambler will revert to the original text after animating, but if this option is set then the end state of the text will instead be the specified string. e.g. "Starting Text" -> *scramble* -> "Ending Text".  
**Type:** String  
**Default:** The element text  
**Required:** No.

#### Callbacks

#### ```beforeEach```
**Purpose:** This callback allows you to add a user defined function which will fire immediately *before* the scrambling animation begins. This applies to each element e.g. it will fire 3 times if you apply the effect to an array of 3 paragraphs. Defaults to no action.  
**Type:** Function  
**Params:** ```argument``` - the element being targeted.  
**Default:** n/a  
**Required:** No.

#### ```afterEach```
**Purpose:** This callback allows you to add a user defined function which will fire immediately *after* the scrambling animation ends. This applies to each element e.g. it will fire 3 times if you apply the effect to an array of 3 paragraphs. Defaults to no action.  
**Type:** Function  
**Params:** ```argument``` - the element being targeted.  
**Default:** n/a  
**Required:** No.

#### ```beforeAll```
**Purpose:** This callback allows you to add a user defined function which will fire immediately *before* all of the the scrambling animations begins. This applies to the Scramble instance e.g. it will fire only once (before the animations start) if you apply the effect to an array of 3 paragraphs. Defaults to no action.  
**Type:** Function  
**Params:** ```argument``` - the element(s) being targeted.  
**Default:** n/a  
**Required:** No.

#### ```afterAll```
**Purpose:** This callback allows you to add a user defined function which will fire immediately *after* all of the scrambling animations end. This applies to the Scramble instance e.g. it will fire only once (after all animations have completed) if you apply the effect to an array of 3 paragraphs. Defaults to no action.  
**Type:** Function  
**Params:** ```argument``` - the element(s) being targeted.  
**Default:** n/a  
**Required:** No.

#### ```errorHandler```
**Purpose:** This callback allows you to add a custom error handler function which will fire if one of the promises wrapping the main Scrambler function is rejected. Defaults to no action.  
**Type:** Function  
**Params:** ```argument``` - the error message (if relevant).  
**Default:** n/a  
**Required:** No.

#### Example
```
Scrambler({
  target: '#scramble-id',
  random: [1000, 12000],
  speed: 100,
  text: 'Hello World',
  beforeEach: function(element) {
    console.log(`${element} about to scramble`);
  },
  afterAll: function(elements) {
    console.log('all done!');
  }
});
```

#### Warnings:
- Certain fonts with wide and variable letter widths can cause issues with the text wrapping onto a new line while scrambling. This is usually undesirable, but can be avoided by using css to prevent the wrap, force a max width or slightly reduce the text size whilst scrambling (you can target the attribute `data-scramble-active` or the class `scrambling` which are both applied during the animation). You can also access the `beforeEach`, `beforeAll`, `afterEach` and `afterAll` callbacks to apply/remove classes etc. where necessary. This is envisioned as a JS library decoupled from the user's CSS, so a styling solution is not baked in.
- Scrambler will temporarily lose unique styling from text within child nodes e.g. link tags within a paragraph. This will be replaced at the end of the cycle but can result in FOUC. This is planned to be addressed later, but best practice is to be more granular in your targeting.

#### To-do:
- 100% test coverage
- Better handling of nested tags?
- requestAnimationFrame instead of setInterval?
