import React from 'react';

const Stage = ({ stage, stageName, statusImages, setisReportOpen, reportOpen, reportComponent, label }) => {
const hasReport = () => {
    return (stage.files && Object.keys(stage.files).length > 0) || (stage.category && Object.keys(stage.category).length > 0);
};
    
  return (
    <>
      <div className='not_startedNet'></div>
      <div className='row'>
        <div id='stageStatus'>
          {stageName==="Сканирование обложки на безопасность" || stageName==="На проверке" ?
          <div className='row'>
            <img src={statusImages['done']} className='stageStatusIcon' alt="Статус" />
            <p className='done'>{stageName}</p>
          </div>
          :
          <div className='row'>
            <img src={statusImages[stage.status]} className='stageStatusIcon' alt="Статус" />
            <p className={stage.status}>{stageName}</p>
          </div>}
          
          {(stageName === 'Сканирование метаданных') ?
          hasReport() && <p style={{marginLeft: '10px'}} className='in_progress'>(Несоответствие ожидаемой смысловой нагрузке)</p>
          :
          hasReport() && (
            <div style={{ height: '20px' }}>
              <button className='showReportButton' onClick={() => setisReportOpen(true)}>Подробнее</button>
              {
                React.cloneElement(reportComponent, {
                  isOpen: reportOpen,
                  onClose: () => setisReportOpen(false),
                  report: stage.files || stage.category,
                  warning: stage.status === 'failed',
                  label: label,
                })
              }
            </div>
          )}
        </div>
        {stage.finished_at_date !== 'None' && <p className='stageDate'>{stage.finished_at_date} {stage.finished_at_time}</p>}
      </div>
    </>
  );
};
export default Stage;