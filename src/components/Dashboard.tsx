// This file includes the code for the Dashboard page=
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.config";
import { Cast } from "../interfaces/Cast.tsx";
import { addCastToDb } from "../services/addCast.tsx";
import { generateCast } from "../services/generateCast.tsx";
import { checkForDuplicateTitle } from "../services/utils.tsx";
import Loader from "./Loader.tsx";
import Modal from "./Modal.tsx";
import Button from "./ui/Button";

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

// Keep the h1 mount fade in Motion; convert input and images hovers to Tailwind utilities

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const [cast, setCast] = useState<Cast>();
  const [isCastGenerated, setIsCastGenerated] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [showModal, setShowModal] = useState(false);

  function showSuccessfulSaveAlert() {
    alert('Your cast, ' + newTitle + ', has been saved!')
  }

  function showDuplicateTitleAlert() {
    alert('A cast with this title has already been saved... Please choose a unique title.');
  }

  function showEmptyTitleAlert() {
    alert('The cast title may not be empty.');
  }

  function showInvalidTitleAlert() {
    alert('The cast title may only contain letters')
  }
  
  const handleGenerateCast = () => {
    if (isCastGenerated) {
      setIsCastGenerated(false);
    }

    const castResult = generateCast();

    setCast(castResult);
    setIsCastGenerated(true);

    setShowModal(true);
  }


  const handleSaveCast = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevents submission of blank casts, blank titles, or duplicate titles to the database
    if (!cast) return;

    if (!newTitle) {
      showEmptyTitleAlert();
      return;
    }

    // Cast title can only use letters
    if (!newTitle.match(/^[a-zA-Z]+$/)) {
      showInvalidTitleAlert();
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

  return (
    <>
    <div className="mt-10">
      <motion.h1 className="text-3xl text-forrest text-opacity-50 font-serif mb-5 flex items-center justify-center"
        variants={ h1Variants }
        initial="initial"
        animate="animate"
        >Dashboard</motion.h1>
        {user && <h2 className="text-2xl text-mahogany font-sans-serif flex items-center justify-center">Welcome, {user.displayName}</h2>}
        {error && <h2 className="text-2xl text-forrest font-serif flex items-center justify-center">Error: {String(error)}</h2>}
        {loading && <Loader />}
        <img className="object-scale-down h-64 w-64 mx-auto mt-10 mb-10" src="../assets/favicon.png"/>
        <p className="text-mahogany font-sans-serif mt-10 mb-10 flex items-center justify-center">Would you like to divine something new?</p>
        <div className="mt-10 mb-10 flex items-center justify-center">
          <Button onClick={() => handleGenerateCast()} variant="primary" size="lg">
            Cast
          </Button>
        </div>
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="p-6">
          <div className="">
            {cast && <p className="text-xl text-mahogany font-sans-serif mt-5 flex items-center justify-center"><b>Odu:&nbsp;</b>{cast.odu}</p>}
            {cast && <p className="text-xl text-mahogany font-sans-serif mt-5 flex items-center justify-center"><b>Date:&nbsp;</b>{new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(cast.timestamp)}</p>}
            {cast && <p className="text-xl text-mahogany font-sans-serif mt-5 flex items-center justify-center"><b>Answer:&nbsp;</b>{cast.answer}</p>}
            {cast && <p className="text-xl text-mahogany font-sans-serif mt-5 flex items-center justify-center"><b>Interpretation:&nbsp;</b>{cast.interpretation}</p>}
          </div>
            <div className="mx-auto mt-10 mb-5 h-32 w-32 flex items-center justify-center">
            {cast && <img className="object-scale-down h-64 w-64 inline-block transform transition-transform hover:scale-125" src={`assets/${cast.maleObi1}`} />}
            {cast && <img className="object-scale-down h-64 w-64 inline-block transform transition-transform hover:scale-125" src={`assets/${cast.maleObi2}`} />}
            {cast && <img className="object-scale-down h-64 w-64 inline-block transform transition-transform hover:scale-125" src={`assets/${cast.femaleObi1}`} />}
            {cast && <img className="object-scale-down h-64 w-64 inline-block transform transition-transform hover:scale-125" src={`assets/${cast.femaleObi2}`} />}
          </div>
            <form onSubmit={(e) => handleSaveCast(e) } className="font-sans-serif mt-20 mb-20 flex flex-col items-center justify-center">
            <input type="text" className="text-2xl border-2 border-forrest/60 rounded" 
              placeholder=" add a title..." value={ newTitle } onChange={(e) => setNewTitle(e.target.value)} autoFocus />
            <div className="mt-10 mb-10 flex items-center justify-center">
              <Button
                type="submit"
                variant="secondary"
                size="md"
                className="!bg-forrest !text-ivory hover:scale-105 hover:shadow-lg transition-transform focus:outline-none focus:ring-2 focus:ring-forrest"
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}

export default Dashboard