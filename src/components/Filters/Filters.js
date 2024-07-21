import React, { useState } from 'react';
import './Filters.css'
import InputTagFilter from '../InputTagFilter/InputTagFilter';

const Filters = ({ isOpen, onClose, onFilterChange, geography_and_placess,  languagee, data_typee,  taskk,  techniquee, subjectt, applyChanges}) => {
  const [geography_and_places, setGeography] = useState(geography_and_placess);
  const [language, setLanguage] = useState(languagee);
  const [data_type, setData_type] = useState(data_typee);
  const [task, setTask] = useState(taskk);
  const [technique, setTechinque] = useState(techniquee);
  const [subject, setSubject] = useState(subjectt);

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
          <button id='applyFilters' onClick={applyChanges}>Apply Filters</button>
        </div>
      </div>
    </div>
  );
}

export default Filters;
