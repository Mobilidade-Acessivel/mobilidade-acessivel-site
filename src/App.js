import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Init from './components/Init/init'
import Register from '../src/components/Register/register';
import Home from './components/Home/home';
import Profile from './components/Profile/profile'
import './styles/GlobalStyles.css';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Init />} /> 
        <Route path="/src/components/Register/register.js" element={<Register />} /> 
        <Route path="/home" element={<Home />} /> 
        <Route path="/profile" element={<Profile />} /> 
      </Routes>
    </Router>
  );
}

export default App;


