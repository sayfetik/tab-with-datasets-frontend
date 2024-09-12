import React from 'react';
import datasetUploadedIcon from '../../img/datasetUploaded.png';
import failed from '../../img/failStage.png';

const ProgressCircle = ({ statuses }) => {
  const totalStages = 7;
  const completedStages = statuses.filter(status => status === 'done').length;
  const progress = (completedStages / totalStages) * 100;
  const hasFailed = statuses.includes('failed');

  if (statuses[6]==='done') {
    return <img src={datasetUploadedIcon} className='statusIcon' alt="" />;
  }
  if (hasFailed) return <img src={failed} className='statusIconSmaller' alt="Статус" />

  return (
    <div style={{ position: 'relative', width: '20px', height: '20px', marginLeft: '3px' }}>
      {progress !== 0 && <div
        style={{
          position: 'absolute',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          border: '2px solid #3b4168',
          background: `conic-gradient(#3b4168 ${progress}%, white ${progress}% 100%)`, // Прогресс
        }}
      />}
    </div>
  );
};

export default ProgressCircle;
