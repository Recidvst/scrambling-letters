export const Scrambler = function (scrambleArgs) {
	/*** helper functions ***/
	// utility fn to get a random character 
	const randomChar = function (length) {
		let l = length || 1;
		let r = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, l);
		if (' \t\n\r\v'.indexOf(r) < 0) return r;
	}
	// object test
	const isObject = function (a) {
		return (!!a) && (a.constructor === Object);
	};
	// did the user pass an object as an argument?
	let passedAsObject = (isObject(scrambleArgs) || typeof scrambleArgs == 'object');
	// set function default arguments if it was an object
	if (passedAsObject) {
		scrambleArgs.target = (typeof scrambleArgs.target !== 'undefined' && (passedAsObject)) ? scrambleArgs.target : '[data-scrambler]';
		scrambleArgs.random = (typeof scrambleArgs.random !== 'undefined' && (passedAsObject)) ? scrambleArgs.random : [1000, 3000];
		scrambleArgs.speed = (typeof scrambleArgs.speed !== 'undefined' && (passedAsObject)) ? scrambleArgs.speed : 100;
		scrambleArgs.text = (typeof scrambleArgs.text !== 'undefined' && (passedAsObject)) ? scrambleArgs.text : false;
	}
	// utility fn to get a random delay time 
	const randomTime = function () {
		if (passedAsObject) {
			return scrambleArgs.random[0] + (Math.random() * (1 - scrambleArgs.random[1]) + scrambleArgs.random[1]);
		}
		return 1000 + (Math.random() * (1 - 3000) + 3000);
	}

	scrambleFire(scrambleArgs); // call action fn

	function scrambleFire(scrambleArgs) { // remember, hoisted
		// get chosen scramble items
		const scramble = (passedAsObject) ? [...document.querySelectorAll(scrambleArgs.target)] : [...document.querySelectorAll(scrambleArgs)];

		// for each scramble element
		scramble.forEach(function (element, which) {

			if (element.getAttribute('data-scramble-active') !== 'true') {
				element.setAttribute('data-scramble-active', 'true');

				let truth = element.textContent.split(''); // get letters
				let truthHTML = element.innerHTML; // get html
				let startText = truth;
				let newLetters = element.textContent.split('');
				let revert = []; // init empty kill switch array	
				let speed = (scrambleArgs.speed) ? scrambleArgs.speed : 100;
				let HTMLreset = false;

				// if user defines an ending text string then use that instead of the original text
				const defineEndText = function(end) {
					let endText = end || element.textContent;
					truth = endText.split('');
					newLetters = endText.split('');
					startText = [];
					truth.forEach( (item, index) => {
						if (' \t\n\r\v'.indexOf(truth[index]) > -1) {
							startText.push(' ');
						} else {
							startText.push(randomChar());
						}
					});
					startText = startText;
				}
				// first check passed option and then data-attribute 
				if (scrambleArgs.text && scrambleArgs.text !== "" && (typeof scrambleArgs.text === 'string' || scrambleArgs.text instanceof String) ) {
					defineEndText(scrambleArgs.text);
					HTMLreset = true;
				}
				else if (element.getAttribute('data-scramble-text') && element.getAttribute('data-scramble-text') !== "") {
					defineEndText(element.getAttribute('data-scramble-text'));
					HTMLreset = true;
				}

				const ticker = setInterval(function () {
					// map over letters and replace with random or revert back to truth
					startText.map((letter, i) => {
						// break if a space
						if (' \t\n\r\v'.indexOf(letter) > -1) return;
						// set new random letter
						newLetters[i] = randomChar();
						// set random timeout to make letters reset at different times
						setTimeout(function () {
							revert[i] = true;
						}, randomTime());
						// reset individual letter if kill switch
						if (revert[i] === true) {
							newLetters[i] = truth[i];
						};
						// set html
						element.textContent = newLetters.join('');
					});

					// kill interval after all letter returned to normal to save stack
					let killCheck = (newLetters.length == truth.length) && newLetters.every(function (e, i) {
						return e === truth[i];
					});
					if (killCheck) {
						element.innerHTML = truthHTML;
						if (HTMLreset) {
							let innerContent = element.children[0];
							if (innerContent && innerContent !== "") {
								innerContent.textContent = newLetters.join('');
							}
							else {
								element.textContent = newLetters.join('');
							}
						}
						clearInterval(ticker); // stop looping
						element.setAttribute('data-scramble-active', 'false');
					};
				}, speed); // end ticker

			} // end check for active

		}); // end forEach
	}; // end scrambleFire
}; // end Scramble
