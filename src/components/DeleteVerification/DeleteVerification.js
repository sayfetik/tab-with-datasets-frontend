import React, { useState, useEffect } from 'react';
import './DeleteVerification.css';
import { BackendConnector } from '../../components';
import { useNavigate } from 'react-router-dom';

const DeleteVerification = ({ isOpen, onClose, id, back }) => {
    const navigate = useNavigate();
    const [deleteWarning, setdeleteWarning] = useState(false);

    useEffect(()=>{
      setdeleteWarning(false);
    })
  
    const handleDeleteClick = (event) => {
      event.preventDefault();
      BackendConnector.delete(id)
        .then(() => {
            if (back) navigate(-1);
            else onClose();
        })
        .catch(error => {
          setdeleteWarning(true);
          console.error(error);
        });
    }
    if (!isOpen) {
      return null;
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
        {deleteWarning && <p className='warning'>Произошла ошибка. Повторите попытку позже.</p>}
      </div>
    </div>
  );
}

export default DeleteVerification;
