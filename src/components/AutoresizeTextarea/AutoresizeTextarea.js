import React, { useState, useEffect, useRef } from 'react';
import './AutoresizeTextarea.css'

const AutoResizeTextarea = ({value, setValue}) => {
  const [description, setDescription] = useState(value);

  useEffect(() => {
    setValue(description);
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [description]);

  const textareaRef = useRef(null);

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <textarea
      id='descriptionInput'
      placeholder='Введите описание'
      value={description}
      onChange={handleChange}
      ref={textareaRef}
    ></textarea>
  );
}

export default AutoResizeTextarea;
