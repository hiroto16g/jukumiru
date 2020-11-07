import firebase from "firebase/app";
import 'firebase/storage';

var firebaseConfig = {
    apiKey: 'AIzaSyALF5jdWVPcvSXGyNPnM6JQZ-YinF4Y41E',
    authDomain: "juku-demo.firebaseapp.com",
    databaseURL: "https://juku-demo.firebaseio.com",
    storageBucket: 'juku-demo.appspot.com'
};

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase