import React from 'react';
import { useNotification } from './NotificationContext';
import closeIcon from '../../img/close.png';

const Notification = () => {
  const { notifications, hideNotification } = useNotification();

  if (!notifications.length) return null;

  return (
    <div style={{
      position: 'fixed', 
      top: '20px', 
      right: '20px', 
      zIndex: '1000',
    }}>
      {notifications.map((notification, index) => (
        <div key={index} style={{
          backgroundColor: '#E1C5F5',
          padding: '20px',
          borderRadius: '5px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          fontSize: '16px',
          fontWeight: '700',
          color: '#3E456F',
          marginBottom: '10px', // Расстояние между уведомлениями
          display: 'flex',
          alignItems: 'center',
        }}>
          {notification}
          <button 
            onClick={() => hideNotification(index)} 
            style={{ marginLeft: '10px', border: 'none', fontWeight: '700', width: '20px', height: '20px' }}>
            <img width='20px' height='20px' alt='' src={closeIcon}></img>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notification;
