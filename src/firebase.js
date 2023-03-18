import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD8FSTPC8rsfYkzkjbGgK9N17QKb4cTNek",
    authDomain: "message-board-6af16.firebaseapp.com",
    projectId: "message-board-6af16",
    storageBucket: "message-board-6af16.appspot.com",
    messagingSenderId: "398490988339",
    appId: "1:398490988339:web:010f8f37fa7376f52dd846"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth(); // Authentication service
export const firestore = firebase.firestore(); // Cloud Firestore service