import React, { useState, useEffect } from 'react';
import './InputTag.css';
import BackendConnector from '../BackendConnector';

const InputTag = ({ label, tags, setTags }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setTags(tags);
  }, [tags]);

  let category = "";
  if (label === "География данных") category = "geography_and_places";
  else if (label === "Язык") category = "language";
  else if (label === "Тип данных") category = "data_type";
  else if (label === "Задача") category = "task";
  else if (label === "Техника") category = "technique";
  else category = "subject";

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (inputValue.length > 0) {
        try {
          const fetchedSuggestions = await BackendConnector.fetchSuggestions(category, inputValue);
          setSuggestions(fetchedSuggestions);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      } else {
        setSuggestions([]);
      }
    };
    fetchSuggestions();
  }, [inputValue, category]);

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
    <div id='inputTagsFilter'>
      <div className="input-container">
        <input
          type="search"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={label}
        />
      </div>
      
      <div className='tagsDisplay'>
        {suggestions.length > 0 && (
          <ul className='rowTags'>
            {suggestions.map((suggestion, index) => (
              <li id='tagFilterSuggestion' className={label==='География данных' && suggestion != 'global' ? 'capitalize' : ''} key={`${suggestion}-${index}`} onClick={() => handleTagSelect(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        {tags.map((tag, index) => (
          <div id='tag' className={label==='География данных' && tag != 'global ' ? 'capitalize lightBlueButton' : 'lightBlueButton'} key={`${tag}-${index}`}>
            {tag}
            <button id='deleteTagButton' onClick={() => handleRemoveTag(index)}>&times;</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputTag;
