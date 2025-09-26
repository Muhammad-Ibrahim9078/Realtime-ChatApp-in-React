import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";




const firebaseConfig = {
  apiKey: "AIzaSyA2GUf5cKBnCg8tqgNWRb2FHDQLumlqN1w",
  authDomain: "mini-project-ec567.firebaseapp.com",
  projectId: "mini-project-ec567",
  storageBucket: "mini-project-ec567.firebasestorage.app",
  messagingSenderId: "255447415840",
  appId: "1:255447415840:web:c18f046ded80880fe09045",
  measurementId: "G-7YHX14VYG4"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
