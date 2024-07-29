// src/lib/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKUTSJF1a48blZ7gGXku_Sbt2fYp38Hdw",
  authDomain: "estesi-86075.firebaseapp.com",
  projectId: "estesi-86075",
  storageBucket: "estesi-86075.appspot.com",
  messagingSenderId: "234470304310",
  appId: "1:234470304310:web:8073e17a3bea5b85594697",
  measurementId: "G-RN1TGPX4TK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
export { signOut };
