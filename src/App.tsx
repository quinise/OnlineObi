import './css/App.css'
// import Home from "./components/Home";
import { auth, signInWithGoogle } from "./GoogleProvider";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user, loading, error] = useAuthState(auth);
  return (<div className='App'>
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
    </div>
  );
}

export default App
