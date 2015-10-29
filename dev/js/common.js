$(document).ready(function () {
    var quote = _data['quotes'][rnd(0, _data['quotes'].length)];
    $("#quote-div p").html(quote.txt);
    $("#quote-div span").html("- " + quote.author);
});

function rnd(min, max) {
    var rand = min + Math.random() * (max - min)
    rand = Math.round(rand);
    return rand;
}