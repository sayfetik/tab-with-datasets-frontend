import React from 'react'
import './RequestCard.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BackendConnector, RequestFullModal, DeleteVerification, RequestStatus } from '../..';
import default_image from '../../../img/default_image.jpg';
import redTrash from '../../../img/trashRed.png';
import arrowDownIcon from '../../../img/arrowDown.png';

const RequestCard = ({ addToHistory, request, fetchPreview }) => {
    const navigate = useNavigate();
    const [fullStages, setfullStages] = useState(false);
    
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

    const handleEditClick = () => {
        addToHistory('/editDataset');
        navigate('/editDataset', { state: dataset });
      };

    const handleDeleteClick = () => {
        setisDeleteVerification(true);
    }

    const gotoDataset = () => {
        addToHistory(`/dataset/${request.request_id}`)
        navigate(`/dataset/${request.request_id}`)
    }

    return (
        <div id='hover'>
            <div id='requestCard'>
                <div style={{display: 'flex'}}>
                    <img id='datasetImage' src={default_image} alt='Ошибка загрузки изображения'></img>
                    {fetchPreview ?
                        <p id='uploadedDatasetTitleList' onClick={gotoDataset}>{request.dataset_title}</p>
                        :
                        <p id='datasetTitleList'>{request.dataset_title}</p>
                    }
                </div>
                <div id='cardInfo'>
                    <RequestStatus request={request} />
                    <button id='showStagesButton' onClick={() => setfullStages(true)}>
                        Подробнее о загрузке
                        <img alt='down' id='arrowDown' src={arrowDownIcon}/>
                    </button>
                    <RequestFullModal request={request} isOpen={fullStages} onClose={()=>{setfullStages(false)}} />
                    
                    <div className='rowEditDeleteRequestCard'>
                        {request.uploading?.status === 'done' && <button className='lightBlueButton' id='editButtonOnRequest' style={{marginLeft: '0', padding: '5px 20px'}} onClick={handleEditClick}>Редактировать</button>}
                        <button className='deleteButtonOnRequest' onClick={handleDeleteClick}><img src={redTrash} id='trashIconList' alt="Удалить" /></button>
                        <DeleteVerification onClose={()=>{setisDeleteVerification(false)}} isOpen={isDeleteVerification} id={request.request_id} />
                    </div>
                </div>
            </div>
        </div>
        
    );
}



export default RequestCard