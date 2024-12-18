import React, { useState, useEffect, useRef } from 'react';
import './AutoresizeTextarea.css';
import { marked } from 'marked'; // Правильный импорт
import katex from 'katex';
import 'katex/dist/katex.min.css';

const AutoResizeTextarea = ({ value, setValue, textLimit, placeholder, label, length, markdown }) => {
  const textareaRef = useRef(null);
  const [isEditing, setIsEditing] = useState(true);
  const renderedRef = useRef(null);

  useEffect(()=>{
    textareaRef.current.blur()
  },[])
  
  const handleResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '50px'; // Сброс высоты
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Установка высоты
    }
    if (!isEditing && renderedRef.current) {
      renderedRef.current.innerHTML = renderMarkdownWithKaTeX(value);
      renderedRef.current.style.height = '50px'; // Сброс высоты
      renderedRef.current.style.height = `${renderedRef.current.scrollHeight + 7}px`; // Установка высоты
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize); // Добавление обработчика события

    // Вызов функции для первоначальной настройки
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize); // Очистка обработчика при размонтировании
    };
  }, [isEditing, value]);

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
  
    // Заменяем \[...\] на $$...$$
    text = text.replace(/\\\[(.*?)\\\]/g, (match, formula) => `$$${formula}$$`);
  
    // Преобразуем Markdown в HTML
    let html = marked(text);
  
    // Преобразуем блочные формулы $$...$$
    html = html.replace(/\$\$([^\$]+)\$\$/g, (match, formula) => {
      try {
        return `<div class="katex-block">${katex.renderToString(formula, { displayMode: true, throwOnError: false })}</div>`;
      } catch (error) {
        return match; // Возвращаем исходный текст, если есть ошибка
      }
    });
  
    // Преобразуем встроенные формулы $...$
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
            autoFocus
            ref={textareaRef}
            style={length ? { width: length } : {}}
            onFocus={handleFocus}
          ></textarea>
        ) : 
        value.length === 0 ?
        (
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
        )
        :
        (
          <div
            id="textarea"
            ref={renderedRef}
            dangerouslySetInnerHTML={{ __html: renderMarkdownWithKaTeX(value) }}
            onClick={handleFocus}
          />
        )}
        <div id="textLimit" style={{ padding: '0'}}>
          <p style={{ color: counterColor }}>{value.length}</p>/{textLimit}
        </div>
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
