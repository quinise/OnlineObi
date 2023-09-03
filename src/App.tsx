import './css/App.css'
import Auth from './components/Auth';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import {Link , Route, Routes} from "react-router-dom";
import Logout from './components/Logout';

function App() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/logout">Logout</Link>
      <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/dashboard" element={
            <Auth>
              <Dashboard/>
            </Auth>
          }/>
          <Route path="/logout" element={
            <Auth>
              <Logout/>
            </Auth>
          }/>
          <Route path="/login" element={<Login/>} />
      </Routes>
    </div>

  );
}

export default App
