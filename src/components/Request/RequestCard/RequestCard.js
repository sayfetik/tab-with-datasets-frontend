import React from 'react'
import './RequestCard.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BackendConnector, RequestFullModal, DeleteVerification, RequestStatus } from '../..';
import default_image from '../../../img/default_image.jpg';
import redTrash from '../../../img/trashRed.png';
import arrowDownIcon from '../../../img/arrowDown.png';
import arrowUpIcon from '../../../img/arrowUp.png';
import editBlueIcon from '../../../img/editBlue.png';

const RequestCard = ({ request, fetchPreview }) => {
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

        if (fetchPreview) fetchDatasetPreview();
    }, [request.request_id]);

    const handleEditClick = () => {
        navigate('/editDataset', { state: dataset });
      };

    const handleDeleteClick = () => {
        setisDeleteVerification(true);
    }

    return (
        <div id='hoverRequest'>
            <div id='requestCard'>
                <div style={{display: 'flex'}}>
                    <img id='datasetImage' src={default_image} alt='Ошибка загрузки изображения'></img>
                    <h3 id='datasetTitleOnCard'>{request.dataset_title}</h3>
                </div>
                <div id='cardInfo'>
                    <RequestStatus request={request} />
                    <button id='showStagesButton' onClick={() => setfullStages(true)}>
                        Подробнее о загрузке
                        <img alt='down' id='arrowInAccount' src={arrowDownIcon} onClick={()=>{setMenuState(true)}}/>
                    </button>
                    <RequestFullModal request={request} isOpen={fullStages} onClose={()=>{setfullStages(false)}} />

                    <div className='rowSpaceBetween'>
                        {request.uploading?.status === 'done' && <button style={{marginLeft: '0px'}} className='whiteBlueButton' onClick={() => {navigate(`/dataset/${request.request_id}`)}}>Посмотреть датасет</button>}
                        {/*request.uploading?.status === 'done' ?
                            <button className='whiteBlueButton' onClick={() => {navigate(`/dataset/${request.request_id}`)}}>Посмотреть датасет</button>
                            :
                            <button className='whiteBlueButton' style={{marginRight: '15px'}} onClick={() => {navigate('/requestPreview', { state: {id: request.request_id} })}}>Предварительный просмотр</button>
    */}
                        <div className='row'>
                            {request.uploading?.status === 'done' && <button className='lightBlueButton' id='editButtonOnRequest' style={{marginLeft: '0', padding: '5px 20px'}} onClick={handleEditClick}>Редактировать</button>}
                            {request.uploading?.status === 'done' && <img src={editBlueIcon} id='editIcon'/>}
                            {request.uploading?.status === 'done' && <img src={redTrash} style={{marginRight: '0px'}} id='trashIconList' alt="Удалить"  onClick={handleDeleteClick} />}
                            <DeleteVerification onClose={()=>{setisDeleteVerification(false)}} isOpen={isDeleteVerification} dataset={dataset.id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}



export default RequestCard