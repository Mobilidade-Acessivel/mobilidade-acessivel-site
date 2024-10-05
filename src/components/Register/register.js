import React from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css'; 
import favicon from './favicon.png';
import google from './assets/google.png'
import facebook from './assets/facebook.png'


function Register() {
  const navigate = useNavigate(); //funçao para navegar entre as paginas

  const trocarParaHome = () => {
    // colocar a lógica de Login aqui (caso eu esqueça)
    navigate('/home');
  }

  const loginGoogle = () => {
    window.location.href = 'https://accounts.google.com/AddSession/signinchooser?service=accountsettings&continue=https%3A%2F%2Fmyaccount.google.com%2F&ec=GAlAwAE&hl=pt_BR&authuser=0&ddm=0&flowName=GlifWebSignIn&flowEntry=AddSession';
}

  const loginFacebook = () => {
      window.location.href = 'https://pt-br.facebook.com/login/device-based/regular/login/';
  }

  return (
    <div class='container-principal'>

      <div className='logo-container'>
        <img src={favicon} alt="Logo" className='mob-image'/>
        <h1 className='mob-text'>Mobilidade Acessível</h1>
        <h2>Utilize do nosso aplicativo onde, quando e quantas vezes for necessário</h2>

        {/* Imagem de logo ou qualquer outra coisa */}
      </div>

      <div className='registro-container'>
          <div class="inputs">
            <h1 className='login-text'>LOGIN</h1>
            <input type="text" placeholder="Seu email" className='email'/>
            <input type="text" placeholder="Sua senha" className='senha'/>
            <div>
              <button className='botao-entrar' onClick={trocarParaHome}>
                Acessar
              </button>
            </div>

          <div className='logs'>
            <img src={facebook} alt="Logo" className='facebook' onClick={loginFacebook}/>
            <img src={google} alt="Logo" className='google' onClick={loginGoogle}/>
          </div>
          </div>
          
        </div>

    </div>
  );
}
export default Register;
