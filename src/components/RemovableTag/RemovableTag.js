import React, { useState } from 'react';
import './RemovableTag.css';

const RemovableTag = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleRemove = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
        <div className='datasetTagInput'>
            <button id='hideTagButton' onClick={handleRemove}>x</button>
            вставить тег
        </div>
    )
  );
};

export default RemovableTag;
