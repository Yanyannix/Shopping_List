import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFH5r95PLdIS_HEXwQxdGtyYd8AnlOTTU",
  authDomain: "shopping-79813.firebaseapp.com",
  projectId: "shopping-79813",
  storageBucket: "shopping-79813.firebasestorage.app",
  messagingSenderId: "470891242198",
  appId: "1:470891242198:web:834a858c57f8ccb3829f77"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, updateDoc, deleteDoc };
  