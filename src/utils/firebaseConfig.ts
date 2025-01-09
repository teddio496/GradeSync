import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { User } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBC5EqqRFFpEPsWz9Vqz2Ir_gPK1AGzDQQ",
  authDomain: "gradesync.site",
  projectId: "grade-sync-a17e5",
  storageBucket: "grade-sync-a17e5.appspot.com",
  messagingSenderId: "211799778124",
  appId: "1:211799778124:web:c9af3d1300c88ea9bda5e9",
  measurementId: "G-FLYWNY1PKG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);


export { auth, googleProvider, db };
export type { User };
