// This file provides the code to save a Cast type object to the Firebase Collection "casts" as a document 
import { addDoc, collection } from "firebase/firestore";
import { uid } from 'uid';
import { auth, db } from "../../firebase.config";
import { Cast } from "../interfaces/Cast.js";

const addCastToDb = async (cast: Cast, newTitle: string) => {
    
  const uuid = uid()
  const castsRef = collection(db, "casts");

    await addDoc(castsRef, {
      id: uuid,
      odu: cast.odu,
      timestamp: cast.timestamp,
      answer: cast.answer,
      maleObi1: cast.maleObi1,
      maleObi2: cast.maleObi2,
      femaleObi1: cast.femaleObi1,
      femaleObi2: cast.femaleObi2,
      interpretation: cast.interpretation,
      title: newTitle,
      user: auth.currentUser?.uid
    })
  }

  export { addCastToDb };
