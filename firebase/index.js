import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
 import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDFH5r95PLdIS_HEXwQxdGtyYd8AnlOTTU",
  authDomain: "shopping-79813.firebaseapp.com",
  projectId: "shopping-79813",
  storageBucket: "shopping-79813.firebasestorage.app",
  messagingSenderId: "470891242198",
  appId: "1:470891242198:web:834a858c57f8ccb3829f77"
};

const app = initializeApp(firebaseConfig);

// DB + AUTH
const db = getFirestore(app);
const auth = getAuth(app);

export {
  db,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
};
