import React, { useState } from 'react';
import './Filters.css'
import InputTagFilter from '../InputTagFilter/InputTagFilter';

const Filters = ({ isOpen, onClose, onFilterChange }) => {
  const [geography_and_places, setGeography] = useState([]);
  const [language, setLanguage] = useState([]);
  const [data_type, setData_type] = useState([]);
  const [task, setTask] = useState([]);
  const [technique, setTechinque] = useState([]);
  const [subject, setSubject] = useState([]);

  const handleFilterChange = () => {
    onFilterChange({
      geography_and_places,
      language,
      data_type,
      task,
      technique,
      subject
    });
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
            <InputTagFilter label="География данных" tags={geography_and_places} setTags={setGeography}/>
            <InputTagFilter label="Язык" tags={language} setTags={setLanguage}/>
            <InputTagFilter label="Тип данных" tags={data_type} setTags={setData_type}/>
            <InputTagFilter label="Задача" tags={task} setTags={setTask}/>
            <InputTagFilter label="Техника" tags={technique} setTags={setTechinque}/>
            <InputTagFilter label="Область" tags={subject} setTags={setSubject}/>
          </label>
        </div>
        <div id='applyFiltersLayout'>
          <button id='applyFilters' onClick={handleFilterChange}>Apply Filters</button>
        </div>
      </div>
    </div>
  );
}

export default Filters;
