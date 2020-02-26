/* Vecchia versione

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

*/

/* Versione riveduta e corretta CampoMinato
Il computer deve generare 16 numeri casuali tra 1 e 100.
In seguito deve chiedere all’utente di inserire un numero alla volta, sempre compreso tra 1 e 100.
Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all’utente un altro numero.
La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.
BONUS: all’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali.
Con difficoltà 0=> tra 1 e 100, con difficoltà 1 =>  tra 1 e 80, con difficoltà 2=> tra 1 e 50

1. genero 16 numeri random diversi da 1 a 100
    1.1 Creo un array vuoto
    1.2 Inserisco i numeri delle bombe nell'array 1.2.1 Controllo che i numeri siano univoci
2. selezione utente
    2.1 Creo un array vuoto per i tentativi
    2.2 Chiediamo un numero tra 1 e 100
3. Logica del gioco
    -   Ripetizione del NUMERO
        -.1 il numero inserito è incluso nell'array numeri inseriti
    -   Prende una bomba
        -.1 il numero inserito è incluso nell'array delle bombe
    -   Inserire il numero nell'array dei numeri inseriti
    -   Se lunghezza numeri inseriti == numeri senza mine Allora --> "Hai vinto" ES: Numeri senza mine = 100 - 16 = 84 Ovvero Campo - mine
ULTIMO. Gestione errori
    1. Numero >= 1 e numero <= 100
    2. numero deve essere un NUMERO

    val1    val2    &&
    true    true    true
    false   true    false
    true    false   false
    false   false   false

    val1    val2    &&
    1       1       1
    1       0       0
    0       1       0
    0       0       0
*/

// var dimensioneCampo = 100;
var dimensioneCampo = sceltaDifficolta();
var totaleMine = 16;
var bandierineMax = dimensioneCampo - totaleMine;
var posizioneMine = minaIlCampo(dimensioneCampo, totaleMine)
var bandierinePiazzate = [];
var boom = false;

console.log(posizioneMine);

while ((bandierinePiazzate.length < bandierineMax) && (boom === false)) {
    var bandierinaDaPiazzare = parseInt(prompt("Scrivi un numero da 1 a " + dimensioneCampo));
    if (!isNaN(bandierinaDaPiazzare)) {
        if ((bandierinaDaPiazzare >= 1) && (bandierinaDaPiazzare <= dimensioneCampo)) {
            if (!bandierinePiazzate.includes(bandierinaDaPiazzare)) {
                if (!posizioneMine.includes(bandierinaDaPiazzare)) {
                    bandierinePiazzate.push(bandierinaDaPiazzare);
                    if (bandierinePiazzate.length == bandierineMax) {
                        alert("Incredibile hai piazzato tutte le " + bandierineMax + " bandierine! Vai a giocare al Superenalotto!");
                    } else {
                        alert("Bravo, hai piazzato una bandierina, continua a giocare");
                    }
                } else {
                    alert("BOOOM! hai beccato una bomba! Hai piazzato " + bandierinePiazzate.length + " bandierine");
                    boom = true;
                }
            } else {
                alert("Hai già inserito questo numero!")
            }
        } else {
            alert("Devi inserire un numero da 1 a " + dimensioneCampo);
        }
    } else {
        alert("Devi inserire un numero");
    }
}

function sceltaDifficolta() {
    var scelta = parseInt(prompt("Inserisci la difficoltà tra 1, 2 o 3"));
    switch (scelta) {
        case 1:
            var dimCampo = 100;
            break;
        case 2:
            var dimCampo = 80;
            break;
        case 3:
            var dimCampo = 17;
            break;
        default:
        var dimCampo = 100;
    }
    return dimCampo;
}

function minaIlCampo(dimCampo, totMine) {
    var posizMine = [];
    while (posizMine.length < totMine) {
        var minaDaPiazzare = generaRandomMinMax(1, dimensioneCampo);
        if (!posizMine.includes(minaDaPiazzare)) {
            posizMine.push(minaDaPiazzare);
        }
    }
    return posizMine;
}

function generaRandomMinMax(min, max) {
    var numeroRandom = Math.floor(Math.random() * (max - min + 1)) + min;
    return numeroRandom;
}
