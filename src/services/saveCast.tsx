import { uid } from 'uid';
import { db } from "../../firebase.config.tsx"
import { addDoc, collection} from "firebase/firestore";
import { auth } from "./../../GoogleProvider.tsx";
import { Cast } from "../interfaces/Cast.js";

const saveCastToDb = async (cast: Cast, newTitle: string) => {
    
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

  export { saveCastToDb };