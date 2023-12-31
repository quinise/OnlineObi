// This file includes the code for the page with a list of saved casts.
import React, { Fragment, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { motion } from "framer-motion";
import { Cast } from "../interfaces/Cast.tsx";
import { fetchCasts } from "../services/fetchCasts.tsx";
import { handleDelete } from "../services/deleteCast.tsx";
import { handleUpdate } from "../services/updateCast.tsx"
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

// Provides the "bump" animation on Title
const titleBumpVariants = {
  whileHover: { 
    scale: 1.1,
    textShadow: "0px 0px 8px rgb(255, 255, 255)",
  }
}

// Provides the "bump" animation on kola nut imagess
const kolaVariants = {
  whileHover: {
    scale: 2,
  }
}

const CastList = () => {
  const [user] = useAuthState(auth);
  const [casts, setCasts] = useState<Cast[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cast, setCast] = useState<Cast>({
    id: uid(), 
    odu:" Aalaffia - Ogbe",
    timestamp: Date.now(), 
    answer: "Yes", 
    maleObi1: "Male1Up.png", 
    maleObi2: "Male2Up.png", 
    femaleObi1: "Female1Up.png", 
    femaleObi2: "Female2Up.png", 
    interpretation: "Symbolizes good general welfare", 
    title: ""
  });

  const handleEdit = async () => {
    setShowModal(true);
    setShowInput(true);
  }

  // Provide the Module component with the selected cast
  function setModuleCast(inputCast: Cast) {
     setCast(inputCast);
     setShowModal(true);
     setShowInput(false);
     return cast;
  }

  // Provide the HTML for a the user's list of uniquely titled casts
  const renderListOfCasts = (uniqueCasts: Cast[]) => {
    return (
      <div>{uniqueCasts && uniqueCasts?.map((castFromList: Cast, index:number) =>
        <>
        <div className="inline">
          <motion.div key={`cl${index}`} className="mt-16 mx-auto w-96 h-40 p-1.5 bg-forrest/60 border-2 border-forrest/60 rounded-tl-2xl static shadow-md block"
            variants={bumpVariants}
            whileHover="whileHover">
            <div className="w-88 h-36 pt-12 pl-4 bg-forrest/20 rounded-lg border-2 border-forrest/40 flex justify-between" key={`castListElements${castFromList.id}`} onClick={() => setModuleCast(castFromList)}>
              <h1 className="text-2xl text-ivory font-serif inline">{castFromList.title}</h1>
            </div>
          </motion.div>
        </div>
        <motion.button className="bg-forrest rounded-md text-ivory font-sans-serif hover:bg-forrest/60 h-12 ml-[32%] xl:ml-[40%] mt-1 mb-1 mr-0 px-5 py-2 inline" key={`editButton${castFromList.id}`}
          variants={bumpVariants}
          whileHover="whileHover" onClick={() => handleEdit()}
          >Edit Cast</motion.button>
        <motion.button className="bg-red text-white font-sans-serif hover:bg-darkRed h-12 px-5 py-2 ml-[18%] xl:ml-[9%]  mt-1 rounded-md" key={`deleteButton${castFromList.id}`} onClick={() => handleDelete(castFromList)}
          variants={bumpVariants}
          whileHover="whileHover"
        >Delete</motion.button>
        </>
        )}
      </div>
    
    );
  }

  React.useEffect(() => {
    fetchCasts((data: Cast[]) => {
      // Sort the casts by timestamp
      const timestampDescending = [...data].sort((a, b) => b.timestamp - a.timestamp);
      setCasts(timestampDescending);
    });
  }, []);

  return (
    <Fragment>
      {user && <h2 className="text-3xl text-forrest font-serif mt-10 flex items-center justify-center">{user.displayName}'s Casts</h2>}
      <div className="flex items-center justify-center">
        <h3 className="text-2xl text-mahogany font-serif mt-10 flex items-center justify-center">Cast Search </h3>
      </div>
      <div className="flex items-center justify-center">
        <input type="text" 
          className="text-2xl text-mahogany font-serif mt-5 flex items-center justify-center border-2 border-forrest/60 rounded"
          onChange={(e) => setSearchValue(e.target.value)}
          value={ searchValue }
          />
      </div>
      <div className="mt-10 flex flex-col items-center justify-center">
        {searchValue && casts
        .filter((searchCast) => {
          return searchValue.toLowerCase() === ''
          ? searchCast
          : searchCast.title.toLowerCase().includes(searchValue.toLowerCase());
        })
        .map((castFromList: Cast, index: number) => 
          <>
          <ul className="flex items-center justify-center">
            <li className="col">
              <motion.div key={`rlElements${index}`} onClick={() => setModuleCast(castFromList)} className="mt-16 mx-auto w-96 h-40 p-1.5 bg-forrest/60 border-2 border-forrest/60 rounded-tl-2xl static shadow-md block"
                variants={bumpVariants}
                whileHover="whileHover">
                <div className="w-88 h-36 pt-12 pl-4 bg-forrest/20 rounded-lg border-2 border-forrest/40 flex justify-between" key={`resultListElements${castFromList.id}`} onClick={() => setModuleCast(castFromList)}>
                  <h1 className="text-2xl text-ivory font-serif inline">{castFromList.title}</h1>
                </div>
              </motion.div>
              <div className="mb-5 flex justify-between">
                <motion.button className="bg-forrest rounded-md text-ivory font-sans-serif hover:bg-forrest/60 h-12 ml-[2%] xl:ml-[40%] mt-1 mb-1 mr-0 px-5 py-2 inline" key={`resultEditButton${castFromList.id}`}
                  variants={bumpVariants}
                  whileHover="whileHover" onClick={() => handleEdit()}
                >Edit Cast</motion.button>
                <motion.button className="bg-red text-white font-sans-serif hover:bg-darkRed h-12 px-5 py-2  xl:ml-[9%] mt-1 rounded-md inline" key={`resultDeleteButton${castFromList.id}`} onClick={() => handleDelete(castFromList)}
                  variants={bumpVariants}
                  whileHover="whileHover"
                >Delete</motion.button>
              </div>
            </li>
          </ul>
          </>
        )}
      </div>
      <hr className="text-forrest rounded-lg md:w-[70%] md:mx-auto mb-8 "/>
      <div className="pb-10">
        {renderListOfCasts(casts)}
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="p-6">
        {showInput ? <input className="text-forrest font-sans-serif mb-2 flex mx-auto" placeholder={newTitle} value={newTitle} onChange={(e) => setNewTitle(e.target.value)}/>
        : <motion.h3 className="text-xl font-semibold text-forrest font-serif mb-5 flex justify-center"
            variants={titleBumpVariants}
            whileHover="whileHover"
          >{cast.title}</motion.h3>
          }
          <hr className="text-forrest rounded-lg md:w-[70%] md:mx-auto mb-8"/>
          <div className="ml-12">
            <p className="text-xl text-forrest font-sans-serif  mb-5"><b>Odu:</b>  {cast.odu}</p>
            <p className="text-xl text-forrest font-sans-serif mb-5"><b>Date:</b>  {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(cast.timestamp)}</p>
            <p className="text-xl text-forrest font-sans-serif mb-5"><b>Answer :</b> {cast.answer}</p>
            <p className="text-xl text-forrest font-sans-serif mb-5"><b>Interpretation:</b>  {cast.interpretation}</p>
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
          {showInput && <motion.button className="bg-forrest rounded-md text-ivory font-sans-serif hover:bg-forrest/60 h-12 ml-[32%] xl:ml-[40%] mt-1 mb-1 mr-0 px-5 py-2 inline" key={`editButton${cast.id}`}
            variants={bumpVariants}
            whileHover="whileHover" onClick={() => handleUpdate(cast, newTitle)}
            >Save</motion.button>
          }
        </div>
      </Modal>
    </Fragment>
  )
}

export default CastList;