import React, { useState } from 'react';
import './Alert.css'

const Alert = ({ message, blueButton, blueButtonFunc, lightBlueButton, lightBlueButtonFunc, onClose, isOpen }) => {
    if (!isOpen) {
        return null;
    }
    return (
        <div className="modal-overlay">
        <div className="modal-content">
            <div className="modal-header">
                <h3>{message}</h3>
                <button className="modal-close-button" onClick={onClose}>&times;</button>
            </div>
            <div className="buttonContainer">
                <button className="blueButton" onClick={blueButtonFunc}>{blueButton}</button>
                <button className="lightBlueButton" onClick={lightBlueButtonFunc}>{lightBlueButton}</button>
            </div>
        </div>
        </div>
  );
};


export default Alert;