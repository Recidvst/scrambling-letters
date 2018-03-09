
// Scrambler();

Scrambler('[data-scrambler-h1]');

Scrambler('.scramble-text-class');

Scrambler({
    target: '#scramble-text-id',
    random: [2000, 50000],
    speed: 50
});


var button = document.querySelector("#scramble-button");
button.addEventListener('click', function(e) {
    Scrambler('[data-scrambler]');
});

