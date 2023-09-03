import { auth, signInWithGoogle } from "./../../GoogleProvider.tsx";
import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {
    const [user, loading, error] = useAuthState(auth);

    return (
        <div className="card">
            {user && <h2>Welcome {user.displayName}</h2>}
            {error && <h2>Error: {String(error)}</h2>}
            {loading && <h2>Loading...</h2>}
            {!user && !loading && !error && (
            <>
                <h2>Login</h2>
                <button onClick={signInWithGoogle}>Sign in with Google</button>
            </>
            )}
        </div>
    )
}

export default Login;