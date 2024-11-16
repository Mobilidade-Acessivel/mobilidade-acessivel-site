import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/login'; 
import Home from './components/Home/home';
import MapPage from './components/GPs/MapPage'; 
import Config from './components/Config/config';
import './styles/GlobalStyles.css'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Página de registro */}
        <Route path="/home" element={<Home />} /> {/* Página inicial do app */}
        <Route path="/config" element={<Config />} /> {/* Página de configurações */}
        <Route path="/MapPage" element={<MapPage />} /> {/* Página do mapa */}
      </Routes>
    </Router>
  );
}

export default App;
