import React, { useState, useEffect } from 'react';
import './Filters.css';
import InputTagFilter from '../InputTag/InputTag';

const Filters = ({ isOpen, onClose, geography_and_places, setGeography, language, setLanguage, data_type, setData_type, task, setTask, technique, setTechnique, subject, setSubject, applyChanges }) => {
  const [localGeography, setLocalGeography] = useState(geography_and_places);
  const [localLanguage, setLocalLanguage] = useState(language);
  const [localDataType, setLocalDataType] = useState(data_type);
  const [localTask, setLocalTask] = useState(task);
  const [localTechnique, setLocalTechnique] = useState(technique);
  const [localSubject, setLocalSubject] = useState(subject);

  useEffect(() => {
    setGeography(localGeography);
    setLanguage(localLanguage);
    setData_type(localDataType);
    setTask(localTask);
    setTechnique(localTechnique);
    setSubject(localSubject);
  }, [localGeography, localLanguage, localDataType, localTask, localTechnique, localSubject]);

  const applyFilters = () => {
    applyChanges();
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
          <button className="modal-close-button" onClick={onClose}>&times;</button>
        </div>
        <div>
          <label>
            <InputTagFilter label="География данных" tags={localGeography} setTags={setLocalGeography} />
            <InputTagFilter label="Язык" tags={localLanguage} setTags={setLocalLanguage} />
            <InputTagFilter label="Тип данных" tags={localDataType} setTags={setLocalDataType} />
            <InputTagFilter label="Задача" tags={localTask} setTags={setLocalTask} />
            <InputTagFilter label="Техника" tags={localTechnique} setTags={setLocalTechnique} />
            <InputTagFilter label="Область" tags={localSubject} setTags={setLocalSubject} />
          </label>
        </div>
        <div id='applyFiltersLayout'>
          <button className='blueButton' onClick={applyFilters}>Применить</button>
        </div>
      </div>
    </div>
  );
}

export default Filters;
