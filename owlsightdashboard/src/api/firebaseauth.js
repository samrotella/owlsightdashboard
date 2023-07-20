import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection } from 'firebase/firestore'
// ... other firebase imports

const firebaseConfig = {
    apiKey: "AIzaSyAsc58XOLjRIcdGZvnXj0GO6ZjA_s66plM",
    authDomain: "owlsightanalytics-ee53e.firebaseapp.com",
    projectId: "owlsightanalytics-ee53e",
    storageBucket: "owlsightanalytics-ee53e.appspot.com",
    messagingSenderId: "69999280009",
    appId: "1:69999280009:web:c4336ae19bb02068f06b58",
    measurementId: "G-7SYKMZZCDY"
  };
  const app = initializeApp(firebaseConfig);

  export const firebaseAuth = {
    auth: getAuth(app),
    onAuthStateChanged: onAuthStateChanged,
    signInWithEmailAndPassword: signInWithEmailAndPassword,
    sendPasswordResetEmail: sendPasswordResetEmail,
    signOut: signOut,
    createUserWithEmailAndPassword: createUserWithEmailAndPassword
  };