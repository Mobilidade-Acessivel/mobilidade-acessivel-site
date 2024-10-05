import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Init from './components/Init/init';
import Register from './components/Register/register'; 
import Home from './components/Home/home';
import Profile from './components/Profile/profile';
import MapPage from './components/GPs/MapPage'; // Importando o novo componente MapPage
import './styles/GlobalStyles.css'; // Global styles

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Init />} /> {/* Página inicial */}
        <Route path="/register" element={<Register />} /> {/* Página de registro */}
        <Route path="/home" element={<Home />} /> {/* Página inicial do app */}
        <Route path="/profile" element={<Profile />} /> {/* Página de perfil */}
        <Route path="/MapPage" element={<MapPage />} /> {/* Página do mapa */}
      </Routes>
    </Router>
  );
}

export default App;
