import React, { useState, useEffect, useRef } from 'react';
import './AutoresizeTextarea.css'

const AutoResizeTextarea = ({value, setValue, textLimit, placeholder, label, length, height}) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = height || '50px';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);  // Следим за изменением value

  const handleChange = (event) => {
    if (event.target.value.length <= textLimit || textLimit === 0) {
      setValue(event.target.value);  // Обновляем родительское состояние
    }
  };

  const counterColor = value.length < textLimit ? 'rgb(169 169 169)' : '#3E456F';

  return (
    <div>
      {label && <div id='inputLabel'>{label}</div>}
      {textLimit !== 0 ? 
        <div className='row'>
          <textarea
            id='textarea'
            placeholder={placeholder}
            value={value}  // Используем value напрямую
            maxLength={textLimit}
            onChange={handleChange}
            ref={textareaRef}
            style={ length ? {width: length} : {} }
          ></textarea>
          <p id='textLimit'>
            <p style={{color: counterColor}}>{value.length}</p>/{textLimit}
          </p>
        </div>
        :
        <textarea
          id='textarea'
          placeholder={placeholder}
          value={value}  // Используем value напрямую
          onChange={handleChange}
          ref={textareaRef}
          style={ length ? {width: length} : {} }
        ></textarea>
      }
    </div>
  );
};


export default AutoResizeTextarea;
