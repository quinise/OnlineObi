// This file includes the code for the Logout page
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { auth } from "./../../GoogleProvider.tsx";
import {  signOut } from "firebase/auth";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => {
          // Successfull sign out
          navigate('/');
          console.log("Signed out successfully")
        }).catch((error) => {
          // Logout unsuccessfull
          console.log("Logout Error: " + error);
        })
      }
  return (
    <>
      <h2 className='text-mahogany font-"sans-serif" mt-5 mb-10 flex items-center justify-center'>Are you sure you'd like to log out?</h2>
      <div className='mt-5 mb-10 flex items-center justify-center'>
        <motion.button whileHover={{ scale: 1.1 }} className='bg-forrest rounded-md text-ivory font-"sans-serif" hover:bg-forrest/60 px-5 py-5' onClick={handleLogout}>Logout</motion.button>
      </div>
    </>
  )
}

export default Logout