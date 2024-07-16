import React, { useState } from 'react';
import './Filters.css'
import InputTagFilter from '../InputTagFilter/InputTagFilter';

const Filters = ({ isOpen, onClose, onFilterChange }) => {
  const [filter1, setFilter1] = useState(['']);
  const [filter2, setFilter2] = useState([]);

  const handleFilterChange = () => {
    onFilterChange({ filter1, filter2 });
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Фильтры</h2>
          <button className="modal-close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div>
          <label>
            <InputTagFilter label="География данных" />
            <InputTagFilter label="Язык" />
            <InputTagFilter label="Тип данных" />
            <InputTagFilter label="Задача" />
            <InputTagFilter label="Техника" />
            <InputTagFilter label="Область" />
          </label>
        </div>
        <div id='applyFiltersLayout'>
          <button id='applyFilters' /*onClick={handleFilterChange}*/>Apply Filters</button>
        </div>
      </div>
    </div>
  );
}

export default Filters;
