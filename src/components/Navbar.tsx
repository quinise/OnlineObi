// This file provides a Navbar (regular or mobile sized) for all the page components in the App
import { useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.config";
import { NavLink } from '../interfaces/NavLink';
import MobileMenu from './../components/MobileMenu';
import WebMenu from './../components/WebMenu';
import Button from "./ui/Button";
     
// Defining routes links
const signInNavLinks: NavLink[] = [
  {
    text: "Login",
    path: "/login"
  }
];

const authNavLinks: NavLink[] = [
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

  // While the auth state is initializing, avoid showing the login link
  // which would flash briefly before the auth hook resolves.
  if (loading) {
    return (
      <nav className="pt-10 p-5 w-full flex items-center justify-center">
        {/* keep the same spacing but show nothing while loading */}
        <div style={{ width: '100%', height: 1 }} />
      </nav>
    );
  }

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
        <nav className="w-full flex items-center justify-center">
          <WebMenu navLinks = { authNavLinks } />
          <div className="flex justify-end w-full sm:hidden">
            <Button variant="ghost" size="md" className="rounded-full px-5 py-2" onClick={() => {setMobileNavOpen(true);}}>Menu</Button>
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