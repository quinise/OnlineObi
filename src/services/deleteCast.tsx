// This file provides the code that deletes a cast entry from the Cast List page
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { Cast } from "../interfaces/Cast.js";

const handleDelete = async (castToDelete: Cast) => {
    const docToDelete = doc(db, "casts", castToDelete.id);
    await deleteDoc(docToDelete);
}

export { handleDelete };
