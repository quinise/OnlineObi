// This file includes the code for the Logout page
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import Button from "./ui/Button";

const Logout = () => {

    const handleLogout = async () => {
      try {
        await signOut(auth);
        // Successful Logout — navigate without importing react-router-dom
        try {
          window.history.pushState({}, '', '/');
          window.dispatchEvent(new PopStateEvent('popstate'));
        } catch (navErr) {
          // console.error('Navigation after signOut failed', navErr);
        }
      } catch (error) {
        // Logout unsuccessful — log full diagnostics
        console.error('Logout Error:', error);
        if (error && (error as Error).stack) console.error((error as Error).stack);
      }
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