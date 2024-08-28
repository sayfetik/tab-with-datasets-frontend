import React from 'react'
import './RequestCard.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { RequestReport, AnonReport, BackendConnector, RequestFullModal, DeleteVerification } from '../../components';
import default_image from '../../img/default_image.jpg';
import plusWhiteIcon from '../../img/plusWhite.png';
import datasetUploadedIcon from '../../img/datasetUploaded.png';
import redTrash from '../../img/trashRed.png';
import stage1 from '../../img/stage0.png';
import stage2 from '../../img/stage1.png';
import stage3 from '../../img/stage2.png';
import stage4 from '../../img/stage3.png';
import arrowDownIcon from '../../img/arrowDown.png'
import arrowUpIcon from '../../img/arrowUp.png'

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
                <h3 id='datasetTitleOnCard'>Название датасета</h3>
                <div id='cardInfo'>
                    {request.sending?.status === 'in_progress' && (
                        <div id='status' style={{marginLeft: '0'}}>
                            <p className={request.sending.status}> На проверке </p>
                            <img src={stage1} className='statusIcon' alt="Статус" />
                        </div>
                    )}
                    {request.metadata_securing?.status === 'in_progress' && (
                        <div id='status' style={{marginLeft: '0'}}>
                            <p className={request.metadata_securing.status}> Сканирование метаданных</p>
                            <img src={request.metadata_securing.status === 'failed' ? stage2 : stage1} className='statusIcon' alt="Статус" />
                        </div>
                    )}
                    {request.files_securing?.status === 'in_progress' && (
                        <div id='status' style={{marginLeft: '0'}}>
                            <p className={request.files_securing.status}> Сканирование на безопасность</p>
                            <img src={request.files_securing.status === 'failed' ? stage2 : stage1} className='statusIcon' alt="Статус" />
                        </div>
                    )}
                    {request.anonymizing?.status === 'in_progress' && (
                        <div id='status' style={{marginLeft: '0'}}>
                            <p className={request.anonymizing.status}> Анонимизация датасета, защита персональных данных</p>
                            <img src={stage2} className='statusIcon' alt="Статус" />
                        </div>
                    )}
                    {request.cleaning?.status === 'in_progress' && (
                        <div id='status' style={{marginLeft: '0'}}>
                            <p className={request.cleaning.status}> Подготовка датасета к использованию, предобработка данных</p>
                            <img src={stage3} className='statusIcon' alt="Статус" />
                        </div>
                    )}
                    {request.uploading?.status === 'in_progress' && (
                        <div id='status' style={{marginLeft: '0'}}>
                            <p className={request.uploading.status}> Датасет загружается</p>
                            <img src={stage3} className='statusIcon' alt="Статус" />
                        </div>
                    )}
                    {request.uploading?.status === 'done' && (
                        <div id='status' style={{marginLeft: '0'}}>
                            <p className={request.uploading.status}> Датасет загружен</p>
                            <img src={datasetUploadedIcon} className='statusIcon' alt="Статус" />
                        </div>
                    )}
                    <button id='showStagesButton' onClick={() => setfullStages(true)}>
                        Подробнее о загрузке
                        {!menuState && <img alt='down' id='arrowInAccount' src={arrowDownIcon} onClick={()=>{setMenuState(true)}}/>}
                        {menuState && <img alt='down' id='arrowInAccount' src={arrowUpIcon} onClick={()=>{setMenuState(false)}}/>}
                    </button>
                    <RequestFullModal request={request} isOpen={fullStages} onClose={()=>{setfullStages(false)}} />

                    {request.uploading?.status === 'done' && <button className='whiteBlueButton' style={{marginLeft: '0', marginBottom: '8px', marginTop: '8px'}} onClick={() => {navigate(`/dataset/${request.request_id}`)}}>Посмотреть датасет</button>}
                    <div className='rowSpaceBetween'>
                        <div className='row'>
                            {request.uploading?.status === 'done' && <button className='lightBlueButton' style={{marginLeft: '0'}} onClick={handleEditClick}>Редактировать</button>}
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