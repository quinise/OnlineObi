import { auth } from "./../../GoogleProvider.tsx";
import { useAuthState } from "react-firebase-hooks/auth";


const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <>
      <h1>Dashboard</h1>
      <div className="card">
              {user && <h2>Welcome, {user.displayName}</h2>}
              {error && <h2>Error: {String(error)}</h2>}
              {loading && <h2>Loading...</h2>}
      </div>
    </>
  )
}

export default Dashboard