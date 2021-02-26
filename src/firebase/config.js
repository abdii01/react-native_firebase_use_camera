import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyAheEnMYeYv3wyGerXJLr3BWDlafMnqbzY",
    authDomain: "appl-dec3a.firebaseapp.com",
    projectId: "appl-dec3a",
    storageBucket: "appl-dec3a.appspot.com",
    messagingSenderId: "368449066025",
    appId: "1:368449066025:web:7b212508e983f43877b838",
    measurementId: "G-J7GGH2ZJ9X"
  };
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };