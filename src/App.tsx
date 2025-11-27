// Simplified layout component. Route definitions are handled in `main.tsx`
import React from 'react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Settings from './components/Settings';
import './css/App.css';

const App: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className='bg-ivory min-h-screen flex flex-col'>
      <main className="flex-grow">
        <Settings />
        <Navbar />
        <div>{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
