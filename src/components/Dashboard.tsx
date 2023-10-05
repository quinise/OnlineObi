// This file includes the code for the Dashboard page=
import React, { useState } from "react";
import { auth } from "./../../GoogleProvider.tsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { motion } from "framer-motion";
import { Cast } from "../interfaces/Cast.tsx";
import { checkForDuplicateTitle } from "../services/utils.tsx"
import { addCastToDb } from "../services/addCast.tsx";
import { generatedCast } from "../services/generateCast.tsx"; 
import Modal from "./Modal.tsx";
import Loader from "./Loader.tsx";

const h1Variants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      delay: .3, 
      duration: 1
    }
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

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const [cast, setCast] = useState<Cast>();
  const [isCastGenerated, setIsCastGenerated] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [showModal, setShowModal] = useState(false);

  const generateCast = () => {
    const castResult = generatedCast;

    setCast(castResult);
    setIsCastGenerated(true);
    setShowModal(true);
  }

  function showSuccessfulSaveAlert() {
    alert('Your cast, ' + newTitle + ', has been saved!')
  }

  function showDuplicateTitleAlert() {
    alert('A cast with this title has already been saved... Please choose a unique title.');
  }

  function showEmptyTitleAlert() {
    alert('The cast title may not be empty.');
  }
  
  const handleSaveCast = async () => {
    // Prevents submission of blank casts and titles to the database
    if (!cast) return;

    if (!newTitle) {
      showEmptyTitleAlert();

      return;
    }

    if (await checkForDuplicateTitle(newTitle)) {
      showDuplicateTitleAlert();
      
      return;

    } else {
      addCastToDb(cast, newTitle);

      showSuccessfulSaveAlert();
    }

    
  }

  React.useEffect(() => {
    const delayNewTitle = setTimeout(() => {
      setNewTitle(newTitle);
    }, 10000)

    return () => clearTimeout(delayNewTitle)
  }, [newTitle])


  const DisplayWithoutCast = () => {
    return (
      <div className="mt-10 pb-10">
      <motion.h1 className="text-3xl text-forrest text-opacity-50 font-serif mb-5 flex items-center justify-center"
        variants={ h1Variants }
        initial="initial"
        animate="animate"
        >Dashboard</motion.h1>
      <div className="card">
          {user &&  <>
                      <h2 className="text-2xl text-mahogany font-sans-serif flex items-center justify-center">Welcome, {user.displayName}</h2>
                      <img className="object-scale-down h-64 w-64 mx-auto mt-10 mb-10" src="src/assets/favicon.png"/>
                      <p className="text-mahogany font-sans-serif mt-10 mb-10 flex items-center justify-center"><b>Would you like to divine something new?</b></p>
                    </>
          }
          {error && <h2 className="text-2xl text-forrest font-serif flex items-center justify-center">Error: {String(error)}</h2>}
          {loading && <Loader />}
          <div className="mt-5 flex items-center justify-center">
            <motion.button className="bg-forrest text-ivory font-sans-serif rounded-xl hover:bg-forrest/60 px-5 py-4 shadow-mds" 
              variants={ buttonVariants } 
              whileHover="whileHover"
              onClick={() => generateCast()}>Cast</motion.button>
          </div>
      </div>
    </div>
    )
  }

  const DisplayWithCast = () => {
    return (
      <>
      <div className="mt-10">
        <h1 className="text-3xl text-forrest font-serif text-opacity-50 flex items-center justify-center">Dashboard</h1>
        {user && <h2 className="text-2xl text-mahogany font-sans-serif flex items-center justify-center">Welcome, {user.displayName}</h2>}
        {error && <h2 className="text-2xl text-forrest font-serif flex items-center justify-center">Error: {String(error)}</h2>}
        {loading && <Loader />}
        <img className="object-scale-down h-64 w-64 mx-auto mt-10 mb-10" src="src/assets/favicon.png"/>
        <p className="text-mahogany font-sans-serif mt-10 mb-10 flex items-center justify-center">Would you like to divine something new?</p>
        <div className="mt-10 mb-10 flex items-center justify-center">
          <button className="bg-forrest text-ivory font-sans-serif rounded-xl hover:bg-forrest/60 px-5 py-5 shadow-md" onClick={() => generateCast()}>Cast</button>
        </div>
      </div>
      
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
      <div className="h-100 w-2/3 mt-10 mx-auto">
          {cast && <h1 className="text-2xl text-mahogany font-sans-serif mt-20 flex items-center justify-center"><b>Odu:&nbsp;</b>{cast.odu}</h1>}
          {cast && <h1 className="text-2xl text-mahogany font-sans-serif mt-5 flex items-center justify-center"><b>Date:&nbsp;</b>{cast.timestamp.toLocaleDateString()}</h1>}
          {cast && <h1 className="text-2xl text-mahogany font-sans-serif mt-5 flex items-center justify-center"><b>Answer:&nbsp;</b>{cast.answer}</h1>}
          {cast && <h1 className="text-2xl text-mahogany font-sans-serif mt-5 flex items-center justify-center"><b>Interpretation:&nbsp;</b>{cast.interpretation}</h1>}
          <div className="container mx-auto mt-10 mb-5 h-32 w-32 flex items-center justify-center">
            {cast && <motion.img className="object-scale-down h-64 w-64 inline" 
              variants={ kolaVariants }
              whileHover="whileHover"
              src={`src/assets/${cast.maleObi1}`} />}
            {cast && <motion.img className="object-scale-down h-64 w-64 inline" 
              variants={ kolaVariants }
              whileHover="whileHover"
              src={`src/assets/${cast.maleObi2}`} />}
            {cast && <motion.img className="object-scale-down h-64 w-64 inline" 
              variants={ kolaVariants }
              whileHover="whileHover"
              src={`src/assets/${cast.femaleObi1}`} />}
            {cast && <motion.img className="object-scale-down h-64 w-64 inline" 
              variants={ kolaVariants }
              whileHover="whileHover"
              src={`src/assets/${cast.femaleObi2}`} />}
          </div>
          <form className="font-sans-serif mt-20 mb-20 flex items-center justify-center" onSubmit={() => handleSaveCast()}>
            <motion.input type="text" className="text-2xl border-2 border-forrest/60 rounded" 
              variants={buttonVariants}
              whileHover="whileHover"
              placeholder=" add a title..." value={newTitle} onChange={(e) => setNewTitle(e.target.value)} autoFocus />
          </form>
          <div className="mt-10 mb-10 flex items-center justify-center">
            <motion.button className="bg-forrest text-ivory font-sans-serif rounded-xl hover:bg-forrest/60 px-5 py-5 shadow-md" 
            variants={ buttonVariants }
            whileHover="whileHover"
            onClick={() => handleSaveCast()}>Save</motion.button>
          </div>
        </div>
      </Modal>
      </>
    )
  }

  if (isCastGenerated) {
    return <DisplayWithCast/>
  } else {
    return <DisplayWithoutCast/>
  }
}

export default Dashboard