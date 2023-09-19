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
  const [cast, setCast] = useState<Cast>({
    id: makeid(8), 
    odu:" Aalaffia - Ogbe",
    timestamp: new Date(), 
    answer: "Yes", 
    maleObi1: "Male1Up.png", 
    maleObi2: "Male2Up.png", 
    femaleObi1: "Female1Up.png", 
    femaleObi2: "Female2Up.png", 
    interpretation: "Symbolizes good general welfare", 
    title: ""
    });
  const [casts, setCasts] = useState<Cast[]>([]);
  const [showModal, setShowModal] = useState(false);
  const castsRef = (collection(db, "casts"));

  // Generate a random id string to use for unique keys
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

  // Provide the Module component with the selected cast
  function setModuleCast(inputCast: Cast) {
     setCast(inputCast);
     setShowModal(true)
     return cast;
  }

  // Provide the CastList component with a the user's list of uniquely titled casts
  const renderListOfCasts = (uniqueCasts: Cast[]) => {
    return (
      <div>{uniqueCasts && uniqueCasts?.map((castFromList: Cast) =>
        <div className="mt-16 mx-auto w-96 h-48 p-6 bg-limeCream/40 border-2 border-forrest/60 rounded-tl-2xl shadow-md block" onClick={
          () => setModuleCast(castFromList)}>
          <div className="w-88 h-36 pt-12 pl-4 bg-limeCream/60 rounded-lg border-2 border-forrest/40 flex justify-between">
            <h1 className="text-2xl text-forrest inline" key={makeid(16)}>{castFromList.title}</h1>
            <button className="bg-red text-white hover:bg-darkRed h-12 ml-0 mt-1 mb-1 mr-4 px-5 py-2 inline">Delete</button>
          </div>
        </div>
        )}
      </div>
    );
  }

  React.useEffect(() => {
    // Let this component finish or start making a request before a new component is mounted
    let didCancel = false;

    // Query the Firebase database for all the user's casts
    async function fetchCasts () {
      if (!didCancel) {
      const queryCasts = query(castsRef, where("user", "==", auth.currentUser?.uid));
     
      const unsubscribe = await onSnapshot(queryCasts, (snapshot) => {
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
      }
    }
      
    fetchCasts();

    return () => {
      didCancel = true;
    }
  }, [castsRef, casts, uniqueCasts]);

  return (
    <Fragment>
      {user && <h2 className="text-3xl text-forrest mt-24 flex items-center justify-center">{user.displayName}'s Casts</h2>}
      <div>
        {renderListOfCasts(uniqueCasts)}
      </div>
        <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-forrest mb-5 flex justify-center">{cast.title}</h3>
            <hr className="text-forrest rounded-lg md:w-[70%] md:mx-auto mb-8"/>
           <div className="ml-12">
            <p className="text-xl text-forrest mb-5 ">Odu: {cast.odu}</p>
            <p className="text-xl text-forrest mb-5 ">Date: {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(cast.timestamp)}</p>
            <p className="text-xl text-forrest mb-5 ">Answer: {cast.answer}</p>
            <p className="text-xl text-forrest mb-5 ">Interpretation: {cast.interpretation}</p>
           </div>
            <div className="mt-8 mb-8 flex justify-between">
              <img className="object-scale-down h-32 w-32 inline" src={`src/assets/${cast.maleObi1}`}/>
              <img className="object-scale-down h-32 w-32 inline" src={`src/assets/${cast.maleObi2}`}/>
              <img className="object-scale-down h-32 w-32 inline" src={`src/assets/${cast.femaleObi1}`}/>
              <img className="object-scale-down h-32 w-32 inline" src={`src/assets/${cast.femaleObi2}`}/>
            </div>
            <button className="bg-lime rounded-md text-ivory hover:bg-limeCream h-12 ml-12 mt-1 mb-1 mr-4 px-5 py-2 inline">Edit</button>
          </div>
        </Modal>
    </Fragment>
  )
}

export default CastList;