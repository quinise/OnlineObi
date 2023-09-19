// This file includes the code for the Logout page
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
      <h2 className='mt-5 mb-10 flex items-center justify-center'>Are you sure you'd like to log out?</h2>
      <div className='mt-5 mb-10 flex items-center justify-center'>
        <button className='bg-lime rounded-md text-ivory hover:bg-limeCream px-5 py-5' onClick={handleLogout}>Logout</button>
      </div>
    </>
  )
}

export default Logout