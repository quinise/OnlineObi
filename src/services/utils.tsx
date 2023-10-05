import { auth } from "./../../GoogleProvider.tsx";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config.tsx"

// Verify that for a signed in user is not a title that matches the input string
const checkForDuplicateTitle = async (newTitle: string) => {
    const duplicateTitleQuery = query(collection(db, "casts"), where("user", "==", auth.currentUser?.uid), where("title", "==", newTitle));
    
    const querySnapshot = await getDocs(duplicateTitleQuery);
    if(querySnapshot.size === 1) {
      return true;
    }

    return false;
  }


export { checkForDuplicateTitle }