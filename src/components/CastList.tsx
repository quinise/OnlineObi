// This file includes the code for the page with a list of saved casts.
import React, { useState } from "react";
import { collection, query, where, onSnapshot} from "firebase/firestore";
import { db } from "../../firebase.config.tsx"
import { useAuthState } from "react-firebase-hooks/auth";
import { Cast } from "../Interfaces/Cast.tsx";
import { auth } from "./../../GoogleProvider.tsx";

const CastList = () => {
  const [user] = useAuthState(auth);
  const [casts, setCasts] = useState<Cast[]>([]);
  const castsRef = (collection(db, "casts"));

  // Generate a random id to use for unique keys
  function makeid(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.?!@#$&*';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

  // Create an array of casts without duplicates
  const seen = new Set();
  const uniqueCasts = casts.filter( cast => {
    const duplicate = seen.has(cast.title);
    seen.add(cast.title);
    return !duplicate;
  })

  React.useEffect(() => {
    const fetchCasts  = () => {
      const queryCasts = query(castsRef, where("user", "==", auth.currentUser?.uid));
     
      const unsubscribe = onSnapshot(queryCasts, (snapshot) => {
        snapshot.forEach((doc) => {
          const incommingCast: Cast = {
            id: doc.data().id,
            odu: doc.data().odu,
              timestamp: doc.data().timestamp,
              answer: doc.data().answer,
              maleObi1: doc.data().maleObi1,
              maleObi2: doc.data().maleObi2,
              femaleObi1: doc.data().femaleObi1,
              femaleObi2: doc.data().femaleObi2,
              interpretation: doc.data().interpretation,
              title: doc.data().title
          }

            casts.push(incommingCast);
            return incommingCast;
  
        })
        setCasts(casts)
      });
      
      return () => unsubscribe();
    };

    fetchCasts();
    console.log(uniqueCasts);

  }, [castsRef, casts, uniqueCasts]);

  return (
    <>
      {user && <h2 className="text-2xl flex items-center justify-center">{user.displayName}'s Casts</h2>}
      <div>{uniqueCasts && uniqueCasts?.map((cast) => 
        <div className="block">
          <h1 className="inline" key={user?.uid}>{cast.title}</h1><button className="ml-10 inline">Delete</button>
        </div>)}
      </div>
    </>
  )

}

export default CastList;
