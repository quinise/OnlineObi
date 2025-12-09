// This file includes the code for the Login page
import React from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase.config";
import { signInWithGoogle } from "./../../GoogleProvider";
import Loader from "./Loader.tsx";
import Button from "./ui/Button";

const Login = () => {
    const [user, loading, error] = useAuthState(auth);
    const [showDetails, setShowDetails] = React.useState(false);
    const navigate = useNavigate();
    
    React.useEffect(() => {
        // After successful sign-in, navigate to the dashboard
        if (user) {
            navigate('/dashboard', { replace: true });
        }
    }, [user, navigate]);

    return (
        // If there is a user, welcome them... If there is an error, show the message, if the page is loading show the loader
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 bg-ivory min-h-screen items-center justify-center">
            {user && <h2 className="text-3xl text-forrest font-serif flex items-center justify-center">Welcome, {user.displayName}!</h2>}
            {error && <h2 className="text-3xl text-forrest font-serif flex items-center justify-center">Error: {String(error)}</h2>}
            {loading && <Loader/>}
            {!user && !loading && !error && (
            <>
            <div className="w-full max-w-md mx-auto text-center px-4">
                <h1 className='text-4xl md:text-5xl text-forrest font-serif mt-5 mb-4'>Online Obi</h1>
                <img className="object-contain h-28 w-28 md:h-40 md:w-40 mx-auto mt-10 mb-10" src="../assets/favicon.png" alt="Online Obi logo" />
                <div className="bg-forrest border-2 border-forrest/60 rounded-md p-4 max-w-xs mx-auto shadow-md">
                    <h2 className='text-xl text-ivory font-sans-serif mb-2'><b>Login to Online Obi</b></h2>
                    <div className='mt-2 flex items-center justify-center'>
                        <Button onClick={signInWithGoogle} variant="secondary" size="md" className="flex items-center gap-3 px-4 !text-forrest">
                            <img className="object-cover h-5 w-5" src="../assets/GoogleIcon.png" alt="Google logo" />
                            <span className="font-bold text-forrest">Sign in with Google</span>
                        </Button>
                    </div>
                </div>

                {/* Informational toggle */}
                <div className="mt-4 lg:hidden md:hidden text-center">
                    <button onClick={() => setShowDetails(s => !s)} className="text-sm text-mahogany underline">
                        {showDetails ? 'Hide details' : 'Learn more about Online Obi'}
                    </button>
                </div>
            </div>


            {/* Details Section */}
            <div className={`mx-auto md:mx-0 max-w-md px-4 md:px-6 md:py-6 md:border-2 lg:border-2 border-mahogany/30 rounded-md bg-ivory shadow-md md:block lg:block ${showDetails ? 'block' : 'hidden'}`}>
                <div className="pb-6 text-center md:text-left">
                    <h3 className="text-2xl text-mahogany mt-5 mb-5 font-serif">Why Online Obi?</h3>
                    <p className="text-base text-mahogany/90 font-sans-serif mb-5"><b>Forgot your pennies or coconut shells? Online Obi casts Obi divination online! Each cast includes an Odu and it's interpretation, a yes/no/maybe result, and a set of four kola nuts. Casts can be saved with a title and a note for later recollection.</b></p>
                </div>
                <h3 className="text-2xl text-mahogany mb-5 font-serif text-center md:text-left">What is Obi?</h3>
                <p className="text-base text-mahogany/90 font-sans-serif mb-5 text-center md:text-left"><b>Obi is a divination system used in the spiritual science, IFA. To cast, the diviner throws kola nut, coconut pieces, or even pennies on the ground; then interprets an answer based on how the pieces land.</b></p>
            </div>
            </>
            )}
        </div>
    )
}

export default Login;