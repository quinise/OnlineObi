import { useState } from "react";
import { motion } from "framer-motion";
import { uid } from "uid";
import { Cast } from "../interfaces/Cast.tsx";
// import { checkForDuplicateTitle } from "../services/utils.tsx"
import Modal from "./Modal"

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
      </div>
      <div className="mt-10 mb-10 flex items-center justify-center">
        <motion.button className="bg-forrest text-ivory font-sans-serif rounded-xl hover:bg-forrest/60 px-5 py-5 shadow-md"
          variants={buttonVariants}
          whileHover="whileHover"
          >Save</motion.button>
      </div>
    </Modal>
    </>
  )
}

export default EditCast