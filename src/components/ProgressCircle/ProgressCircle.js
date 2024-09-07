import React from 'react';
import datasetUploadedIcon from '../../img/datasetUploaded.png';
import failed from '../../img/failStage.png';
import { withTheme } from '@emotion/react';

const ProgressCircle = ({ statuses }) => {
  const totalStages = 7;
  const completedStages = statuses.filter(status => status === 'done').length;
  const progress = (completedStages / totalStages) * 100;
  const hasFailed = statuses.includes('failed');

  if (hasFailed) {
    return <img src={failed} className='statusIcon' alt="Статус" />;
  }

  if (completedStages === totalStages) {
    return <img src={datasetUploadedIcon} className='statusIcon' alt="Статус" />;
  }

  return (
    <div style={{ position: 'relative', width: '20px', height: '20px' }}>
      <div
        style={{
            position: 'absolute',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: `conic-gradient(#757575 ${progress}%, white ${progress}% 100%)`, // Прогресс
        }}
      />
      
      <div
        style={{
        position: 'absolute',
        width: '15px',
        height: '15px',
        margin: '2px',
        borderRadius: '50%',
        border: '2px solid white',
        background: `conic-gradient(#757575 ${progress}%, white ${progress}% 100%)`, // Прогресс
        }}
      />
    </div>
  );
};

export default ProgressCircle;
