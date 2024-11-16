import React, { useState } from 'react';
import './config.css';
import { useNavigate } from 'react-router-dom';

function Settings() {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    displayName: 'Seu nome',
    username: 'Username123',
    phoneNumber: '+55 81 98849-4551',
    email: 'exemplo@gmail.com',
    birthday: '2000-01-01',
    gender: 'masculino',
    language: 'pt-br',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const saveSettings = () => {
    console.log("Settings saved:", settings);
    alert("As configurações foram salvas!");
  };

  return (
    <div className="settings-container">
      <h1>Configurações</h1>
      
      <section className="account-info">
        <h2>Account Info</h2>
        <label>
          Nome:
          <input className='text'
            type="text"
            name="displayName"
            value={settings.displayName}
            onChange={handleChange}
          />
        </label>
        <label>
          Nome de usuário:
          <input
            type="text"
            name="username"
            value={settings.username}
            disabled
          />
        </label>
        <label>
          Número de Telefone:
          <input
            type="text"
            name="phoneNumber"
            value={settings.phoneNumber}
            onChange={handleChange}
          />
        </label>
        <label>
          Endereço de E-mail:
          <input
            type="email"
            name="email"
            value={settings.email}
            onChange={handleChange}
          />
        </label>
      </section>

      <section className="login-methods">
        <h2>Metódos de Login</h2>
        <button onClick={() => alert("Passkey Gerada: ")}>
          Adicione uma Passkey
        </button>
      </section>

      <section className="personal-info">
        <h2>Pessoal</h2>
        <label>
          Aniversário:
          <input
            type="date"
            name="birthday"
            value={settings.birthday}
            onChange={handleChange}
          />
        </label>
        <label>
          Gênero:
          <select name="gender" value={settings.gender} onChange={handleChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
      </section>

      <section className="preferences">
        <h2>Preferências</h2>
        <label>
          Idioma:
          <select name="language" value={settings.language} onChange={handleChange}>
            <option value="pt">Português</option>
            <option value="es">Espanhol</option>
            <option value="en">Inglês</option>
          </select>
        </label>
      </section>

      <button onClick={saveSettings}>Save Changes</button>

      <div className="navigation-buttons">
        <button onClick={() => navigate('/home')}>Home</button>
        <button onClick={() => navigate('/config')}>Config</button>
      </div>
    </div>
  );
}

export default Settings;
