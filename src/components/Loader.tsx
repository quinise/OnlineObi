// This file provides the code for the loading animation
import { motion } from 'framer-motion'

const containerVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear"
    }
  }
}

const dotVariants = {
  animate: (i: number) => ({
    scale: [1, 1.3, 1],
    opacity: [0.3, 1, 0.3],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      delay: i * 0.15,
      ease: "easeInOut"
    }
  })
}

const Loader = () => {
  const dots = 8;
  const radius = 20;

  return (
    <div className="flex items-center justify-center my-10">
      <motion.div 
        className="relative w-16 h-16"
        variants={containerVariants}
        animate="animate"
      >
        {[...Array(dots)].map((_, i) => {
          const angle = (i * 360) / dots;
          const x = radius * Math.cos((angle * Math.PI) / 180);
          const y = radius * Math.sin((angle * Math.PI) / 180);
          
          return (
            <motion.div
              key={i}
              custom={i}
              variants={dotVariants}
              animate="animate"
              className="absolute w-2.5 h-2.5 bg-forrest rounded-full"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          );
        })}
      </motion.div>
    </div>
  )
}

export default Loader