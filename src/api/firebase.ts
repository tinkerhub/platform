// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "@firebase/auth";
import {getFirestore} from "@firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB8bzkCM0zRTl82s-XHmJKM5i5uCClUFmQ",
  authDomain: "tinkerhub-foundation.firebaseapp.com",
  projectId: "tinkerhub-foundation",
  storageBucket: "tinkerhub-foundation.appspot.com",
  messagingSenderId: "861369257179",
  appId: "1:861369257179:web:d0b060eb50c519bbe8d0fe",
  measurementId: "G-CEWBJZ8E7W"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
