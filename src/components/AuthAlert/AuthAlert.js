import React from 'react';
import './AuthAlert.css'
import { keycloak } from '../../keycloak';

const AuthAlert = ({isOpen, onClose}) => {
    if (!isOpen) {
        return null;
    }
    return (
        <div className="modal-overlay">
        <div className="modal-content-auth">
            <div className="modal-header">
                <h3 id='authModalLabel'>Войдите или зарегистрируйтесь</h3>
                <button className="modal-close-button" onClick={onClose}>&times;</button>
            </div>
            <div className="buttonContainer">
                <button className='lightBlueButton' onClick={() => keycloak.login()} style={{padding: '10px 40px', marginRight: '20px'}}>Войти</button>
                <button className='whiteBlueButton' onClick={() => keycloak.register()}>Зарегистрироваться</button>
            </div>
        </div>
        </div>
  );
};


export default AuthAlert;