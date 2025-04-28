import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc, setDoc, collection, getDocs } from "firebase/firestore"; // Додаємо collection і getDocs
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAaNzr45LoQ9xQP0R43-sSFnfOaVlJ-D54",
  authDomain: "course-project-92f57.firebaseapp.com",
  projectId: "course-project-92f57",
  storageBucket: "course-project-92f57.appspot.com",
  messagingSenderId: "974573701809",
  appId: "1:974573701809:web:8fd073d1314eebb5f17090",
  measurementId: "G-CDWP9GM1KW",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { auth, db, storage, doc, getDoc, updateDoc, setDoc, collection, getDocs }; // Додаємо нові експортовані функції
