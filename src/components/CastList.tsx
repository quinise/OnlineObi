// This file includes the code for the page with a list of saved casts.
import React, { Fragment, useState } from "react";
import { collection, query, where, onSnapshot} from "firebase/firestore";
import { db } from "../../firebase.config.tsx"
import { useAuthState } from "react-firebase-hooks/auth";
import { Cast } from "../Interfaces/Cast.tsx";
import { auth } from "./../../GoogleProvider.tsx";
import Modal from "./Modal.tsx";

const CastList = () => {
  const [user] = useAuthState(auth);
  const [casts, setCasts] = useState<Cast[]>([]);
  const [showModal, setShowModal] = useState(false);
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
    <Fragment>
      {user && <h2 className="text-3xl text-forrest mt-24 flex items-center justify-center">{user.displayName}'s Casts</h2>}
      <div>{uniqueCasts && uniqueCasts?.map((cast) => 
        <div className="mt-16 mx-auto w-96 h-48 p-6 bg-lime-cream/40 border-2 border-forrest/60 rounded-tl-2xl shadow-md block" onClick={() => setShowModal(true)}>
          <div className="w-88 h-36 pt-12 pl-4 bg-lime-cream/60 rounded-lg border-2 border-forrest/40 flex justify-between">
            <h1 className="text-2xl text-forrest inline" key={makeid(16)}>{cast.title}</h1>
            <button className="bg-red text-white hover:bg-dark-red h-12 ml-0 mt-1 mb-1 mr-4 px-5 py-2 inline">Delete</button>
          </div>
        </div>)}
      </div>
    <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-forrest mb-5">{cast.title}</h3>
      </div>
    </Modal> 
    </Fragment>
  )

}

export default CastList;