// This file provides a Navbar (regular or mobile sized) for all the page components in the App
import { useState } from 'react'
import { auth } from "./../../GoogleProvider.tsx";
import { useAuthState } from "react-firebase-hooks/auth";
import WebMenu from './../components/WebMenu'
import MobileMenu from './../components/MobileMenu'
     
// Defining routes links
const signInNavLinks = [
  {
    text: "Login",
    path: "/login"
  }
];

const authNavLinks = [
  {
    text: "Dashboard",
    path: "/dashboard"
  },

  {
    text: "Cast List",
    path: "/castList"
  },

  {
    text: "Logout",
    path: '/logout'
  }

];

const Navbar = () => {
   const [user, loading, error] = useAuthState(auth);
   const [mobileNavOpen, setMobileNavOpen] = useState(false);

  if (error) {
    return (
      <nav className="pt-10 p-5 w-full flex items-center justify-center">
        <WebMenu navLinks = { signInNavLinks } />
      </nav>
    )
  }

  if (user) {
    return (
      <div>
        <nav className="w-full flex items-center justify-center inline">
          <WebMenu navLinks = { authNavLinks } />
          <div className="flex justify-end w-full sm:hidden">
            <button className="bg-white text-forrest font-serif shadow-md px-5 py-2 rounded-full" onClick={() => {setMobileNavOpen(true);}}>Menu</button>
          </div>
          { mobileNavOpen ? (<MobileMenu navLinks={ authNavLinks } close={() => setMobileNavOpen(false)} />) : (<></>) }
        </nav>
      </div>
      
    )
  } else {
    return (
      <nav className="pt-10 p-5 w-full flex items-center justify-center">
        <WebMenu navLinks = {signInNavLinks} />
      </nav>
    )
  }
}

export default Navbar