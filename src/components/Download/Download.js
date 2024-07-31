import React from 'react';
import './Download.css';

const Download = ({ isOpen, onClose }) => {

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content-download">
          <div id='modalWindowDownload'>
              <button id='downloadDatasetButton'>Скачать исходный датасет</button>
              <button id='downloadCleanedDatasetButton'>Скачать очищенный датасет</button>
          </div>
          <button className="modal-close-button" onClick={onClose}>&times;</button>
      </div>
    </div>
  );
}

export default Download;
