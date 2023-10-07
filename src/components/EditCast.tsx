import { useState } from "react";
import { motion } from "framer-motion";
import { uid } from "uid";
import { Cast } from "../interfaces/Cast.tsx";
// import { checkForDuplicateTitle } from "../services/utils.tsx"
import Modal from "./Modal"

// Provides the "bump" animation on hover
const bumpVariants = {
  whileHover: {
    scale: 1.1,
    textShadow: "0px 0px 8px rgb(255, 255, 255)",
    boxShadow: "0px 0px 8px rgb(255, 255, 255)",
  }
}


const buttonVariants = {
  whileHover: {
    scale: 1.1,
    textShadow: "0px 0px 8px rgb(255, 255, 255)",
    boxShadow: "0px 0px 8px rgb(255, 255, 255)",
  }
}

const kolaVariants = {
  whileHover: {
    scale: 2,
  }
}

const EditCast = () => {
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

  return (
    <>
    <motion.button className="bg-forrest rounded-md text-ivory font-sans-serif hover:bg-forrest/60 h-12 ml-[20%] xl:ml-[40%] mt-1 mb-1 mr-0 px-5 py-2 inline" key={`editButton${cast.id}`}
          variants={bumpVariants}
          whileHover="whileHover" onClick={() => setShowModal(true)}
          >Edit Cast</motion.button>
    <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="p-6 sm:w-[25%] sm:h-[75%] mt-10">
          {cast && <h1 className="text-2xl text-mahogany font-sans-serif mt-5 flex items-center justify-center"><b>Current Title:&nbsp;</b>{cast.title}</h1>}
          {cast && <h1 className="text-2xl text-mahogany font-sans-serif mt-5 flex items-center justify-center"><b>Odu:&nbsp;</b>{cast.odu}</h1>}
          {cast && <h1 className="text-2xl text-mahogany font-sans-serif mt-5 flex items-center justify-center"><b>Date:&nbsp;</b>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(cast.timestamp)}</h1>}
          {cast && <h1 className="text-2xl text-mahogany font-sans-serif mt-5 flex items-center justify-center"><b>Answer:&nbsp;</b>{cast.answer}</h1>}
          {cast && <h1 className="text-2xl text-mahogany font-sans-serif mt-5 flex items-center justify-center"><b>Interpretation:&nbsp;</b>{cast.interpretation}</h1>}
          <div className="container mx-auto mt-10 mb-5 h-32 w-32 flex items-center justify-center">
            {cast && <motion.img className="object-scale-down h-64 w-64 inline"
              variants={kolaVariants}
              whileHover="whileHover"
              src={`src/assets/${cast.maleObi1}`} />}
            {cast && <motion.img className="object-scale-down h-64 w-64 inline"
              variants={kolaVariants}
              whileHover="whileHover"
              src={`src/assets/${cast.maleObi2}`} />}
            {cast && <motion.img className="object-scale-down h-64 w-64 inline"
              variants={kolaVariants}
              whileHover="whileHover"
              src={`src/assets/${cast.femaleObi1}`} />}
            {cast && <motion.img className="object-scale-down h-64 w-64 inline"
              variants={kolaVariants}
              whileHover="whileHover"
              src={`src/assets/${cast.femaleObi2}`} />}
          </div>
          <form className="font-sans-serif mt-20 mb-20 flex items-center justify-center">
            <motion.input type="text" className="text-2xl border-2 border-forrest/60 rounded"
              variants={buttonVariants}
              whileHover="whileHover"
              placeholder="test" autoFocus />
          </form>
          <div className="mt-10 mb-10 flex items-center justify-center">
            <motion.button className="bg-forrest text-ivory font-sans-serif rounded-xl hover:bg-forrest/60 px-5 py-5 shadow-md"
              variants={buttonVariants}
              whileHover="whileHover"
              >Save</motion.button>
          </div>
        </div>
      </Modal>
      </>
  )
}

export default EditCast