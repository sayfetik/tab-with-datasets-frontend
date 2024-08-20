import React, { useState, useEffect, useRef } from 'react';
import './AutoresizeTextarea.css'

const AutoResizeTextarea = ({value, setValue, textLimit, placeholder, label}) => {
  const [description, setDescription] = useState(value);
  const textareaRef = useRef(null);

  useEffect(() => {
    setValue(description);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [description]);

  const handleChange = (event) => {
    if (event.target.value.length <= textLimit) {
      setDescription(event.target.value);
    }
  };

  const counterColor = description.length < textLimit ? 'rgb(169 169 169)' : '#3E456F';

  return (
    <div>
      {label && <div id='inputLabel'>{label}</div>}
      {textLimit !== 0 ? 
        <div className='row'>
          <textarea
            id='textarea'
            placeholder={placeholder}
            value={description}
            maxLength={textLimit}
            onChange={handleChange}
            ref={textareaRef}
          ></textarea>
          <p id='textLimit'>
            <p style={{color: counterColor}}>{description.length}</p>/{textLimit}
          </p>
        </div>
        :
        <textarea
          id='textarea'
          placeholder={placeholder}
          value={description}
          onChange={handleChange}
          ref={textareaRef}
        ></textarea>
      }
    </div>
    
  );
}

export default AutoResizeTextarea;
