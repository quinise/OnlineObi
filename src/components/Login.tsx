// This file includes the code for the Login page
import React from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.config";
import { getRedirectResult } from 'firebase/auth';
import { signInWithGoogle } from "./../../GoogleProvider";
import Loader from "./Loader.tsx";
import Button from "./ui/Button";

// logo animation removed to avoid motion/spinning in the Login page

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

    // Check for redirect result on mount (handles signInWithRedirect flow)
    React.useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                console.log('[Login] getRedirectResult: checking for redirect result...');
                const res = await getRedirectResult(auth as any);
                console.log('[Login] getRedirectResult raw:', res);
                if (!mounted) return;
                if (res && (res as any).user) {
                    console.log('[Login] getRedirectResult: got user, navigating to /dashboard');
                    try {
                        window.history.pushState({}, '', '/dashboard');
                        window.dispatchEvent(new PopStateEvent('popstate'));
                    } catch (e) {
                        console.error('[Login] navigation after redirect result failed', e);
                    }
                } else {
                    console.log('[Login] getRedirectResult: no result. sessionStorage pendingRedirect=', sessionStorage.getItem('firebase:pendingRedirect'));
                }
            } catch (err) {
                console.error('[Login] getRedirectResult error:', err);
                try {
                    console.log('[Login] sessionStorage pendingRedirect=', sessionStorage.getItem('firebase:pendingRedirect'));
                } catch (e) {
                    // ignore
                }
            }
        })();
        return () => { mounted = false; };
    }, []);

    return (
        // If there is a user, welcome them... If there is an error, show the message, if the page is loading show the loader
        <div className="bg-ivory min-h-full flex flex-col items-center">
            {user && <h2 className="text-3xl text-forrest font-serif flex items-center justify-center">Welcome, {user.displayName}!</h2>}
            {error && <h2 className="text-3xl text-forrest font-serif flex items-center justify-center">Error: {String(error)}</h2>}
            {loading && <Loader/>}
            {!user && !loading && !error && (
            <>
                <h1 className='text-7xl text-forrest font-serif mt-10 mb-10'>Online Obi</h1>
                <div>
                    <img className="object-scale-down h-64 w-64 mx-auto mt-10 mb-10" src="../assets/favicon.png" alt="Online Obi logo" />
                </div>
                <div className="bg-forrest border-2 border-forrest/60 rounded-md p-6 h-40 max-w-md w-full mb-12 mx-auto shadow-md">
                    <h2 className='text-3xl text-ivory font-sans-serif mb-2 flex items-center justify-center'><b>Login to Online Obi</b></h2>
                                                                                <div className='mt-6 mb-8 pb-2 flex flex-col items-center justify-center'>
                                                                                        <Button onClick={signInWithGoogle} variant="secondary" size="md" className="flex items-center gap-3 px-6 !text-forrest">
                                                                                                <img className="object-cover h-6 w-6" src="../assets/GoogleIcon.png" alt="Google logo" />
                                                                                                <span className="font-bold text-forrest">Sign in with Google</span>
                                                                                        </Button>
                                                                                </div>
                </div>
                <div className="pb-10 max-w-prose px-4 text-center">
                    <h3 className="text-2xl text-mahogany w-full mt-5 mb-5 font-serif flex items-center justify-center">Why Online Obi?</h3>
                    <p className="text-1xl text-mahogany/90 font-sans-serif mb-5"><b>Forgot your pennies or coconut shells? Online Obi casts Obi divination online! Each cast includes an Odu and it's interpretation, a yes/no/maybe result, and a set of four kola nuts. Casts can be saved with a title and a note for later recollection.</b></p>
                </div>
                <h3 className="text-2xl text-mahogany w-full mb-5 font-serif flex items-center justify-center">What is Obi?</h3>
                <p className="text-1xl text-mahogany/90 font-sans-serif max-w-prose mb-10 text-center px-4"><b>Obi is a divination system used in the spiritual science, IFA. To cast, the diviner throws kola nut, coconut pieces, or even pennies on the ground; then interprets an answer based on how the pieces land...</b></p>
            </>
            )}
        </div>
    )
}

export default Login;