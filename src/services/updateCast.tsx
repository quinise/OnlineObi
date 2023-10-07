// This file provides the code that edits a cast entry from the Cast List page
import { db } from "./../../firebase.config.js";
import { doc, updateDoc } from "firebase/firestore";
import { Cast } from "../interfaces/Cast.js";
import { checkForDuplicateTitle } from "../services/utils.tsx"

function showEmptyTitleAlert() {
    alert('The cast title may not be empty.');
  }

function showDuplicateTitleAlert() {
    alert('A cast with this title has already been saved... Please choose a unique title.');
}

const handleUpdate = async (cast: Cast, editedTitle: string) => {    
    const updateCast = doc(db, "casts", cast.id)

    if (!editedTitle) {
        return showEmptyTitleAlert()
    }

    if (await checkForDuplicateTitle(editedTitle)) {
        showDuplicateTitleAlert();
        
        return;
    }
    
    await updateDoc(updateCast, {title: editedTitle})
}

export { handleUpdate }