import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css'; 
import favicon from './favicon.png';

function Home() {
  const navigate = useNavigate();

  const trocarParaConfig = () => {
    navigate('/config');
  }

  const trocarParaPerfil = () => {
    navigate('/profile')
  }

  const trocarParaContact = () => {
    navigate('/contact')
  }
  
  const trocarParaGPS = () => {
    navigate('/MapPage')
  }

  return (
    <div className='container-principal'>
        
      <div className='logo-container'>
      <img src={favicon} alt="Logo" className='mob-image'/>
      <h1 className='mob-text'>Mobilidade Acessível</h1>
      </div>

      <div className='missao'>
      <h1 className='text1'>Melhorando o Cotidiano com alguns clicks</h1>
        <hr className='barra'/>
        <h1 className='missao-text'>Missão</h1>
        <p>Facilitar a mobilidade e promover a inclusão para pessoas com limitações físicas</p>
      </div>

      <div className='botoes'>

      <button className='perfil' onClick={trocarParaPerfil}>
        Perfil
      </button>
      <button className='Configurações' onClick={trocarParaConfig}>
        Agenda
      </button>
      <button className='suporte' onClick={trocarParaContact}>
        Suporte
      </button>
      <button className='gps' onClick={trocarParaGPS}>
        GPS
      </button>

      </div>
    </div>
  );
}
export default Home;