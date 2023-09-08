// This file includes the code for the page with a list of saved casts.
import { useState } from "react";
// import { auth } from "./../../GoogleProvider.tsx";
import { firebase } from "../../firebase.config.tsx"
// import { useAuthState } from "react-firebase-hooks/auth";
// import { BaseCastArray } from "../Interfaces/BaseCastArray.tsx";
// import { Cast } from "../Interfaces/Cast.tsx";

const CastList = () => {
  // const [casts, setCasts] = useState<[Cast]>();
  
  // const getCasts = async () => {
  //   const db = firebase.firestore();
  //   const castsRef = db.collection('casts');
  //   const snapshot = await castsRef.where('category', '==', category().get())
  //   if (snapshot.empty) {

  //   }    
  // }

  return (
    <div>CastList</div>
  )
}

export default CastList