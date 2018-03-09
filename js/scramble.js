var Scrambler = (function () {	
	
	// main fn - exposed to window
	const scramble = function(scrambleArgs) {
		try {
			var prevent = false;
			/*** helper functions ***/
			// utility fn to get a random character 
			const randomChar = function() {
				return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 1);
			}
			// object test
			const isObject = function(a) {
				return (!!a) && (a.constructor === Object);
			};
			// did the user pass an object as an argument?
			let passedAsObject = (isObject(scrambleArgs) || typeof scrambleArgs == 'object');
			// set function default arguments if it was an object
			if ( passedAsObject ) { 
				scrambleArgs.target = ( typeof scrambleArgs.target !== 'undefined' && ( passedAsObject ) ) ? scrambleArgs.target : '[data-scrambler]';
				scrambleArgs.random = ( typeof scrambleArgs.random !== 'undefined' && ( passedAsObject ) ) ? scrambleArgs.random : [1000, 3000];
				scrambleArgs.speed = ( typeof scrambleArgs.speed !== 'undefined' && ( passedAsObject ) ) ? scrambleArgs.speed : 100;
			}
			// utility fn to get a random delay time 
			const randomTime = function() {
				if ( passedAsObject ) {
					return scrambleArgs.random[0] + (Math.random() * (1 - scrambleArgs.random[1]) + scrambleArgs.random[1]);
				}
				return 1000 + (Math.random() * (1 - 3000) + 3000);
			}	

			scrambleFire(scrambleArgs); // call action fn

			function scrambleFire ( scrambleArgs ) { // remember, hoisted
					// get chosen scramble items
					var scramble = ( passedAsObject ) ? [...document.querySelectorAll(scrambleArgs.target)] : [...document.querySelectorAll(scrambleArgs)] ;

					// for each scramble element
					scramble.forEach(function (element, which) {

						if ( element.getAttribute('data-scramble-active') !== 'true' ) {
							element.setAttribute('data-scramble-active','true');

							let truth = element.textContent.split(''); // get letters
							let newLetters = element.textContent.split('');
							let revert = []; // init empty kill switch array	
							let speed = (scrambleArgs.speed) ? scrambleArgs.speed : 100 ;

							const ticker = setInterval( function() { 
								// map over letters and replace with random or revert back to truth
								truth.map( (letter, i) => {
									// break if a space
									if (' \t\n\r\v'.indexOf(letter) > -1) return; 
									// set new random letter
									newLetters[i] = randomChar();
									// set random timeout to make letters reset at different times
									setTimeout( function() { 
										revert[i] = true; 
									}, randomTime() );
									// reset individual letter if kill switch
									if ( revert[i] === true ) {
											newLetters[i] = truth[i];
									};
									// set html
									element.textContent = newLetters.join('');
								});
								
								// kill interval after all letter returned to normal to save stack
									let killCheck = (newLetters.length == truth.length) && newLetters.every(function(e, i) {
										return e === truth[i]; 
									});
									if ( killCheck ) {
										clearInterval(ticker); // stop looping
										element.setAttribute('data-scramble-active','false');
									};
							}, speed); // end ticker

						} // end check for active

					}); // end forEach
			}; // end scrambleFire
		} catch(e) {
			console.trace('%cuh-oh: %c' + e + '','color:indianred;','color:cornflowerblue;');
		} 
	}; // end Scramble

	return scramble;
	
})();
