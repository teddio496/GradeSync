import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { db, auth } from './firebaseConfig';
import { grade, assessment } from "../app/component/types/type";

export const writeGrades = async (grades: grade[]) => {
    const user = auth.currentUser;
    if (user) {
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
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data().grades
        } else {
        }
    } else {
        console.error("No authenticated user found.");
    }
}
