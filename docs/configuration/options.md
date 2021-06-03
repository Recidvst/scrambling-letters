
### Options

> You can configure your Scrambler instance by passing an object. The available options are as follows:

## ```target```

**Purpose:** This is the text you wish to Scramble! Pass a selector or data attribute (or anything else valid for document.querySelectorAll).

**Type:** `String`

**Default:** `'[data-scrambler]'`

**Required:** **Yes**.

**Example:** `{ target: '#scramble-id' }`

## ```random```

**Purpose:** This controls the randomised time in milliseconds before each letter returns to its original state. The first value is the minimum delay and the second value is the maximum. E.g. changing [1000, 3000] to [1000, 9000] would increase the maximum time. Set both to the same value to make all letters finish together. This also controls the maximum time the animation will take e.g. if you want the animation to take 3 seconds then set both to 3000.

**Type:** `Array (ms)`  

**Default:** `[1000, 3000]`

**Required:** No.

**Example:** `{ random: '[750, 2000] }`

## ```speed```

**Purpose:** This controls the speed at which the letters will change. I would advise leaving it at the default 100ms, but you can tweak this value if you desire. This value should be substantially lower than than the length of the animation if it is to look good.

**Type:** `Integer (ms)`

**Default:** `100`  

**Required:** No.  

**Example:** `{ speed: 80 }`

## ```text```

**Purpose:** This lets you specify the end state of the Scrambled text. By default the Scrambler will revert to the original text after animating, but if this option is set then the end state of the text will instead be the specified string. e.g. "Starting Text" -> *scramble* -> "Ending Text".  

**Type:** `String`  

**Default:** The element text  

**Required:** No.

**Example:** `{ text: Secret text }`
