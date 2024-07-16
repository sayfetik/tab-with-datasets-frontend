import React, { useState, useMemo } from 'react';
import './InputTagFilter.css'

const InputTagFilter = ( {label} ) => {
  const [items, setItems] = useState([]);
  const [availableOptions, setAvailableOptions] = useState([
    { value: 'option1', label: 'Apple' },
    { value: 'option2', label: 'Banana' },
    { value: 'option3', label: 'Cherry' },
    { value: 'option4', label: 'Date' },
    { value: 'option5', label: 'Elderberry' },
  ]);

  // Сортировка доступных опций в алфавитном порядке
  const sortedAvailableOptions = useMemo(() => {
    return [...availableOptions].sort((a, b) => a.label.localeCompare(b.label));
  }, [availableOptions]);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      const selectedOption = availableOptions.find(option => option.value === selectedValue);
      setItems([...items, selectedOption]);
      setAvailableOptions(availableOptions.filter(option => option.value !== selectedValue));
    }
  };

  const handleRemoveItem = (index) => {
    const removedItem = items[index];
    setItems(items.filter((_, i) => i !== index));
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
        {items.map((item, index) => (
          <div id='tagFilter' key={index}>
            {item.label}
            <button id='deleteTagButton' onClick={() => handleRemoveItem(index)}>&times;</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputTagFilter;