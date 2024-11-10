import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { db, auth } from './firebaseConfig.js';

export const writeGrades = async (grades) => {
    const user = auth.currentUser;
    if (user) {
        console.log(user.uid);
        console.log(grades);
        await setDoc(
            doc(db, "users", user.uid), 
            {
                grades: grades
            }
        );
    } else {
        console.error("No authenticated user found.");
    }
}

export const readGrades = async () => {
    const user = auth.currentUser;
    if (user) {
        console.log(user.uid);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data().grades);
            return docSnap.data().grades
        } else {
            console.log("No such document!");
        }
    } else {
        console.error("No authenticated user found.");
    }
}
