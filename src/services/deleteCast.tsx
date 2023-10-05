// This file provides the code that deletes a cast entry from the Cast List page
import { db } from "./../../firebase.config.js";
import { doc, deleteDoc } from "firebase/firestore";
import { Cast } from "../interfaces/Cast.js";

const handleDelete = async (castToDelete: Cast) => {
    const docToDelete = doc(db, "casts", castToDelete.id);
    await deleteDoc(docToDelete);
}

export  { handleDelete }