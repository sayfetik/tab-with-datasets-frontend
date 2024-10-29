import React, { useState, useEffect, useRef } from 'react';
import './AutoresizeTextarea.css';
import { marked } from 'marked'; // Правильный импорт
import katex from 'katex';
import 'katex/dist/katex.min.css';

const AutoResizeTextarea = ({ value, setValue, textLimit, placeholder, label, length, height, markdown }) => {
  const textareaRef = useRef(null);
  const [isEditing, setIsEditing] = useState(true); // Флаг редактирования
  const renderedRef = useRef(null); // Реф для отрисованного HTML

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '50px';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, isEditing]);

  useEffect(() => {
    if (!isEditing && renderedRef.current) {
      renderedRef.current.innerHTML = renderMarkdownWithKaTeX(value);
    }
  }, [isEditing, value, renderedRef]);

  const handleChange = (event) => {
    if (event.target.value.length <= textLimit || textLimit === 0) {
      setValue(event.target.value);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleFocus = () => {
    setIsEditing(true);
  };

  const renderMarkdownWithKaTeX = (text) => {
    marked.setOptions({
      gfm: true,
      breaks: true,
      sanitize: false,
    });

    // Преобразуем Markdown в HTML
    let html = marked(text);

    // Преобразуем формулы в LaTeX
    html = html.replace(/\$([^\$]+)\$/g, (match, formula) => {
      try {
        return katex.renderToString(formula, { throwOnError: false });
      } catch (error) {
        return match; // Возвращаем исходный текст, если есть ошибка
      }
    });

    return html;
  };

  const counterColor = value.length < textLimit ? 'rgb(169, 169, 169)' : '#3E456F';

  return (
    <div>
    {markdown? 
      <div>
      {label && <div id="inputLabel">{label}</div>}
      <div className="row">
          {isEditing ? (
          <textarea
            id="textarea"
            placeholder={placeholder}
            value={value}
            maxLength={textLimit}
            onChange={handleChange}
            onBlur={handleBlur}
            ref={textareaRef}
            style={length ? { width: length } : {}}
            onFocus={handleFocus}
          ></textarea>
        ) : (
          <div
            id="textarea"
            ref={renderedRef}
            dangerouslySetInnerHTML={{ __html: renderMarkdownWithKaTeX(value) }}
            onClick={handleFocus}
          />
        )}
        <p id="textLimit">
          <p style={{ color: counterColor }}>{value.length}</p>/{textLimit}
        </p>
      </div>
    </div>
  :
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
</div>}
</div>
  );
};

export default AutoResizeTextarea;