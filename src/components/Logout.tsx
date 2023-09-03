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
          <div>
            <button onClick={handleLogout}>
              Logout
            </button>
          </div>
  )
}

export default Logout