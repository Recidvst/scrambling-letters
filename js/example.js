Scrambler({
    target: '[data-title-scrambler]',
    random: [1000, 30000],
    speed: 100
});

Scrambler('p:not(.no-scramble), ul:not(.no-scramble) li');

Scrambler({
    target: '#scramble-text-id',
    random: [1000, 30000],
    speed: 100
});


var buttonT = document.querySelector("#scramble-title-button");
var buttonP = document.querySelector("#scramble-paragraph-button");
var buttonN = document.querySelector("#scramble-paragraph-new");
buttonT.addEventListener('click', function (e) {
    Scrambler('[data-title-scrambler]');
    Scrambler({
        target: '#scramble-text-id',
        random: [1000, 30000],
        speed: 100
    });
});
buttonP.addEventListener('click', function (e) {
    Scrambler('p:not(.no-scramble), ul:not(.no-scramble) li, h3:not(.no-scramble)');
});
buttonN.addEventListener('click', function (e) {
    Scrambler({
        target: '[data-title-scrambler]',
        random: [1000, 30000],
        speed: 100,
        text: 'Secret message'
    });
});

