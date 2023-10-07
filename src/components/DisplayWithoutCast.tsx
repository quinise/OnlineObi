import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./../../GoogleProvider.tsx";
import { motion } from "framer-motion";
import { generatedCast } from "../services/generateCast.tsx"; 
import { Cast } from "../interfaces/Cast.tsx";
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

const DisplayWithoutCast = () => {
    const [user, loading, error] = useAuthState(auth);
    const [cast, setCast] = useState<Cast>();
    const [isCastGenerated, setIsCastGenerated] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const generateCast = () => {
        const castResult = generatedCast;
    
        setCast(castResult);
        setIsCastGenerated(true);
        setShowModal(true);
      }

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

  export default DisplayWithoutCast;