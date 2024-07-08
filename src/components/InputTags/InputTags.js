import React, { useState } from 'react';
import './InputTags.css'

const InputTags = () => {
  const [fields, setFields] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddField = () => {
    setFields([...fields, '']);
    setEditIndex(fields.length);
  };

  const handleRemoveField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, value) => {
    const newFields = [...fields];
    newFields[index] = value;
    setFields(newFields);
  };

  const handleBlur = () => {
    setEditIndex(null);
  };

  const handleKeyPress = (e, index) => {
    if (e.key === 'Enter') {
      setEditIndex(null);
    }
  };

  return (
    <div id='inputTextSection'>
      {fields.map((field, index) => (
        <div id='tag' key={index}>
          {editIndex === index ? (
            <input
              type="text"
              value={field}
              autoFocus
              onChange={(e) => handleInputChange(index, e.target.value)}
              onBlur={handleBlur}
              onKeyPress={(e) => handleKeyPress(e, index)}
              id='inputTag'
            />
          ) : (
            <div style={{fontSize: '16px'}}
              onClick={() => setEditIndex(index)}
            >
              {field || <div id='clickToEditPlaceholder'>Click to edit</div>}
            </div>
          )}
          <button id='deleteTagButton' onClick={() => handleRemoveField(index)}>×</button>
        </div>
      ))}
      {editIndex === null && (
        <button id="addTagButton" onClick={handleAddField}>+</button>
      )}
    </div>
  );
};

export default InputTags;
