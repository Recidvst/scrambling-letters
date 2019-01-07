'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var Scrambler = function Scrambler(scrambleArgs) {
	try {
		// call action fn

		var scrambleFire = function scrambleFire(scrambleArgs) {
			// remember, hoisted
			// get chosen scramble items
			var scramble = passedAsObject ? [].concat(_toConsumableArray(document.querySelectorAll(scrambleArgs.target))) : [].concat(_toConsumableArray(document.querySelectorAll(scrambleArgs)));

			// for each scramble element
			scramble.forEach(function (element, which) {

				if (element.getAttribute('data-scramble-active') !== 'true') {
					element.setAttribute('data-scramble-active', 'true');

					var truth = element.textContent.split(''); // get letters
					var truthHTML = element.innerHTML; // get html
					var newLetters = element.textContent.split('');
					var revert = []; // init empty kill switch array	
					var speed = scrambleArgs.speed ? scrambleArgs.speed : 100;

					var ticker = setInterval(function () {
						// map over letters and replace with random or revert back to truth
						truth.map(function (letter, i) {
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
						var killCheck = newLetters.length == truth.length && newLetters.every(function (e, i) {
							return e === truth[i];
						});
						if (killCheck) {
							element.innerHTML = truthHTML;
							clearInterval(ticker); // stop looping
							element.setAttribute('data-scramble-active', 'false');
						};
					}, speed); // end ticker
				} // end check for active
			}); // end forEach
		};

		/*** helper functions ***/
		// utility fn to get a random character 
		var randomChar = function randomChar() {
			return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 1);
		};
		// object test
		var isObject = function isObject(a) {
			return !!a && a.constructor === Object;
		};
		// did the user pass an object as an argument?
		var passedAsObject = isObject(scrambleArgs) || (typeof scrambleArgs === 'undefined' ? 'undefined' : _typeof(scrambleArgs)) == 'object';
		// set function default arguments if it was an object
		if (passedAsObject) {
			scrambleArgs.target = typeof scrambleArgs.target !== 'undefined' && passedAsObject ? scrambleArgs.target : '[data-scrambler]';
			scrambleArgs.random = typeof scrambleArgs.random !== 'undefined' && passedAsObject ? scrambleArgs.random : [1000, 3000];
			scrambleArgs.speed = typeof scrambleArgs.speed !== 'undefined' && passedAsObject ? scrambleArgs.speed : 100;
		}
		// utility fn to get a random delay time 
		var randomTime = function randomTime() {
			if (passedAsObject) {
				return scrambleArgs.random[0] + (Math.random() * (1 - scrambleArgs.random[1]) + scrambleArgs.random[1]);
			}
			return 1000 + (Math.random() * (1 - 3000) + 3000);
		};

		scrambleFire(scrambleArgs);; // end scrambleFire
	} catch (e) {
		console.trace('%cuh-oh: %c' + e + '', 'color:indianred;', 'color:cornflowerblue;');
	}
}; // end Scrambler
