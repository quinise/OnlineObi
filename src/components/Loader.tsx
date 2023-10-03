import React from 'react'
import { motion } from 'framer-motion'

const loaderVariants = {
    animationOne: {
        x: [-20,20],
        y: [0, -30],
        transition: {
            x: {
                yoyo: Infinity,
                duration: 0.5
            },
            y: {
                yoyo: Infinity,
                duration: 0.25
            },
        }
    }
}

const Loader = () => {
  return (
    <>
    <motion.div className='loader bg-white rounded-md w-10 h-10 mx-auto'
        variants={loaderVariants}
        animate="animationOne"
    >
    </motion.div>
    </>
  )
}

export default Loader