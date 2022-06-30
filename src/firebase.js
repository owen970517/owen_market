import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import "firebase/compat/auth";


var firebaseConfig = {
  apiKey: "AIzaSyCRl4X-UjLH3PUbDRz4qQIDwLQAk7qJ-5M",
  authDomain: "carrot-clone-bdc5d.firebaseapp.com",
  projectId: "carrot-clone-bdc5d",
  storageBucket: "carrot-clone-bdc5d.appspot.com",
  messagingSenderId: "819422656413",
  appId: "1:819422656413:web:74357650c4ad11ddca6174"
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const storage = firebase.storage();
export const auth = firebase.auth();
