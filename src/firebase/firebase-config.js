import "firebase/firestore";
import "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgXd1IKBX8QtcxPfPQbXVRm8P29dJh_NM",
  authDomain: "react-app-fh-ca0ad.firebaseapp.com",
  projectId: "react-app-fh-ca0ad",
  storageBucket: "react-app-fh-ca0ad.appspot.com",
  messagingSenderId: "349643864380",
  appId: "1:349643864380:web:8b6e9613de37472c8ac639",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

const googleAuthProvider = new GoogleAuthProvider();

export { db, googleAuthProvider, app };
