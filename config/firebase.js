import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCawrs25YbqDtLuMwTghy8mj8VRa0sQP7A",
  authDomain: "assignment03-c9f3e.firebaseapp.com",
  projectId: "assignment03-c9f3e",
  storageBucket: "assignment03-c9f3e.appspot.com",
  messagingSenderId: "827689629418",
  appId: "1:827689629418:web:d0038f68a06c36c5418993"
};

const app = firebase.initializeApp(firebaseConfig);
export const db = app.firestore();
