import React, { useState, useEffect } from 'react';
import './InputTags.css'

const InputTags = ({tags, setTags}) => {
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    setTags(tags);
  }, [setTags, tags]);

  const handleAddField = () => {
    setTags([...tags, '']);
    setEditIndex(tags.length);
  };

  const handleRemoveField = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, value) => {
    const newFields = [...tags];
    newFields[index] = value;
    setTags(newFields);
  };

  const handleBlur = () => {
    setEditIndex(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setEditIndex(null);
    }
  };

  return (
    <div id='inputTextSection'>
      {tags.map((field, index) => (
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
            <div style={{fontSize: '16px', color: '#3E456F'}} onClick={() => setEditIndex(index)}>
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
