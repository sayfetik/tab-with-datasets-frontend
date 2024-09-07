import React from 'react';


// Компонент для отображения этапов
const Stage = ({ stage, stageName, statusImages, setisReportOpen, reportOpen, reportComponent, label }) => {
const hasReport = () => {
    // Проверяем наличие и непустоту объектов files и category
    return (stage.files && Object.keys(stage.files).length > 0) || (stage.category && Object.keys(stage.category).length > 0);
    };
    
  return (
    <>
      <div className='not_startedNet'></div>
      <div className='row'>
        <div id='stageStatus'>
          <img src={statusImages[stage.status]} className='stageStatusIcon' alt="Статус" />
          <p className={stage.status}>{stageName}</p>
          {hasReport() && (
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