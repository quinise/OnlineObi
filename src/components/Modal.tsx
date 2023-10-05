// This file provides a Modal that blurs original window and focuses on an Ivory box with a "close" option
import { AnimatePresence, motion } from "framer-motion";

const buttonVariants = {
  whileHover: {
    scale: 1.1,
    textShadow: "0px 0px 8px rgb(255, 255, 255)",
  }
}

const backdropVariants = {
  visible: {opacity: 1},
  hidden: {opacity: 0}
}

const Modal = ({ isVisible, onClose, children }) => {

  if ( !isVisible ) return null;
  
  const handleClose = (e) => {
    if (e.target.id === 'wrapper') onClose();
  }

  return (
    <AnimatePresence mode="wait">
    <div className='fixed inset-0 bg-forrest bg-opacity-25 backdrop-blur-sm flex rounded-xl shadow-md justify-center items-center overflow-y-auto overflow-x-hidden' id='wrapper' onClick={handleClose}>
      <div className='md:w-[50%] md:h-[40%] md:mx-auto flex flex-col'>
          <motion.button className='text-xl text-mahogany font-sans-serif place-self-end' 
            variants={buttonVariants}
            whileHover="whileHover"
            onClick={() => onClose()}>close</motion.button>
          <motion.div className='bg-ivory/90 rounded-lg'
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
          >{ children }</motion.div>
      </div>
    </div>
    </AnimatePresence>
    )
}

export default Modal