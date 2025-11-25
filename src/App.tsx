// This file includes the App's routes and provides the navigation across each page
import { useAuthState } from "react-firebase-hooks/auth";
import { Route, Routes } from "react-router-dom";
import { auth } from "../firebase.config";
import Auth from './components/Auth';
import CastList from './components/CastList.tsx';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Loader from './components/Loader.tsx';
import Login from './components/Login';
import Logout from './components/Logout';
import Navbar from './components/Navbar';
import Settings from './components/Settings.tsx';
import './css/App.css';

function App() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <Loader />
  }

  if (error) {
    console.log("useAuthState Error: " + error);
    // No Navbar with useAuthState error, but a link to login instead
    return (
      <div className='bg-ivory min-h-screen flex flex-col'>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={ <Login /> } /> 
            <Route path="/login" element={ <Login /> } />
          </Routes>
        </main>
        <Footer />
      </div>
    );
  }
  if (user) {
    return (
      // Navbar with a valid user, includes logout
      <div className="bg-ivory min-h-screen flex flex-col">
        <main className="flex-grow">
          <Settings />
          <Navbar />
          <div>
            <Routes> 
              <Route path="/" element={
                <Auth>
                  <Dashboard />
                </Auth>
              } />
              <Route path="/dashboard" element={
                <Auth>
                  <Dashboard />
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
        </main>
        <Footer />
      </div>
    );
  } else {
    // return the Login page if there is no user
    return (
      <div className='bg-ivory min-h-screen flex flex-col'>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={ <Login /> } />
            <Route path="/login" element={ <Login /> } />
          </Routes>
        </main>
        <Footer />
      </div>
    )
  }
}

export default App
