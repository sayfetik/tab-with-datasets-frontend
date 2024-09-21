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


const UploadRequest = ({ request, toggleStage, isOpen, fetchPreview }) => {
    /*const [isSecuringReportOpen, setisSecuringReportOpen] = useState(false);
    const [isMetadataSecuringReportOpen, setisMetadataSecuringReportOpen] = useState(false);
    const [isAnonymizingReportOpen, setisAnonymizingReportOpen] = useState(false);
    const [image_securing, setisImage_securingReportOpen] = useState(false);
    const [isCleaningReportOpen, setisCleaningReportOpen] = useState(false);*/
    const [isDeleteVerification, setisDeleteVerification] = useState(false);
    const [dataset, setDataset] = React.useState({
        id: '',
        title: '',
        description: '',
        small_description: '',
        tags: [],
        geography_and_places: [],
        language: [],
        data_type: [],
        task: [],
        technique: [],
        subject: [],
        owner: '',
        authors: '',
        data_source: '',
        license: '',
        number_of_files: 0,
        doi: '',
        expected_update_frequency: '',
        last_change_date: '',
        last_change_time: '',
        downloads_number: 0,
        visibility: '',
        usability_rating: 0,
        size: '',
        size_bytes: 0,
        rating: 0,
        files_structure: {},
    });

    useEffect(() => {
        const fetchDatasetPreview = async () => {
            try {
                const data = await BackendConnector.preview(request.request_id);
                setDataset(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        if (fetchPreview) fetchDatasetPreview();
    }, [request.request_id]);

    const navigate = useNavigate();

    const statusImages = {
        'not_started': not_started,
        'in_progress': in_progress,
        'done': done,
        'failed': failed,
    };
    
    const handleEditClick = () => {
        navigate('/editDataset', { state: dataset });
      };

      
    const handleDeleteClick = () => {
        setisDeleteVerification(true);
    }

    return (
        <div id='datasetListItem'>
            <div id='briefDatasetListItem' onClick={() => toggleStage(request.request_id)}>
                <div className='row'>
                    <p id='datasetTitleList' style={{marginRight: '30px', maxWidth: '80%'}}>{request.dataset_title}</p>
                    <RequestStatus request={request}/>
                </div>
                <div className='rightSectionList'>
                {request.uploading?.status === 'done' && <button className='whiteBlueButton' onClick={() => {navigate(`/dataset/${request.request_id}`)}}>Посмотреть датасет</button>}
                        {/*request.uploading?.status === 'done' ?
                            <button className='whiteBlueButton' onClick={() => {navigate(`/dataset/${request.request_id}`)}}>Посмотреть датасет</button>
                            :
                            <button className='whiteBlueButton' style={{marginRight: '15px'}} onClick={() => {navigate('/requestPreview', { state: {id: request.request_id} })}}>Предварительный просмотр</button>
    */}
                    {request.uploading?.status === 'done' && <button style={{padding: '5px 20px'}} className='lightBlueButton' onClick={handleEditClick}>Редактировать</button>}
                    {request.uploading?.status === 'done' && <img src={redTrash} id='trashIconList' alt="Удалить"  onClick={handleDeleteClick} />}
                    <DeleteVerification onClose={()=>{setisDeleteVerification(false)}} isOpen={isDeleteVerification} dataset={dataset.id} back={false}/>
                    <img
                        src={arrowDown}
                        className={isOpen ? 'statusIcon rotate180' : 'statusIcon'}
                        alt="Подробнее о стадиях"
                    />
                </div>
            </div>
            {isOpen && request && (
                <Stages request={request} statusImages={statusImages} />
                )}
        </div>
    );
}

export default UploadRequest;