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
    <div className='fixed inset-0 bg-forrest bg-opacity-25 backdrop-blur-sm flex items-center justify-center overflow-y-auto px-4 py-8' id='wrapper' onClick={handleClose}>
        <div className='w-full max-w-4xl mx-auto flex flex-col'>
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                className="text-xl text-mahogany font-sans-serif"
                onClick={() => onClose()}
              >
                close
              </Button>
            </div>
            <motion.div className='bg-ivory/90 rounded-lg p-6 max-h-[80vh] overflow-y-auto w-full'
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