// This file provides the code that deletes a cast entry from the Cast List page
import { db } from "./../../firebase.config.js";
import { doc, deleteDoc } from "firebase/firestore";
import { Cast } from "../interfaces/Cast.js";
    
const handleDelete = async (castToDelete: Cast) => {
    // need the collection ID
    console.log("cast to delete ", castToDelete.id);
    const docToDelete = doc(db, "casts",  );
    console.log("doc to delete ", docToDelete)
    await deleteDoc(docToDelete);
}

export  { handleDelete }