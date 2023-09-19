import { useState } from 'react'
import { auth } from "./../../GoogleProvider.tsx";
import { useAuthState } from "react-firebase-hooks/auth";
import WebMenu from './../components/WebMenu'
import MobileMenu from './../components/MobileMenu'

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
   const [open, setOpen] = useState(false);

  if (error) {
    return (
      <nav className="pt-10 p-5 w-full flex items-center justify-center">
        <WebMenu navLinks = { signInNavLinks } />
      </nav>
    )
  }

  if (user) {
    return (
      <nav className="pt-10 p-5 w-full flex items-center justify-center">
        <WebMenu navLinks = { authNavLinks } />
        <div className="flex justify-end w-full sm:hidden">
          <button className="bg-white text-forrest shadow-md px-5 py-2 rounded-full" onClick={() => {setOpen(true);}}>Menu</button>
        </div>
        {open ? (<MobileMenu navLinks={ authNavLinks } close={() => setOpen(false)} />) : (<></>)}
      </nav>
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