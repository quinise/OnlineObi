// This file includes the code for the Logout page
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from "../../firebase.config";
import Button from "./ui/Button";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => {
          // Successfull Logout
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
        <Button variant="primary" size="md" className="px-5 py-5" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </>
  )
}

export default Logout