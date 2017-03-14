var five = require("johnny-five");
var temporal = require("temporal");
var board = new five.Board();
var firebase = require("firebase");
var Player = require("player");
var events = require("events");
var eventEmitter = new events.EventEmitter();
eventEmitter.setMaxListeners(0);

// Valeur precedente, servira pour detecter l etat de la led du detecteur
var prec_alpha = 0;
var prec_beta = 0;
var prec_gamma = 0;
var prec_delta = 0;
var prec_epsilon = 0;

var music_do = new Player("sons/do.mp3");
var music_re = new Player("sons/re.mp3");
var music_mi = new Player("sons/mi.mp3");
var music_fa = new Player("sons/fa.mp3");
var music_mhd = new Player("sons/MHD - AFRO TRAP Part.8 (Never).mp3");

var config = {
    apiKey: "AIzaSyAB79hED7vhhYjXSnVqIW2TqxHYpjoBZXM",
    authDomain: "ardouino-64b6a.firebaseapp.com",
    databaseURL: "https://ardouino-64b6a.firebaseio.com",
    storageBucket: "ardouino-64b6a.appspot.com",
    messagingSenderId: "716484623577"
};
firebase.initializeApp(config);

/**
 * WRITE IN FIREBASE
 */

function writeLastNote(lNote) {
    firebase.database().ref('lastNote/').set({
        last : lNote
    })
}

/**
 * END
 */

/**
 * Initiation des sons
 */
eventEmitter.on('do_son',function () {
    music_do
        .on('playing', function() {
            console.log('I\'m playing... ');
        })
        .on('playend', function() {
            console.log('Play done, Switching to next one ...');
        })
        .on('error', function(err) {
            console.log('Error');
            console.log(err);
        })
        .play(function(err, player){
            console.log('playend!');
            console.log(err);
        });
});

eventEmitter.on('re_son',function () {
    music_re
        .on('playing', function() {
            console.log('I\'m playing... ');
        })
        .on('playend', function() {
            console.log('Play done, Switching to next one ...');
        })
        .on('error', function(err) {
            console.log('Error');
            console.log(err);
        })
        .play(function(err, player){
            console.log('playend!');
            console.log(err);
        });
});

eventEmitter.on('mi_son',function () {
    music_mi
        .on('playing', function() {
            console.log('I\'m playing... ');
        })
        .on('playend', function() {
            console.log('Play done, Switching to next one ...');
        })
        .on('error', function(err) {
            console.log('Error');
            console.log(err);
        })
        .play(function(err, player){
            console.log('playend!');
            console.log(err);
        });
});

eventEmitter.on('fa_son',function () {
    music_fa
        .on('playing', function() {
            console.log('I\'m playing... ');
        })
        .on('playend', function() {
            console.log('Play done, Switching to next one ...');
        })
        .on('error', function(err) {
            console.log('Error');
            console.log(err);
        })
        .play(function(err, player){
            console.log('playend!');
            console.log(err);
        });
});

eventEmitter.on('mhd_son',function () {
    music_mhd
        .on('playing', function() {
            console.log('I\'m playing... ');
        })
        .on('playend', function() {
            console.log('Play done, Switching to next one ...');
        })
        .on('error', function(err) {
            console.log('Error');
            console.log(err);
        })
        .play(function(err, player){
            console.log('playend!');
            console.log(err);
        });
});

/**
 * Connection à au ardouino, et attente d'evenement
 */


board.on("ready", function() {
    console.log('Board is ready');

    // Ports sur lesquelles on écoute
    this.pinMode(3, five.Pin.INPUT);
    this.pinMode(5, five.Pin.INPUT);
    this.pinMode(6, five.Pin.INPUT);
    this.pinMode(7, five.Pin.INPUT);
    this.pinMode(8, five.Pin.INPUT);

    // boucle qui questionne les ports sur les evenements toutes les 500ms
    temporal.loop(500, function () {
        // console.log('rien');
        //Il ne se passe rien pour l'instant

        //NOTE DO
        board.digitalRead(3, function (val) {
            // Si la valeur de detection est positive, et que la valeur precedente est nulle
            //detecte mouvement
            if(val == 1 && prec_alpha == 0){
                // valeur precedente = valeur actuelle
                prec_alpha = val;
            }

            // si val valeur precedente = 1 et valeur actuel est 1
            //detecte fin du mouvement
            if(prec_alpha == 1 && val == 0){
                music_do.stop();
                music_re.stop();
                music_mi.stop();
                music_fa.stop();
                music_mhd.stop();
                console.log("ALPHA");
                eventEmitter.emit('do_son');
                writeLastNote('DO');
                prec_alpha = 0;
            }
        });


        //NOTE RE
        board.digitalRead(5, function (val) {
            if(val == 1 && prec_beta == 0){
                prec_beta = val;
            }

            if(prec_beta == 1 && val == 0){
                music_do.stop();
                music_re.stop();
                music_mi.stop();
                music_fa.stop();
                music_mhd.stop();
                console.log("BETA");
                eventEmitter.emit('re_son');
                writeLastNote('RE');
                prec_beta = 0;
            }
        });


        //NOTE MI
        board.digitalRead(6, function (val) {
            if(val == 1 && prec_gamma == 0){
                prec_gamma = val;
            }

            if(prec_gamma == 1 && val == 0){
                music_do.stop();
                music_re.stop();
                music_mi.stop();
                music_fa.stop();
                music_mhd.stop();
                console.log("GAMMA");
                eventEmitter.emit('mi_son');
                writeLastNote('MI');
                prec_gamma = 0;
            }
        });

        //NOTE FA
        board.digitalRead(7, function (val) {
            if(val == 1 && prec_delta == 0){
                prec_delta = val;
            }

            if(prec_delta == 1 && val == 0){
                music_do.stop();
                music_re.stop();
                music_mi.stop();
                music_fa.stop();
                music_mhd.stop();
                console.log("DELTA");
                eventEmitter.emit('fa_son');
                writeLastNote('FA');
                prec_delta = 0;
            }
        });

        //NOTE MHD
        board.digitalRead(8, function (val) {
            if(val == 1 && prec_epsilon == 0){
                prec_epsilon = val;
            }

            if(prec_epsilon == 1 && val == 0){
                music_do.stop();
                music_re.stop();
                music_mi.stop();
                music_fa.stop();
                music_mhd.stop();
                console.log("EPSILON");
                eventEmitter.emit('mhd_son');
                writeLastNote('MHD-NEVER');
                prec_epsilon = 0;
            }
        });
    });


    // __________ PREMIERE VERSION
    //
    // temporal.loop((500), function () {
    //     board.digitalRead(3, function (value) {
    //         if(value == 1){
    //                 // console.log('   ALPHA: '+value);
    //                 // var starCountRef = firebase.database().ref('visite');
    //                 // starCountRef.once('value', function(snapshot) {
    //                 //     res = snapshot.val().nombreVisite;
    //                 // });
        //             console.log(value);
    //         }
    //      });
    //
    //
    //     board.digitalRead(5, function (value2) {
    //         if(value2 == 1){
    //             // console.log('BETA: '+ value2);
    //             // var starCountRef = firebase.database().ref('timer');
    //             // starCountRef.once('value', function(snapshot) {
    //             //     console.log(snapshot.val().temps);
    //             // });
    //             console.log(value2);
    //         }
    //     });
    //
    //
    // });
});


