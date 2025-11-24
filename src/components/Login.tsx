// This file includes the code for the Login page
import { motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.config";
import { signInWithGoogle } from "./../../GoogleProvider";
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
                        src="../assets/ObiLogo.png"/>
                </div>
                <h3 className="text-2xl text-mahogany w-full mb-5 font-serif flex items-center justify-center">What is Obi?</h3>
                <p className="text-1xl text-mahogany/90 font-sans-serif w-2/5 mb-10 mx-auto"><b>Obi is a divination system used in the spiritual science, IFA. To cast, the diviner throws kola nut, coconut pieces, or even pennies on the ground; then interprets an answer based on how the pieces land...</b></p>
                <div className="bg-forrest/60 border-2 border-forrest/50 rounded-md p-5 h-48 w-2/5 mb-12 mx-auto shadow-md">
                    <h2 className='text-3xl text-forrest font-sans-serif mb-2 flex items-center justify-center'><b>Login to Online Obi</b></h2>
                    <div className='mt-5 mb-10 pb-8 flex items-center justify-center'>
                        <button className='bg-googleBlue px-5 py-5' onClick={signInWithGoogle}><img className="object-cover h-10 w-10 mr-4 inline" src="../assets/GoogleIcon.png"/><p className="text-white font-bold inline">Sign in with Google</p></button>
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