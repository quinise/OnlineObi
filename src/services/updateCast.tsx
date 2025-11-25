// This file provides the code that edits a cast entry from the Cast List page
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { Cast } from "../interfaces/Cast.js";
import { checkForDuplicateTitle } from "../services/utils.tsx";

function showEmptyTitleAlert() {
    alert('The cast title may not be empty.');
  }

function showDuplicateTitleAlert() {
    alert('A cast with this title has already been saved... Please choose a unique title.');
}

function showSuccessfullUpdateAlert(editedTitle: string) {
    alert('Your cast, ' + editedTitle + ', has been saved!');
}

function showInvalidTitleAlert() {
    alert('The cast title may only contain letters')
}

const handleUpdate = async (cast: Cast, editedTitle: string) => {    
    const updateCast = doc(db, "casts", cast.id)

    // Alert the user if there is no title string entered
    if (!editedTitle) {
        return showEmptyTitleAlert()
    }

    // Cast title can only use letters
    if (!editedTitle.match(/^[a-zA-Z]+$/)) {
        showInvalidTitleAlert();
        return;
    }

    if (await checkForDuplicateTitle(editedTitle)) {
        showDuplicateTitleAlert();
        
        return;
    }
    
    await updateDoc(updateCast, {title: editedTitle})
    showSuccessfullUpdateAlert(editedTitle);
}

export { handleUpdate };
