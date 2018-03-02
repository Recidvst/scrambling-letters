((Scrambler) => { 	
	// utility fn to get a random character 
	const randomChar = function() {
		return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 1);
	}
	// utility fn to get a random delay time 
	const randomTime = function() {
		return 1000 + (Math.random() * (1 - 3000) + 3000);
	}	
	// get scrambler elements, reset btn, init blocker
	const domEls = document.querySelectorAll('[data-scrambler]'); 
	const button = document.querySelector("#scramble-button");
	let prevent = false; 
	
	// main fn
	var scrambleFn = function() {
		// for each scramble element
		domEls.forEach(function (element, which) {
			let truth = element.textContent.split(''); // get letters
			let newLetters = element.textContent.split('');
			let revert = []; // init empty kill switch array		
			
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
						prevent = false; // allow fn to be restarted
						button.disabled = false;
					};
			}, 100);
			
		}); // end forEach
	}; // end main
	scrambleFn();
	
	button.addEventListener('click', function(e) {
		if ( prevent === false ) { // if loop not in progress
			scrambleFn();
		}
		prevent = true; // loop blocked
		button.disabled = true;
	});
	
})();