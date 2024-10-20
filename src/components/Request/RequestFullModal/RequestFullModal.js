import React from 'react';
import { Stages, RequestStatus } from '../..';
import not_started from '../../../img/notStartedStage.png';
import in_progress from '../../../img/startedStage.png';
import failed from '../../../img/failStage.png';
import done from '../../../img/successStage.png';
import './RequestFullModal.css';

const RequestFullModal = ({ request, isOpen, onClose }) => {
    const statusImages = {
        'not_started': not_started,
        'not started': not_started,
        'in_progress': in_progress,
        'done': done,
        'failed': failed,
    };
    
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
          <div className="modal-content requestFullModal">
            <div id='briefDatasetListItem'>
                <div className='row'>
                    <p id='datasetTitleList' style={{marginRight: '30px'}}>{request.dataset_title}</p>
                </div>
                
                <button className="report-close-button" onClick={onClose}>&times;</button>
            </div>
            <Stages request={request} statusImages={statusImages} />
        </div>
        </div>
    );
}

export default RequestFullModal;