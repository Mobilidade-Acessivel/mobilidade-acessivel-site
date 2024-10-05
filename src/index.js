import React from 'react';
import ReactDOM from 'react-dom/client'; // Mude para 'react-dom/client'
import './styles/GlobalStyles.css';
import App from './App';

// Criação do root da aplicação
const root = ReactDOM.createRoot(document.getElementById('root')); // Seleciona o elemento com id 'root'
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
