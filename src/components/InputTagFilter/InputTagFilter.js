import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import './InputTagFilter.css'

const InputTagFilter = ( { label, tags =[], setTags } ) => {
  const [inputValue, setInputValue] = useState(tags);
  const [suggestions, setSuggestions] = useState([]);

  let category = "";
  if (label === "География данных") category = "geography_and_places";
  else if (label === "Язык") category = "language";
  else if (label === "Тип данных") category = "data_type";
  else if (label === "Задача") category = "task";
  else if (label === "Техника") category = "technique";
  else category = "subject";

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (inputValue.length >= 3) {
          const url = `http://10.100.30.74/api/search_tags/${category}/${inputValue}/3`;
          const requestBody = {
              tags: []
          };
          try {
              const response = await fetch(url, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(requestBody)
              });
              if (!response.ok) {
                  alert('Network response was not ok');
                  return;
              }
  
          const data = await response.json();
          setSuggestions(data.tags);
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
    setTags([...tags, tag]);
    setInputValue('');
    setSuggestions([]);
  };

  const handleRemoveTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  const clearInput = () => {
    setInputValue('');
    setSuggestions([]);
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
        <button id='deleteTagButton' onClick={clearInput}>&times;</button>
      </div>
      {suggestions.length > 0 && (
        <ul className='rowTags'>
          {suggestions.map((suggestion) => (
            <li id='tagFilterSuggestion' key={suggestion.value} onClick={() => handleTagSelect(suggestion)}>{suggestion}</li>
          ))}
        </ul>
      )}
      <div className='rowTags'>
        {tags.map((tag, index) => (
          <div id='tagFilter' key={index}>
            {tag}
            <button id='deleteTagButton' onClick={() => handleRemoveTag(index)}>&times;</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputTagFilter;