// This file provides the code that edits a cast entry from the Cast List page
import { db } from "./../../firebase.config.js";
import { doc, updateDoc } from "firebase/firestore";
import { Cast } from "../interfaces/Cast.js";

const handleUpdate = async (cast: Cast, editedTitle: string) => {    
    const updateCast = doc(db, "casts", cast.id)

    await updateDoc(updateCast, {title: editedTitle})
}

export { handleUpdate }