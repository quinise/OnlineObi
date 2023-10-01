import { db } from "./../../firebase.config.js";
//import { ref, remove, } from "firebase/database";
import { doc, deleteDoc } from "firebase/firestore";
import { Cast } from "../interfaces/Cast.js";

const handleDelete = async (castToDelete: Cast) => {
    //remove(ref(deleteFromDb, `/${castToDelete.id}`));
    console.log("i am deleting", castToDelete.id);
    await deleteDoc(doc(db,"casts" , castToDelete.id));

}

export  { handleDelete }