import { auth } from "./../../GoogleProvider.tsx";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config.tsx"

// Generate a random id string to use for unique keys
function makeid(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.?!@#$&*';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

// Verify that for a user is not a title that matches the input string
const checkForDuplicateTitle = async (newTitle: string) => {
    const duplicateTitleQuery = query(collection(db, "casts"), where("user", "==", auth.currentUser?.uid), where("title", "==", newTitle));
    
    const querySnapshot = await getDocs(duplicateTitleQuery);
    if(querySnapshot.size === 1) {
      return true;
    }

    return false;
  }


export { makeid, checkForDuplicateTitle }