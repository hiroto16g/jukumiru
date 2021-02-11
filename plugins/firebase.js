/* ----------------------------------------------------
    Firebase接続情報
---------------------------------------------------- */

import firebase from "firebase/app";
import 'firebase/storage';
import "firebase/auth";
import "firebase/functions";

// モード（"1"：本番環境、"2"：開発環境）
var env_mode = "2";

// 本番環境
var firebaseConfigRelease = {
    apiKey: 'AIzaSyALF5jdWVPcvSXGyNPnM6JQZ-YinF4Y41E',
    authDomain: "juku-demo.firebaseapp.com",
    databaseURL: "https://juku-demo.firebaseio.com",
    storageBucket: 'juku-demo.appspot.com',
};

// 開発環境
const serviceAccount = require("./serviceAccountKey.json");
var firebaseConfigDevelop = {
    apiKey: 'AIzaSyBlXfpt-FtKLQ8a0j3bWokuICto5q_Q2Gw',
    authDomain: "jukumiru-develop.firebaseapp.com",
    databaseURL: "https://juku-demo.firebaseio.com",    //本番と同じ
    storageBucket: 'jukumiru-develop.appspot.com', 
    projectId: "jukumiru-develop",
};

var firebaseConfig = {};
if(env_mode == "1"){
    firebaseConfig = firebaseConfigRelease;
}else if(env_mode == "2"){
    firebaseConfig = firebaseConfigDevelop;
}else{
}
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase
