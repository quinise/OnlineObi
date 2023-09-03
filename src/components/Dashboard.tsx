import { auth } from "./../../GoogleProvider.tsx";
import { useAuthState } from "react-firebase-hooks/auth";


const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <>
      <h1 className="text-3xl flex items-center justify-center">Dashboard</h1>
      <div className="card">
              {user && <h2 className="text-2xl flex items-center justify-center">Welcome, {user.displayName}</h2>}
              {error && <h2>Error: {String(error)}</h2>}
              {loading && <h2>Loading...</h2>}
      </div>
    </>
  )
}

export default Dashboard