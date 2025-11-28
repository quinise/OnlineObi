// This file includes the code for the Login page
import { auth, signInWithGoogle } from "./../../GoogleProvider.tsx";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.config";
import { signInWithGoogle } from "./../../GoogleProvider";
import { motion } from "framer-motion";
import Loader from "./Loader.tsx";

const logoAnimation = {
    animate: {
        rotate: [50,200, 200, 0],
        transition: {
            duration: 4
        }
    }
}

const Login = () => {
    const [user, loading, error] = useAuthState(auth);

    React.useEffect(() => {
        // After successful sign-in, navigate to the dashboard using history API
        if (user) {
            try {
                window.history.pushState({}, '', '/dashboard');
                window.dispatchEvent(new PopStateEvent('popstate'));
            } catch (e) {
                // ignore if environment blocks programmatic navigation
            }
        }
    }, [user]);

    return (
        // If there is a user, welcome them... If there is an error, show the message, if the page is loading show the loader
        <div className="bg-ivory h-screen">
            {user && <h2 className="text-3xl text-forrest font-serif flex items-center justify-center">Welcome, {user.displayName}!</h2>}
            {error && <h2 className="text-3xl text-forrest font-serif flex items-center justify-center">Error: {String(error)}</h2>}
            {loading && <Loader/>}
            {!user && !loading && !error && (
            <>
                <h1 className='text-7xl text-forrest font-serif mt-10 mb-10 flex items-center justify-center'>Online Obi</h1>
                <div>
                    <motion.img className="object-contain h-48 w-96 mb-10 mx-auto block"
                        variants={logoAnimation}
                        animate="animate"
                        src="src/assets/ObiLogo.png"/>
                </div>
                <div className="bg-forrest border-2 border-forrest/60 rounded-md p-6 h-40 max-w-md w-full mb-12 mx-auto shadow-md">
                    <h2 className='text-3xl text-ivory font-sans-serif mb-2 flex items-center justify-center'><b>Login to Online Obi</b></h2>
                                        <div className='mt-6 mb-6 pb-9 flex items-center justify-center'>
                                            <Button onClick={signInWithGoogle} variant="secondary" size="md" className="flex items-center gap-3 px-6 !text-forrest">
                                                <img className="object-cover h-6 w-6" src="../assets/GoogleIcon.png" alt="Google logo" />
                                                <span className="font-bold text-forrest">Sign in with Google</span>
                                            </Button>
                                        </div>
                </div>
                <div className="pb-10">
                    <h3 className="text-2xl text-mahogany w-full mt-5 mb-5 font-serif flex items-center justify-center">Why Online Obi?</h3>
                    <p className="text-1xl text-mahogany/90 font-sans-serif w-2/5 mb-5 mx-auto"><b>Forgot your pennies or kola nuts? Online Obi casts Obi divination online! Each cast includes an Odu and it's interpretation, a yes/no/maybe result, and a set of four kola nuts. Casts can be saved with a title and a note for later recollection.</b></p>
                </div>
                
            </>
            )}
        </div>
    )
}

export default Login;