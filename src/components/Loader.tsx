// This file provides the code that animates a ball to signifiy that something in the DOM is loading
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
                duration: 0.25,
                ease: 'easeOut'
            },
        }
    }
}

const Loader = () => {
  return (
    <>
    <motion.div className='loader bg-forrest rounded-md w-10 h-10 mx-auto'
        variants={loaderVariants}
        animate="animationOne"
    >
    </motion.div>
    </>
  )
}

export default Loader