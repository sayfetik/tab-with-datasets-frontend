import React, { useState } from 'react';
import { RequestReport } from '../..';
import './UploadRequest.css';
import not_started from '../../img/notStartedStage.png';
import in_progress from '../../img/startedStage.png';
import failed from '../../img/failStage.png';
import done from '../../img/successStage.png';


const RequestStage = ({ stage, stageTitle, reportTitle }) => {
    const [isReportOpen, setisReportOpen] = useState(false);
    const statusImages = {
        'not_started': not_started,
        'in_progress': in_progress,
        'done': done,
        'failed': failed,
    };

    return (
        <>
        <div className='not_startedNet'></div>
        <div className='row'>
            <div id='stageStatus'>
                <img src={statusImages[stage.status]} className='stageStatusIcon' alt="Статус" />
                <p className={stage.status}>{stageTitle}</p>
                {stage.status === 'failed' && (
                    <div style={{height: '20px'}}>
                    <button className='showReportButton' onClick={() => setisReportOpen(true)}>Подробнее</button>
                    <RequestReport
                        isOpen={isReportOpen}    
                        onClose={()=>{setisReportOpen(false)}}
                        report={stage.files}     
                        warning={true}
                        label={reportTitle}                      
                    />
                    </div>
                )}
            </div>
            {stage.finished_at_date!== 'None' && <p className='stageDate'>{stage.finished_at_date} {stage.finished_at_time}</p>}
        </div>
        </>
    );
}

export default RequestStage;