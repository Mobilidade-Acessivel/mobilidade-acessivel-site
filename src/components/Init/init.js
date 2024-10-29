import React from 'react';
import { useNavigate } from 'react-router-dom';
import './init.css'; 

function Init() {
    const navigate = useNavigate();

    const trocarParaRegister = () => {
      navigate('/login');
    }


    return (
        <div className='containe-principal'>
            <div className='botoes'>
            <button className='suporte' onClick={trocarParaRegister}>
                Login
            </button>
            </div>
        </div>

    );
  }
  
export default Init;