import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css'; 
import favicon from './favicon.png';

function Home() {
  const navigate = useNavigate();

  const trocarParaConfig = () => {
    navigate('/config');
  };

  const trocarParaGPS = () => {
    navigate('/MapPage');
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-text">
          <p>
            Mobilidade acessível é um conceito essencial para garantir que todas as pessoas, independentemente de
            suas limitações físicas, cognitivas ou sensoriais, possam se deslocar com segurança, autonomia e
            dignidade nos espaços urbanos. Trata-se de um princípio fundamental para uma sociedade inclusiva, que
            valoriza a diversidade e promove o direito de todos à cidade.
          </p>
          <br />
          <p>
            A mobilidade acessível envolve a implementação de medidas que visam eliminar barreiras físicas e
            culturais, facilitando o acesso ao transporte público, calçadas, ciclovias, edifícios e serviços
            públicos. Exemplos incluem a instalação de rampas e elevadores, a ampliação de calçadas, o uso de pisos
            táteis para deficientes visuais, e veículos adaptados para cadeirantes. Também engloba políticas que
            incentivam a inclusão digital, permitindo que aplicativos de transporte e navegação estejam acessíveis a
            quem tem dificuldades auditivas, visuais ou motoras.
          </p>
          <br />
          <p>
            Essas adaptações não só beneficiam pessoas com deficiência, mas também idosos, pais com carrinhos de
            bebê, e até mesmo turistas com bagagem, tornando o ambiente urbano mais seguro e funcional para todos.
            Com a implementação de uma mobilidade acessível, cria-se uma cidade que não apenas acolhe, mas celebra
            as diferenças e fortalece o direito à mobilidade universal.
          </p>
          <br />
          <br />
        </div>

        <div className="home-image">
          <img src={favicon} alt="Gato de óculos" className='mob' />

          <div className="home-navigation">
            <button className="home-nav-button" onClick={trocarParaGPS}>
              GPS
            </button>
            <button className="home-nav-button" onClick={trocarParaConfig}>
              Configurações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
