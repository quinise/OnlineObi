// This file provides a Modal that blurs original window and focuses on an Ivory box with a "close" option
import { AnimatePresence, motion } from "framer-motion";
import React from 'react';
import Button from "./ui/Button";

const backdropVariants = {
  visible: {opacity: 1},
  hidden: {opacity: 0}
}

const Modal = ({ isVisible, onClose, children }: { isVisible: boolean; onClose: () => void; children?: React.ReactNode }) => {

  if (!isVisible) return null;

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.id === 'wrapper') onClose();
  }

  return (
    <AnimatePresence mode="wait">
    <div className='fixed inset-0 bg-forrest bg-opacity-25 backdrop-blur-sm flex rounded-xl shadow-md justify-center items-center overflow-y-auto overflow-x-hidden' id='wrapper' onClick={handleClose}>
      <div className='md:w-[60%] md:max-h-[100%] sm:w-[10%] sm:max-h-[25%] mx-auto flex flex-col'>
          <Button
            variant="ghost"
            size="sm"
            className="text-xl text-mahogany font-sans-serif sm:mt-20 place-self-end"
            onClick={() => onClose()}
          >
            close
          </Button>
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