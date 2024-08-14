import React, { useState, useEffect, useRef } from 'react';
import './AutoresizeTextarea.css'

const AutoResizeTextarea = ({value, setValue, textLimit, placeholder}) => {
  const [description, setDescription] = useState(value);

  useEffect(() => {
    setValue(description);
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [description]);

  const textareaRef = useRef(null);

  const handleChange = (event) => {
    if (event.target.value.length <= textLimit) {
      setDescription(event.target.value);
    }
  };

  const counterColor = description.length < textLimit ? 'rgb(169 169 169)' : '#3E456F';

  return (
    <div>
      {textLimit != 0 ? 
        <div>
          <textarea
            id='descriptionInput'
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
          id='descriptionInput'
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
