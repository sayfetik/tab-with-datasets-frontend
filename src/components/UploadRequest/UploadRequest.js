import React, { useState, useEffect } from 'react';
import { RequestReport, AnonReport } from '../../components';
import { useParams, useNavigate } from 'react-router-dom';
import './UploadRequest.css';
import plusWhiteIcon from '../../img/plusWhite.png';
import datasetUploadedIcon from '../../img/datasetUploaded.png';
import redTrash from '../../img/trashRed.png';
import arrowDown from '../../img/arrowDown.png';
import not_started from '../../img/notStartedStage.png';
import in_progress from '../../img/startedStage.png';
import failed from '../../img/failStage.png';
import done from '../../img/successStage.png';
import stage1 from '../../img/stage0.png';
import stage2 from '../../img/stage1.png';
import stage3 from '../../img/stage2.png';
import stage4 from '../../img/stage3.png';


const UploadRequest = ({ request, toggleStage, isOpen }) => {
    const [isSecuringReportOpen, setisSecuringReportOpen] = useState(false);
    const [isAnonymizingReportOpen, setisAnonymizingReportOpen] = useState(false);
    const [isCleaningReportOpen, setisCleaningReportOpen] = useState(false);
    const [dataset, setDataset] = useState(false);
    const navigate = useNavigate();

    const statusImages = {
        'not_started': not_started,
        'in_progress': in_progress,
        'done': done,
        'failed': failed,
    };    

    return (
        <div id='datasetListItem'>
            <div id='briefDatasetListItem'>
                <div className='row'>
                    <p id='datasetTitleList'>{request.request_id}</p>
                    {request.sending?.status === 'in_progress' && (
                        <div id='status'>
                            <p className={request.sending.status}> На проверке </p>
                            <img src={stage1} className='statusIcon' alt="Статус" />
                        </div>
                    )}
                    {request.securing?.status === 'in_progress' && (
                        <div id='status'>
                            <p className={request.securing.status}> Сканирование на безопасность </p>
                            <img src={request.securing.status === 'failed' ? stage2 : stage1} className='statusIcon' alt="Статус" />
                        </div>
                    )}
                    {request.anonymizing?.status === 'in_progress' && (
                        <div id='status'>
                            <p className={request.anonymizing.status}> Анонимизация датасета, защита персональных данных </p>
                            <img src={stage2} className='statusIcon' alt="Статус" />
                        </div>
                    )}
                    {request.cleaning?.status === 'in_progress' && (
                        <div id='status'>
                            <p className={request.cleaning.status}> Подготовка датасета к использованию, предобработка данных </p>
                            <img src={stage3} className='statusIcon' alt="Статус" />
                        </div>
                    )}
                    {request.uploading?.status === 'in_progress' && (
                        <div id='status'>
                            <p className={request.uploading.status}> Датасет загружен</p>
                            <img src={stage3} className='statusIcon' alt="Статус" />
                        </div>
                    )}
                    {request.uploading?.status === 'done' && (
                        <div id='status'>
                            <p className={request.uploading.status}> Датасет загружен</p>
                            <img src={datasetUploadedIcon} className='statusIcon' alt="Статус" />
                        </div>
                    )}
                </div>
                <div className='rightSectionList'>
                    <button className='whiteBlueButton' onClick={()=>{navigate('/requestPreview', { state: request.request_id })}}>Посмотреть датасет</button>
                    <button className='lightBlueButton'>Редактировать</button>
                    <img src={redTrash} id='trashIconList' alt="Удалить" />
                    <img
                        src={arrowDown}
                        className={isOpen ? 'statusIcon rotate180' : 'statusIcon'}
                        onClick={() => toggleStage(request.request_id)}
                        alt="Развернуть"
                    />
                </div>
            </div>
            {isOpen && 
            <div className='fullStages'>
                <div className='stages'>

                    <div className={`${request.sending?.status}Net`}></div>

                    <div className='row'>
                        <div id='stageStatus'>
                            <img src={statusImages[request.sending?.status]} className='stageStatusIcon' alt="Статус" />
                            <p className={request.sending?.status}>На проверке</p>
                        </div>
                        <p className='stageDate'>{request.sending.finished_at_date} {request.sending.finished_at_time}</p>
                    </div>

                    <div className={`${request.securing?.status}Net`}></div>
                
                    <div className='row'>
                        <div id='stageStatus'>
                            <img src={statusImages[request.securing?.status]} className='stageStatusIcon' alt="Статус" />
                            <p className={request.securing?.status}>Сканирование на безопасность</p>
                            {request.securing?.status === 'failed' && (
                                <div style={{height: '20px'}}>
                                    <button className='showReportButton' onClick={() => setisSecuringReportOpen(true)}>Подробнее</button>
                                    <RequestReport
                                        isOpen={isSecuringReportOpen}    
                                        onClose={()=>{setisSecuringReportOpen(false)}}
                                        report={request.securing.files}     
                                        warning={true}
                                        label='Файлы с подозрениями на нарушение безопасности'                      
                                    />
                                </div>
                            )}
                        </div>
                        <p className='stageDate'>{request.securing.finished_at_date} {request.securing.finished_at_time}</p>
                    </div>

                    <div className={`${request.anonymizing?.status}Net`}></div>

                    <div className='row'>
                        <div id='stageStatus'>
                            <img src={statusImages[request.anonymizing?.status]} className='stageStatusIcon' alt="Статус" />
                            <p className={request.anonymizing?.status}>Анонимизация датасета, защита персональных данных</p>
                            {request.anonymizing.status === 'done' && <button className='showReportButton'  onClick={() => setisAnonymizingReportOpen(true)}>Подробнее</button>}
                            {request.anonymizing?.status === 'done' &&
                                <AnonReport
                                    isOpen={isAnonymizingReportOpen}    
                                    onClose={()=>{setisAnonymizingReportOpen(false)}}
                                    report={request.anonymizing.category}     
                                    warning={false}                    
                                />}
                        </div>
                        <p className='stageDate'>{request.anonymizing.finished_at_date} {request.anonymizing.finished_at_time}</p>
                    </div>

                    <div className={`${request.cleaning?.status}Net`}></div>
                    
                    <div className='row'>
                        <div id='stageStatus'>
                            <img src={statusImages[request.cleaning?.status]} className='stageStatusIcon' alt="Статус" />
                            <p className={request.cleaning?.status}>Подготовка датасета к использованию, предобработка данных</p>
                            {/*request.cleaning.status === 'done' && <button className='showReportButton'>Подробнее</button>*/}
                        </div>
                        <p className='stageDate'>{request.cleaning.finished_at_date} {request.cleaning.finished_at_time}</p>
                    </div>
                    
                    <div className={`${request.uploading?.status}Net`}></div>

                    <div className='row'>
                        <div id='stageStatus'>
                            <img src={statusImages[request.uploading?.status]} className='stageStatusIcon' alt="Статус" />
                            <p className={request.uploading?.status}>Датасет загружен</p>
                        </div>
                        <p className='stageDate'>{request.uploading.finished_at_date} {request.uploading.finished_at_time}</p>
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default UploadRequest;