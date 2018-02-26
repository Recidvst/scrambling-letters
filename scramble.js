// in progresss
// TODO - reset button functionality - to scramble again + improve code.

((Scrambler) => { 	
	// utility fn to get a random character 
	const randomChar = function() {
		return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 1);
	}
	// utility fn to get a random delay time 
	const randomTime = function() {
		return 2000 + (Math.random() * (10 - 4000) + 4000);
	}	
	// get scrambler elements
	const domEls = document.querySelectorAll('[data-scrambler]'); 
	// main fn
	var scrambleFn = function() {
		// for each scramble element
		domEls.forEach(function (element, which) {
			let truth = element.textContent.split(''); // get letters
			let newLetters = element.textContent.split('');
			let revert = []; // init empty kill switch array		
			
			setInterval( function() { 
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
						}
						// set html
						element.textContent = newLetters.join('');
					});
			}, 100);
			
		}); // end forEach
	}; // end main
	scrambleFn();
	
	// const button = document.querySelector("#scramble-button");
	// button.addEventListener('click', function(event) {
	// 	scrambleFn();
	// });
	
})();