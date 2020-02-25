//  estrai 16 numeri casuali da 1 a 100
// chiedi all'utente, un numero alla volta, da 1 a 100
// se il numero è presente nei 16 estratti perdi il gioco
// se non lo è si continua a chiedere un numero
// la partita termina se l'utente digita un numero "vietato"
// la partita termina se l'utente digita tutti e 84 i numeri validi
// il gioco deve riportare il punteggio, cioè il totale di numeri validi digitati
var mine = [];
var numeriUtente = [];
var punteggio = 0;



for (var i = 0; mine.length < 16; i++) {
    var mina = generaRandom(1, 100);
    if (!mine.includes(mina)) {
        mine.push(mina);
    }
}
console.log(mine);


for (var i = 0; numeriUtente.length < 85; i++) {
    var numeroUtente = parseInt(prompt("Inserisci un numero da 1 a 100"));
    if (mine.includes(numeroUtente)) {
        alert("Hai colpito una mina! Game Over! Hai totalizzato " + punteggio + " punti");
        break;
    } else if (numeriUtente.includes(numeroUtente)) {
        alert("Numero già inserito, scrivine un altro");
        i--;
    } else {
        numeriUtente.push(numeroUtente);
        punteggio += 1;
        console.log(numeriUtente);
    }
    if (i + 1 == 100 - mine.length) {
        console.log("Complimenti, hai completato il gioco! Hai ottenuto " + punteggio + " punti, il massimo!");
        alert("Complimenti, hai completato il gioco! Hai ottenuto " + punteggio + " punti, il massimo!");
        break;
    }
}



function generaRandom(min, max) {
    numeroRandom = Math.floor(Math.random() * (max - min + 1)) + min;
    return numeroRandom;
}
