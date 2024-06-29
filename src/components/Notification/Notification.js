import React from 'react';
import { useNotification } from './NotificationContext';

const Notification = () => {
  const { notification, hideNotification } = useNotification();

  if (!notification) return null;

  return (
    <div style={{ 
      position: 'fixed', 
      top: '20px', 
      right: '20px', 
      backgroundColor: '#E1C5F5', 
      padding: '20px', 
      borderRadius: '5px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
      zIndex: '1000',
      fontSize: '16px',
      fontWeight: '700',
    }}>
      {notification}
      <button onClick={hideNotification} style={{ marginLeft: '10px', border: 'none', fontWeight: '700'}}>X</button>
    </div>
  );
};

export default Notification;
