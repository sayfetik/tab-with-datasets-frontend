import React, { useState, useEffect } from 'react';
import { Stages, BackendConnector, DeleteVerification, RequestStatus } from '../..';
import { useNavigate } from 'react-router-dom';
import './UploadRequest.css';
import redTrash from '../../../img/trashRed.png';
import arrowDown from '../../../img/arrowDown.png';
import not_started from '../../../img/notStartedStage.png';
import in_progress from '../../../img/startedStage.png';
import failed from '../../../img/failStage.png';
import done from '../../../img/successStage.png';
import editIcon from '../../../img/editBlue.png';

const UploadRequest = ({ back, addToHistory, request, toggleStage, isOpen, fetchPreview }) => {
    /*const [isSecuringReportOpen, setisSecuringReportOpen] = useState(false);
    const [isMetadataSecuringReportOpen, setisMetadataSecuringReportOpen] = useState(false);
    const [isAnonymizingReportOpen, setisAnonymizingReportOpen] = useState(false);
    const [image_securing, setisImage_securingReportOpen] = useState(false);
    const [isCleaningReportOpen, setisCleaningReportOpen] = useState(false);*/
    const [isDeleteVerification, setisDeleteVerification] = useState(false);
    const navigate = useNavigate();

    const statusImages = {
        'not_started': not_started,
        'in_progress': in_progress,
        'done': done,
        'failed': failed,
    };

    const handleToDatasetClick = () => {
        let page;
        if (request.uploading?.status === 'done') page = `/dataset/${request.request_id}`;
        else page = `/requestPreview/${request.request_id}`;

        addToHistory(page);
        navigate(page);
    }
    
    const handleEditClick = () => {
        const fetchDatasetPreview = async () => {
            try {
                const data = await BackendConnector.preview(request.request_id);
                addToHistory('/editDataset1');
                navigate('/editDataset', { state: data });
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchDatasetPreview();
      };
      
    const handleDeleteClick = () => {
        setisDeleteVerification(true);
    }

    return (
        <div id='datasetListItem'>
            <div id='briefDatasetListItem'>
                <div className='rowTitleAndStatus'>
                    <p id='uploadedDatasetTitleList' onClick={handleToDatasetClick}>{request.dataset_title}</p>
                    <RequestStatus request={request}/>
                </div>
                <div className='rightSectionList'>
                    <button onClick={handleDeleteClick} style={{border: 'none'}}><img src={redTrash} id='trashIconList' alt="Удалить" /></button>
                    {request.uploading?.status === 'done' && <button onClick={handleEditClick} style={{border: 'none'}}><img src={editIcon} id='editIconRequest' alt="Редактировать"/></button>}
                    <button className='whiteBlueButton' id='seeDatasetButton' onClick={handleToDatasetClick}>Смотреть</button>
                    <DeleteVerification onClose={()=>{setisDeleteVerification(false)}} isOpen={isDeleteVerification} id={request.request_id} back={back}/>
                    <img src={arrowDown} onClick={() => toggleStage(request.request_id)} className={isOpen ? 'statusIcon rotate180' : 'statusIcon'} alt="Подробнее о стадиях"/>
                </div>
            </div>
            {isOpen && request && (
                <Stages request={request} statusImages={statusImages} />
                )}
        </div>
    );
}

export default UploadRequest;