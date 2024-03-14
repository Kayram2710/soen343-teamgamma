import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard'; // Import Dashboard component
import Layout from './components/Layout';
import Profile from './components/Profile'; // Import Profile component
import Settings from './components/Settings'; // Import Settings component
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/login/Register';
import HouseLayout from './components/house/HouseLayout';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem('loggedInUser')) || null
  );

  useEffect(() => {
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
  }, [loggedInUser]);

  const checkLoggedIn = () => {
    return loggedInUser != null;
  }

  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout loggedInUser={loggedInUser} />}>
            <Route index element={checkLoggedIn() ? <Home loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/> : <Navigate to="/login" />} />
            <Route path="/dashboard" element={checkLoggedIn() ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/settings" element={checkLoggedIn() ? <Settings /> : <Navigate to="/login" />} />
            <Route path="/profile" element={checkLoggedIn() ? <Profile user={loggedInUser} /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} />} />
            <Route path="/register" element={<Register setLoggedInUser={setLoggedInUser} />} />
            <Route path="/layout" element={<HouseLayout/>}/>
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </div>
  );
}

export default App;
