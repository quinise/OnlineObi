// This file includes the code for the page with a list of saved casts.
import React, { Fragment, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Cast } from "../interfaces/Cast.tsx";
import { makeid } from "../services/utils.tsx";
import { fetchCasts } from "../services/fetchCasts.tsx"
import { auth } from "./../../GoogleProvider.tsx";
import Modal from "./Modal.tsx";

const CastList = () => {
  const [user] = useAuthState(auth);
  const [casts, setCasts] = useState<Cast[]>([]);
  const [showModal, setShowModal] = useState(false);
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

  // Provide the Module component with the selected cast
  function setModuleCast(inputCast: Cast) {
     setCast(inputCast);
     setShowModal(true)
     return cast;
  }

  // Provide the HTML for a the user's list of uniquely titled casts
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
      
    fetchCasts((data) => {
      setCasts(data)
    });
  }, []);

  return (
    <Fragment>
      {user && <h2 className="text-3xl text-forrest mt-10 flex items-center justify-center">{user.displayName}'s Casts</h2>}
      <div className="pb-10">
        {renderListOfCasts(casts)}
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
            <button className="bg-forrest rounded-md text-ivory hover:bg-forrest/60 h-12 ml-12 mt-1 mb-1 mr-4 px-5 py-2 inline">Edit</button>
          </div>
        </Modal>
    </Fragment>
  )
}

export default CastList;