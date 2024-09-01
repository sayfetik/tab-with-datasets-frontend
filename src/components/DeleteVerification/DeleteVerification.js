import React from 'react';
import './DeleteVerification.css';
import { BackendConnector } from '../../components';
import { useNavigate } from 'react-router-dom';

const DeleteVerification = ({ isOpen, onClose, dataset, back }) => {
    const navigate = useNavigate();
  if (!isOpen) {
    return null;
  }
  
  const handleDeleteClick = (event) => {
    event.preventDefault();
    BackendConnector.delete(dataset.id)
        .then(response => {
            console.log(response);
            if (back) navigate(-1);
            else onClose();
        })
        .catch(error => {
            console.error(error);
        });
}

  return (
    <div className="modal-overlay">
      <div className="modal-content deleteVerification">
        <div className="modal-header">
          <h3>Вы действительно хотите удалить датасет?</h3>
        </div>
        <div id='deleteVerified'>
            <button className='lightBlueButton' onClick={onClose}>Отменить</button>
            <button className='lightRedButton' onClick={handleDeleteClick}>Удалить</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteVerification;
