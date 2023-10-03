// This file includes the code for the page with a list of saved casts.
import React, { Fragment, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { motion } from "framer-motion";
import { Cast } from "../interfaces/Cast.tsx";
import { fetchCasts } from "../services/fetchCasts.tsx";
import { handleDelete } from "../services/deleteCast.tsx";
import { auth } from "./../../GoogleProvider.tsx";
import { uid } from "uid";
import Modal from "./Modal.tsx";

// Provides the "bump" animation on hover
const bumpVariants = {
  whileHover: {
    scale: 1.1,
    textShadow: "0px 0px 8px rgb(255, 255, 255)",
    boxShadow: "0px 0px 8px rgb(255, 255, 255)",
  }
}

const titleBumpVariants = {
  whileHover: { 
    scale: 1.1,
    textShadow: "0px 0px 8px rgb(255, 255, 255)",
  }
}

const kolaVariants = {
  whileHover: {
    scale: 2,
  }
}

const CastList = () => {
  const [user] = useAuthState(auth);
  const [casts, setCasts] = useState<Cast[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [cast, setCast] = useState<Cast>({
    id: uid(), 
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
      <div>{uniqueCasts && uniqueCasts?.map((castFromList: Cast, index:number) =>
        <motion.div key={`cl${index}`} className="mt-16 mx-auto w-96 h-48 p-6 bg-forrest/60 border-2 border-forrest/60 rounded-tl-2xl shadow-md block"
          variants={ bumpVariants }
          whileHover="whileHover">
          <div className="w-88 h-36 pt-12 pl-4 bg-forrest/20 rounded-lg border-2 border-forrest/40 flex justify-between" key={ castFromList.id } onClick={
          () => setModuleCast(castFromList)}>
            <h1 className="text-2xl text-ivory font-serif inline">{ castFromList.title }</h1>
            <button onClick={ () => handleDelete(castFromList)} className="bg-red text-white font-sans-serif hover:bg-darkRed h-12 ml-0 mt-1 mb-1 mr-4 px-5 py-2 inline">Delete</button>
          </div>
        </motion.div>
        )}
      </div>
    );
  }

  React.useEffect(() => {
      
    fetchCasts((data: Cast[]) => {
      setCasts(data)
    });
  }, []);

  return (
    <Fragment>
      {user && <h2 className="text-3xl text-forrest font-serif mt-10 flex items-center justify-center">{user.displayName}'s Casts</h2>}
      <div className="pb-10">
        {renderListOfCasts(casts)}
      </div>
        <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
          <div className="p-6">
            <motion.h3 className="text-xl font-semibold text-forrest font-serif mb-5 flex justify-center"
              variants={titleBumpVariants}
              whileHover="whileHover"
            >{cast.title}</motion.h3>
            <hr className="text-forrest rounded-lg md:w-[70%] md:mx-auto mb-8"/>
            <div className="ml-12">
              <p className="text-xl text-forrest font-sans-serif  mb-5 "><b>Odu:</b>  {cast.odu}</p>
              <p className="text-xl text-forrest font-sans-serif mb-5 "><b>Date:</b>  {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(cast.timestamp)}</p>
              <p className="text-xl text-forrest font-sans-serif mb-5 "><b>Answer :</b> {cast.answer}</p>
              <p className="text-xl text-forrest font-sans-serif mb-5 "><b>Interpretation:</b>  {cast.interpretation}</p>
           </div>
            <div className="mt-8 mb-8 flex justify-between">
              <motion.img className="object-scale-down h-32 w-32 inline" 
                variants={ kolaVariants }
                whileHover="whileHover"
                src={`src/assets/${cast.maleObi1}`}/>
              <motion.img className="object-scale-down h-32 w-32 inline"
                variants={ kolaVariants }
                whileHover="whileHover"
                src={`src/assets/${cast.maleObi2}`}/>
              <motion.img className="object-scale-down h-32 w-32 inline" 
                variants={ kolaVariants }
                whileHover="whileHover"
                src={`src/assets/${cast.femaleObi1}`}/>
              <motion.img className="object-scale-down h-32 w-32 inline" 
              variants={ kolaVariants }
              whileHover="whileHover"
              src={`src/assets/${cast.femaleObi2}`}/>
            </div>
            <motion.button className="bg-forrest rounded-md text-ivory font-sans-serif hover:bg-forrest/60 h-12 ml-12 mt-1 mb-1 mr-4 px-5 py-2 inline"
              variants={ bumpVariants }
              whileHover="whileHover">Edit</motion.button>
          </div>
        </Modal>
    </Fragment>
  )
}

export default CastList;