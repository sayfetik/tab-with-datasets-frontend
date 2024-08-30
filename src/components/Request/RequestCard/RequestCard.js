import React from 'react'
import './RequestCard.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BackendConnector, RequestFullModal, DeleteVerification, RequestStatus } from '../..';
import default_image from '../../../img/default_image.jpg';
import redTrash from '../../../img/trashRed.png';
import arrowDownIcon from '../../../img/arrowDown.png'
import arrowUpIcon from '../../../img/arrowUp.png'

const RequestCard = ({ request }) => {
    const navigate = useNavigate();
    const [menuState, setMenuState] = useState(false);
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

        fetchDatasetPreview();
    }, [request.request_id]);

    const handleEditClick = () => {
        navigate('/editDataset', { state: dataset });
      };

    const handleDeleteClick = () => {
        setisDeleteVerification(true);
    }

    return (
        <div id='hover' style={{marginLeft: '0',marginRight: '0'}}>
            <div id='requestCard'>
                <img id='datasetImage' src={default_image} alt='Dataset cover'></img>
                <h3 id='datasetTitleOnCard'>{request.dataset_title}</h3>
                <div id='cardInfo'>
                    <RequestStatus request={request} />
                    <button id='showStagesButton' onClick={() => setfullStages(true)}>
                        Подробнее о загрузке
                        {!menuState && <img alt='down' id='arrowInAccount' src={arrowDownIcon} onClick={()=>{setMenuState(true)}}/>}
                        {menuState && <img alt='down' id='arrowInAccount' src={arrowUpIcon} onClick={()=>{setMenuState(false)}}/>}
                    </button>
                    <RequestFullModal request={request} isOpen={fullStages} onClose={()=>{setfullStages(false)}} />

                    {request.uploading?.status === 'done' && <button className='whiteBlueButton' style={{marginLeft: '0', marginBottom: '8px', marginTop: '8px'}} onClick={() => {navigate(`/dataset/${request.request_id}`)}}>Посмотреть датасет</button>}
                    <div className='rowSpaceBetween'>
                        <div className='row'>
                            {request.uploading?.status === 'done' && <button className='lightBlueButton' style={{marginLeft: '0', padding: '5px 20px'}} onClick={handleEditClick}>Редактировать</button>}
                            {request.uploading?.status === 'done' && <img src={redTrash} id='trashIconList' alt="Удалить"  onClick={handleDeleteClick} />}
                            <DeleteVerification onClose={()=>{setisDeleteVerification(false)}} isOpen={isDeleteVerification} dataset={dataset} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}



export default RequestCard