import './css/App.css'
import Auth from './components/Auth';
// import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import {Link , Route, Routes} from "react-router-dom";
import Logout from './components/Logout';

function App() {
  return (
    <div className='container'>
      <div className='mt-5 mb-7 relative'>
        <Link to="/"><p className='ml-10 mr-10 inline'>Home</p></Link>
        <Link to="/dashboard"><p className='ml-10 mr-10 inline'>Dashboard</p></Link>
        <Link to="/logout"><p className='ml-10 absolute top-0 right-0 inline'>Logout</p></Link>
      </div>
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
