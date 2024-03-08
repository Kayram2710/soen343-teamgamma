import logo from './logo.svg';
import './App.css';
import api from './api/axiosConfig';
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/login/Register';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem('loggedInUser')) || null
  );
  useEffect(() => {
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
  }, [loggedInUser]);
  const checkLoggedIn = () => {
    console.log(loggedInUser);
    return loggedInUser != null;
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={checkLoggedIn() ? <Home loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} />} />
          <Route path="/register" element={<Register setLoggedInUser={setLoggedInUser} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;