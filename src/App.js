// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoPage from './pages/TodoPage';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    // You should implement the logic to authenticate the user on the backend
    // For simplicity, assume successful authentication and set the user state
    setUser(userData);
  };

  const handleLogout = () => {
    // Implement logout logic (clear user data, etc.)
    setUser(null);
  };

  return (
    <div id="main-app" className="bg-gray-50 dark:bg-gradient-to-tr from-purple-400 via-black to-teal-700 min-h-screen flex flex-col items-center justify-center px-4 lg:px-20">
      <Router>
      <Navbar/>
      <div className=" dark:hidden fixed flex justify-center items-center w-full max-w-lg">
        <div className="absolute top-[-5-5rem] right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-[-10.74rem] left-3 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>
    
      <Routes>
        <Route path="/" element={<Homepage onLogin={handleLogin} />} />
        <Route exact path="/login" element={<Homepage onLogin={handleLogin} />} />
        <Route path="/app" element={<PrivateRoute><TodoPage user={user} onLogout={handleLogout} /> </PrivateRoute>} />
        <Route path="*" element={<Homepage/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
