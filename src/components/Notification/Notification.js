import React from 'react';
import { useNotification } from './NotificationContext';
import closeIcon from '../../img/close.png';

const Notification = () => {
  const { notification, hideNotification } = useNotification();

  if (!notification) return null;

  return (
    <div style={{
      position: 'fixed', 
      display: 'flex',
      alignItems: 'center',
      top: '20px', 
      right: '20px', 
      backgroundColor: '#E1C5F5', 
      padding: '20px',
      borderRadius: '5px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
      zIndex: '1000',
      fontSize: '16px',
      fontWeight: '700',
      color: '#3E456F',
    }}>
      {notification}
      <button onClick={hideNotification} style={{ margin: '0px 10px', border: 'none', fontWeight: '700', width: '20px', height: '20px'}}><img width='20px' height='20px' src={closeIcon}></img></button>
    </div>
  );
};

export default Notification;
