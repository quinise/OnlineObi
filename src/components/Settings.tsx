// This file provides the codes for the Settings menu that appears when the user clicks on the gear icon in the top right corner
import { deleteUser } from "firebase/auth";
import React, { useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { auth } from "../../firebase.config";
import Loader from './Loader.tsx';
import Button from './ui/Button';

function SettingsMenu ({ close }: { close: () => void }) {
    const [animation, setAnimation] = useState(false);
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    // Deletes the logged in user or displays error message
    const handleDeleteAccount = () => {
        if (!user) {
            console.log("No User to delete");
        } else {
            deleteUser(user).then(() => {
                // Successfull Logout
                navigate('/');
                console.log("Deleted user successfully")
              }).catch((error) => {
                // Logout unsuccessfull
                console.log("Delete User Error: " + error);
              })
        }
    }

    React.useEffect(() => {
        setAnimation(true);
      }, [close]);

    return (
    <div>
        <div className="fixed inset-0 h-screen w-full backdrop-blur-sm bg-forrest bg-opacity-60"></div>
        <div className="fixed inset-0 p-5">
            <div className={`w-full bg-ivory rounded-xl p-5 transition-all ${animation ? "scale-100" : "scale-95"}`}>
                <div className="relative flex items-center justify-between">
                    <h1 className="text-3xl text-forrest font-serif absolute left-1/2 transform -translate-x-1/2">Settings</h1>
                    <IoCloseOutline className="text-forrest w-7 h-7 hover:scale-110 transition-all cursor-pointer" onClick={() => {close()}}/>
                </div>
                <div className="mt-5">
                    <p className='flex items-center justify-center'>Would you like to delete your account?</p>
                    <div>
                    {error && <h2 className="text-3xl text-forrest font-serif flex items-center justify-center">Error: {String(error)}</h2>}
                    {loading && <Loader/>}
                    </div>

                                        <div className='mt-5 flex items-center justify-center'>
                                                <Button variant="primary" size="md" className="px-5 py-5" onClick={handleDeleteAccount}>
                                                    Delete Account
                                                </Button>
                                        </div>
                </div> 
        </div>
        </div>
    </div>
    )
}

const Settings = ()  => {
    const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);

  return (
    <>
        <div className="mt-5 mb-0 flex justify-end w-full">
                <Button
                    aria-label="Open settings"
                    variant="ghost"
                    size="md"
                    className="bg-white text-forrest font-serif shadow-md px-5 py-2 rounded-full transition transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-forrest"
                    onClick={() => { setSettingsMenuOpen(true); } }
                >
                    <img src="../assets/settings.png" alt="settings" className="w-5 h-5 transition-opacity hover:opacity-90" />
                </Button>
        </div>
    <div>
    { settingsMenuOpen ? (<SettingsMenu close={() => setSettingsMenuOpen(false)} />) : (<></>) }
    </div>
    </>

 )
}

export default Settings