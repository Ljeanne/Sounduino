// Initialize Firebase

var config = {
    apiKey: "AIzaSyAB79hED7vhhYjXSnVqIW2TqxHYpjoBZXM",
    authDomain: "ardouino-64b6a.firebaseapp.com",
    databaseURL: "https://ardouino-64b6a.firebaseio.com",
    storageBucket: "ardouino-64b6a.appspot.com",
    messagingSenderId: "716484623577"
};
firebase.initializeApp(config);


var lastNote = firebase.database().ref('lastNote/');
lastNote.on('value',function (snap) {
    let res = snap.val().last;

    $("p").html(res);
    console.log(res);
});