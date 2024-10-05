import React from 'react';
import './profile.css'
import pfp from './assets/pfp.png';

function Profile() {

    return (
        <div className='container-principal'>
            <div className='imagem'>
                <img src={pfp} className='pfp' alt="Profile Picture"/>
            </div>

            <div className='nome-config'>
            <input type="text" className='nome' placeholder='Jefferson'/>
            <input type="text" className='sobrenome' placeholder='Pires'/>
            </div>
        </div>


    );
  }
  
export default Profile;