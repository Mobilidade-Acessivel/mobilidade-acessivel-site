// Import necessário para navegação e estilos
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'; 
import logo from './favicon.png';

function Login() {
  const navigate = useNavigate();

  const trocarParaGPS = () => {
    navigate('/MapPage')
  }

  return (
    <div className='principal'>
      <img src={logo} alt="Logo do Projeto" className="logo" />
      <div className="container">
        <form>
          <h1>Acesse o site</h1>
          
          <div className="input-container">
            <input placeholder="Email" type="email" required />
            <img
              className="login-image"
              width="20"
              height="20"
              src="https://img.icons8.com/ios/50/user--v1.png"
              alt="user icon"
            />
          </div>

          <div className="input-container">
            <input placeholder="Senha" type="password" required />
            <img
              width="20"
              height="20"
              src="https://img.icons8.com/ios/50/lock--v1.png"
              alt="lock icon"
            />
            <a href="#">Esqueci a minha Senha</a>
          </div>
          
          <button type="submit" className="submit-button" onClick={trocarParaGPS}>Acessar</button>

          <div className="register-link">
            <p>Não tem cadastro ? <a href="#">Cadastre-se</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
