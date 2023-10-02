// This file includes the code for the Login page
import { auth, signInWithGoogle } from "./../../GoogleProvider.tsx";
import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {
    const [user, loading, error] = useAuthState(auth);

    return (
        // Displayed user information
        <div className="bg-ivory h-screen">
            {user && <h2 className="text-3xl text-forrest font-serif flex items-center justify-center">Welcome, {user.displayName}!</h2>}
            {error && <h2 className="text-3xl text-forrest font-serif flex items-center justify-center">Error: {String(error)}</h2>}
            {loading && <h2 className="text-2xl text-forrest font-serif mt-48 flex items-center justify-center">Loading...</h2>}
            {!user && !loading && !error && (
            <>
                <h1 className='text-7xl text-forrest font-serif mt-10 mb-10 flex items-center justify-center'>Mobile Obi</h1>
                <img className="object-contain h-48 w-96 mb-10 mx-auto block" src="src/assets/ObiLogo.png"/>            
                <h3 className="text-2xl text-mahogany w-full mb-5 font-serif flex items-center justify-center">What is Obi?</h3>
                <p className="text-1xl text-mahogany/60 font-'sans-serif' w-2/5 mb-8 mx-auto">Obi is a divination system used in the spiritual science, IFA. To cast, the diviner throws kola nut, coconut pieces, or even pennies on the ground; then interprets an answer based on how the pieces land...</p>
                <div className="bg-forrest/60 border-2 border-forrest/50 p-5 h-48 w-2/5 mb-12 mx-auto shadow-md">
                    <h2 className='text-3xl text-forrest font-"sans-serif" mb-2 flex items-center justify-center'>Login to MobileObi</h2>
                    <div className='mt-5 mb-10 pb-8 flex items-center justify-center'>
                        <button className='bg-googleBlue px-5 py-5' onClick={signInWithGoogle}><img className="object-cover h-10 w-10 mr-4 inline" src="src/assets/GoogleIcon.png"/><p className="text-white font-bold inline">Sign in with Google</p></button>
                    </div>
                </div>
                <div className="pb-10">
                    <h3 className="text-2xl text-mahogany w-full mt-5 mb-5 font-serif flex items-center justify-center">Why Mobile Obi?</h3>
                    <p className="text-1xl text-mahogany/60 font-'sans-serif' w-2/5 mb-5 mx-auto">Forgot your pennies or kola nuts? Don't want to crouch in the street? Mobile Obi casts Obi divination online! Each cast includes an Odu and it's interpretation, a yes/no/maybe result, and a set of four kola nuts. Casts can be saved with a title and a note for later recollection.</p>
                </div>
                
            </>
            )}
        </div>
    )
}

export default Login;