import React, { useState, useEffect } from 'react';
import './InputTag.css';
import BackendConnector from '../BackendConnector';

const InputTag = ({ label, tags, setTags }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [errorSuggestions, seterrorSuggestions] = useState(false);

  useEffect(()=>{
    seterrorSuggestions(false);
  })

  const category = {
    "География данных": "geography_and_places",
    "Язык": "language",
    "Тип данных": "data_type",
    "Задача": "task",
    "Техника": "technique",
    "Предмет": "subject"
  }

  const placeholder = {
    "География данных": "Введите страну",
    "Язык": "Укажите язык данных",
    "Тип данных": "Введите тип",
    "Задача": "Введите задачу",
    "Техника": "Укажите технику",
    "Предмет": "Введите категорию"
  }

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (inputValue.length > 0) {
        try {
          const fetchedSuggestions = await BackendConnector.fetchSuggestions(category[label], inputValue);
          setSuggestions(fetchedSuggestions);
        } catch (error) {
          seterrorSuggestions(true);
          console.error('Error fetching suggestions:', error);
        }
      } else {
        setSuggestions([]);
      }
    };
    fetchSuggestions();
  }, [inputValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleTagSelect = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setInputValue('');
    setSuggestions([]);
  };

  const handleRemoveTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  return (
    <div>
      <div id='inputTagsFilter'>
      <p id='tagTypeLabel'>{label}</p>
        <div className="input-container">
          <input
            type="search"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={placeholder[label]}
          />
        </div>
        
        <div className='tagsDisplay'>
          {suggestions.length > 0 && (
            <ul className='rowTags'>
              {suggestions.map((suggestion, index) => (
                <li id='tagFilterSuggestion' className={label==='География данных' && suggestion !== 'Глобальная' ? 'capitalize' : ''} key={`${suggestion}-${index}`} onClick={() => handleTagSelect(suggestion)}>
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          {tags.map((tag, index) => (
            <div id='tag' className={label==='География данных' && tag !== 'Глобальная ' ? 'capitalize lightBlueButton' : 'lightBlueButton'} key={`${tag}-${index}`}>
              {tag}
              <button id='deleteTagButton' onClick={() => handleRemoveTag(index)}>&times;</button>
            </div>
          ))}
        </div>
      </div>
      {errorSuggestions && <p className='warning' style={{marginBottom: '15px'}}>Прозошла ошибка с загрузкой предложений тегов. Повторите попытку позже.</p>}
    </div>
  );
};

export default InputTag;
