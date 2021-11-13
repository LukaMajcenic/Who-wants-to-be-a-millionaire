import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

class Config
{
    piKey: string = "AIzaSyCK11zrRA4lzJ3BWNyVKwwA6F5qnmbTbgI";
    authDomain: string = "wwtbam-app.firebaseapp.com";
    databaseURL: string = "https://wwtbam-app-default-rtdb.europe-west1.firebasedatabase.app";
    projectId: string = "wwtbam-app";
    storageBucket: string = "wwtbam-app.appspot.com";
    messagingSenderId: string = "467454346314";
    appId: string = "1:467454346314:web:e36c907d9b79be28efd2b3";
    measurementId: string = "G-DYWZM19BP9";
}

const config = new Config();

function initFirebase(): void {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
}

initFirebase();

export { firebase };