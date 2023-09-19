// This file includes the App's routes and provides the navigation across each page
import './css/App.css'
import { auth } from "./../GoogleProvider.tsx";
import { useAuthState } from "react-firebase-hooks/auth";
import Auth from './components/Auth';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { Route, Routes } from "react-router-dom";
import Logout from './components/Logout';
import CastList from './components/CastList.tsx';
import Navbar from './components/Navbar'

function App() {
  const [user, loading, error] = useAuthState(auth);

  if (error) {
    console.log("useAuthState Error: " + error);
    return (
      // No Navbar with useAuthState error, but a link to login instead
      <div className='bg-ivory'>
        <Routes>
          <Route path="/" element={ <Login/> } /> 
          <Route path="/login" element={ <Login/> } />
        </Routes>
      </div>
  )}

  if (user) {
    return (
      // Navbar with a valid user, includes logout
      <div className="bg-ivory h-screen">
        <Navbar />
        <div>
          <Routes> 
            <Route path="/dashboard" element={
              <Auth>
                <Dashboard/>
              </Auth>
            } />
            <Route path="/castList" element={
              <Auth>
                <CastList />
              </Auth>
            } />
            <Route path="/logout" element={
              <Auth>
                <Logout />
              </Auth>
            } />
          </Routes>
        </div>
      </div>
    );
  } else {
    // return the Login page if there is no user
    return (
      <>
      <div className='bg-ivory'>
        <Routes>
          <Route path="/" element={ <Login/> } /> 
          <Route path="/login" element={ <Login/> } />
        </Routes>
      </div>
      </>
    )
  }
}

export default App
