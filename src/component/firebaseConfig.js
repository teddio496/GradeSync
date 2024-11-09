import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBC5EqqRFFpEPsWz9Vqz2Ir_gPK1AGzDQQ",
  authDomain: "grade-sync-a17e5.firebaseapp.com",
  projectId: "grade-sync-a17e5",
  storageBucket: "grade-sync-a17e5.appspot.com",
  messagingSenderId: "211799778124",
  appId: "1:211799778124:web:c9af3d1300c88ea9bda5e9",
  measurementId: "G-FLYWNY1PKG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut };