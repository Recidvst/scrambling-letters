
### Callbacks

> You can configure your Scrambler instance by passing an object. The available callbacks are as follows:

## ```beforeEach```

**Purpose:** This callback allows you to add a user defined function which will fire immediately *before* the scrambling animation begins. This applies to each element e.g. it will fire 3 times if you apply the effect to an array of 3 paragraphs. Defaults to no action.  

**Type:** `Function`  

**Params:** ```element``` - the element being targeted.

**Default:** n/a  

**Required:** No.

**Example:**

```js
  beforeEach: function(element) {
    console.log(`${element} about to scramble`);
  },
```

## ```afterEach```

**Purpose:** This callback allows you to add a user defined function which will fire immediately *after* the scrambling animation ends. This applies to each element e.g. it will fire 3 times if you apply the effect to an array of 3 paragraphs. Defaults to no action.  

**Type:** `Function`  

**Params:** ```element``` - the element being targeted.  

**Default:** n/a  

**Required:** No.

**Example:**

```js
  afterEach: function(element) {
    console.log(`${element} finished scrambling`);
  },
```

## ```beforeAll```

**Purpose:** This callback allows you to add a user defined function which will fire immediately *before* all of the the scrambling animations begins. This applies to the Scramble instance e.g. it will fire only once (before the animations start) if you apply the effect to an array of 3 paragraphs. Defaults to no action.  

**Type:** `Function`  

**Params:** ```element``` - the element(s) being targeted.  

**Default:** n/a  

**Required:** No.

```js
  beforeAll: function() {
    document.querySelector(`.scrambling-text`).classList.remove('hidden');
  },
```

## ```afterAll```

**Purpose:** This callback allows you to add a user defined function which will fire immediately *after* all of the scrambling animations end. This applies to the Scramble instance e.g. it will fire only once (after all animations have completed) if you apply the effect to an array of 3 paragraphs. Defaults to no action.  

**Type:** `Function`  

**Params:** ```element``` - the element(s) being targeted.  

**Default:** n/a  

**Required:** No.

```js
  afterAll: function() {
    console.log(`All done!`);
  },
```

## ```errorHandler```

**Purpose:** This callback allows you to add a custom error handler function which will fire if one of the promises wrapping the main Scrambler function is rejected. Defaults to no action.

**Type:** `Function`  

**Params:** ```element``` - the error message (if relevant).

**Default:** n/a  

**Required:** No.

```js
  errorHandler: function(e) {
    console.log('error', e);
  }
```
