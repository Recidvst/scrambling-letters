
// Scrambler();

Scrambler('[data-scrambler-h1]');

Scrambler('.scramble-text-class');

Scrambler({
    target: '#scramble-text-id',
    random: [1000, 30000],
    speed: 100
});


var button = document.querySelector("#scramble-button");
button.addEventListener('click', function(e) {
    Scrambler('[data-scrambler]');
});

