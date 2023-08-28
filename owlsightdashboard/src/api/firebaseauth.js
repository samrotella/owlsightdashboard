import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection } from 'firebase/firestore'
// ... other firebase imports

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
    storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGE_SENDER_ID,
    appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID
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