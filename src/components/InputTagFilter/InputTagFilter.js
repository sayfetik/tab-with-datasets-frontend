import React, { useState, useMemo } from 'react';
import './InputTagFilter.css'

const InputTagFilter = ( { label, tags =[], setTags, options = [] } ) => {
  const [availableOptions, setAvailableOptions] = useState(options);

  // Сортировка доступных опций в алфавитном порядке
  const sortedAvailableOptions = useMemo(() => {
    return [...availableOptions].sort((a, b) => a.label.localeCompare(b.label));
  }, [availableOptions]);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      const selectedOption = availableOptions.find(option => option.value === selectedValue);
      setTags([...(tags || []), selectedOption]);
      setAvailableOptions(availableOptions.filter(option => option.value !== selectedValue));
    }
  };

  const handleRemoveItem = (index) => {
    const removedItem = tags[index];
    setTags((tags || []).filter((_, i) => i !== index));
    setAvailableOptions([...availableOptions, removedItem]);
  };

  
  return (
    <div id='inputTagsFilter'>
      <select className="selectTags" onChange={handleSelectChange} value="">
        <option value="" disabled id='filterTagLabel'>{label}</option>
        {sortedAvailableOptions.map((option) => (
          <option id='tagOption' key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className='row'>
        {tags.map((tag, index) => (
          <div id='tagFilter' key={index}>
            {tag.label}
            <button id='deleteTagButton' onClick={() => handleRemoveItem(index)}>&times;</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputTagFilter;