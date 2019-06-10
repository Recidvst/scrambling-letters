
[![npm](https://img.shields.io/npm/dt/scrambling-letters.svg)]()
[![npm](https://img.shields.io/npm/v/scrambling-letters.svg)]()
[![Travis (.com)](https://img.shields.io/travis/com/Recidvst/scrambling-letters.svg)]()
[![Coverage Status](https://coveralls.io/repos/github/Recidvst/scrambling-letters/badge.svg?branch=master)](https://coveralls.io/github/Recidvst/scrambling-letters?branch=master)
[![license](https://img.shields.io/github/license/recidvst/scrambling-letters.svg)]()

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
You can configure your Scrambler instance by passing an object. The available options are as follows:

#### Target
**Purpose:** This is the text you wish to Scramble! Pass a selector or data attribute (or anything else valid for document.querySelectorAll).    
**Type:** String  
**Default:** '[data-scrambler]'  
**Required:** Yes.
#### Random
**Purpose:** This controls the randomised time before each letter returns to its original state. The first value is the minimum delay and the second value is the maximum. E.g. changing [1000, 3000] to [1000, 9000] would increase the maximum time.  
**Type:** Array
**Default:** [1000, 3000]  
**Required:** No.
#### Speed
**Purpose:** This controls the speed a which the letters will change. I would advise leaving it at the default 100, but you can tweak this value if you desire.  
**Type:** Integer  
**Default:** 100  
**Required:** No.  
#### Text
**Purpose:** This lets you specify the end state of the Scrambled text. By default the Scrambler will revert to the original text after animating, but if this option is set then the end state of the text will instead be the specified string. e.g. "Starting Text" -> *scramble* -> "Ending Text".
**Type:** String  
**Default:** The element text  
**Required:** No.

#### Example
```
Scrambler({
  target: '#scramble-id',
  random: [1000, 12000],
  speed: 100,
  text: 'Hello World'
});
```

#### Warnings:
- Certain fonts with wide and variable letter widths can cause issues with the text wrapping onto a new line while scrambling. This is usually undesirable, but can be avoided by using css to prevent the wrap, force a max width or slightly reduce the text size whilst scrambling (you can target the attribute `data-scramble-active` or the class `scrambling` which are both applied during the animation). This is envisioned as a JS library decoupled from the user's CSS, so a solution is not baked in.
- Scrambler will temporarily lose unique styling from text within child nodes e.g. link tags within a paragraph. This will be replaced at the end of the cycle but can result in FOUC. This is planned to be addressed later, but best practice is to be more granular in your targeting.

#### To-do:
- 100% test coverage
- Better handling of nested tags?
- requestAnimationFrame instead of setInterval?
