import React, { useState, useEffect } from 'react';
import { RequestReport, AnonReport } from '../..';
import { useParams, useNavigate } from 'react-router-dom';
import plusWhiteIcon from '../../../img/plusWhite.png';
import datasetUploadedIcon from '../../../img/datasetUploaded.png';
import redTrash from '../../../img/trashRed.png';
import arrowDown from '../../../img/arrowDown.png';
import not_started from '../../../img/notStartedStage.png';
import in_progress from '../../../img/startedStage.png';
import failed from '../../../img/failStage.png';
import done from '../../../img/successStage.png';
import stage1 from '../../../img/stage0.png';
import stage2 from '../../../img/stage1.png';
import stage3 from '../../../img/stage2.png';
import stage4 from '../../../img/stage3.png';
import './RequestFullModal.css'


const RequestFullModal = ({ request, isOpen, onClose }) => {
    const [isSecuringReportOpen, setisSecuringReportOpen] = useState(false);
    const [isMetadataSecuringReportOpen, setisMetadataSecuringReportOpen] = useState(false);
    const [isAnonymizingReportOpen, setisAnonymizingReportOpen] = useState(false);
    const [isCleaningReportOpen, setisCleaningReportOpen] = useState(false);
    const navigate = useNavigate();

    const statusImages = {
        'not_started': not_started,
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
                    {request.sending?.status === 'in_progress' && (
                        <div id='status'>
                            <p className={request.sending.status}> На проверке </p>
                            <img src={stage1} className='statusIcon' alt="Статус" />
                        </div>
                    )}
                    {request.metadata_securing?.status === 'in_progress' && (
                        <div id='status'>
                            <p className={request.metadata_securing.status}> Сканирование метаданных</p>
                            <img src={request.metadata_securing.status === 'failed' ? stage2 : stage1} className='statusIcon' alt="Статус" />
                        </div>
                    )}
                    {request.files_securing?.status === 'in_progress' && (
                        <div id='status'>
                            <p className={request.files_securing.status}> Сканирование на безопасность</p>
                            <img src={request.files_securing.status === 'failed' ? stage2 : stage1} className='statusIcon' alt="Статус" />
                        </div>
                    )}
                    {request.anonymizing?.status === 'in_progress' && (
                        <div id='status'>
                            <p className={request.anonymizing.status}> Анонимизация датасета, защита персональных данных</p>
                            <img src={stage2} className='statusIcon' alt="Статус" />
                        </div>
                    )}
                    {request.cleaning?.status === 'in_progress' && (
                        <div id='status'>
                            <p className={request.cleaning.status}> Подготовка датасета к использованию, предобработка данных</p>
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
                
                <button className="report-close-button" onClick={onClose}>&times;</button>
            </div>
          <div className='fullStages'>
                    <div className='stages'>
                    {request.sending && (
                        <>
                        <div className='not_startedNet'></div>
                        <div className='row'>
                            <div id='stageStatus'>
                            <img src={statusImages[request.sending.status]} className='stageStatusIcon' alt="Статус" />
                            <p className={request.sending.status}>На проверке</p>
                            </div>
                            {request.sending.finished_at_date!== 'None' && <p className='stageDate'>{request.sending.finished_at_date} {request.sending.finished_at_time}</p>}
                        </div>
                        </>
                    )}

                    {request.metadata_securing && (
                        <>
                        <div className='not_startedNet'></div>
                        <div className='row'>
                            <div id='stageStatus'>
                            <img src={statusImages[request.metadata_securing.status]} className='stageStatusIcon' alt="Статус" />
                            <p className={request.metadata_securing.status}>Сканирование метаданных</p>
                            {request.metadata_securing?.status === 'failed' && (
                                <div style={{height: '20px'}}>
                                <button className='showReportButton' onClick={() => setisSecuringReportOpen(true)}>Подробнее</button>
                                <RequestReport
                                    isOpen={isMetadataSecuringReportOpen}    
                                    onClose={()=>{setisMetadataSecuringReportOpen(false)}}
                                    report={request.metadata_securing.files}     
                                    warning={true}
                                    label='Файлы с подозрениями на нарушение заполненных метаданных'                      
                                />
                                </div>
                            )}
                            </div>
                            {request.metadata_securing.finished_at_date!== 'None' && <p className='stageDate'>{request.metadata_securing.finished_at_date} {request.metadata_securing.finished_at_time}</p>}
                        </div>
                        </>
                    )}

                    {request.files_securing && (
                        <>
                        <div className='not_startedNet'></div>
                        <div className='row'>
                        <div id='stageStatus'>
                            <img src={statusImages[request.files_securing.status]} className='stageStatusIcon' alt="Статус" />
                            <p className={request.files_securing.status}>Сканирование на безопасность</p>
                            {request.files_securing.status === 'failed' && (
                            <div style={{height: '20px'}}>
                                <button className='showReportButton' onClick={() => setisSecuringReportOpen(true)}>Подробнее</button>
                                <RequestReport
                                isOpen={isSecuringReportOpen}    
                                onClose={()=>{setisSecuringReportOpen(false)}}
                                report={request.files_securing.files}     
                                warning={true}
                                label='Файлы с подозрениями на нарушение безопасности'                      
                                />
                            </div>
                            )}
                        </div>
                        {request.files_securing.finished_at_date!== 'None' && <p className='stageDate'>{request.files_securing.finished_at_date} {request.files_securing.finished_at_time}</p>}
                        </div>
                        </>)}

                    {request.anonymizing && (
                        <>
                        <div className='not_startedNet'></div>
                        <div className='row'>
                            <div id='stageStatus'>
                            <img src={statusImages[request.anonymizing.status]} className='stageStatusIcon' alt="Статус" />
                            <p className={request.anonymizing.status}>Анонимизация датасета, защита персональных данных</p>
                            {request.anonymizing.status === 'done' && (
                                <>
                                <button className='showReportButton' onClick={() => setisAnonymizingReportOpen(true)}>Подробнее</button>
                                <AnonReport
                                    isOpen={isAnonymizingReportOpen}    
                                    onClose={()=>{setisAnonymizingReportOpen(false)}}
                                    report={request.anonymizing.category}     
                                    warning={false}                    
                                />
                                </>
                            )}
                            </div>
                            {request.anonymizing.finished_at_date!== 'None' && <p className='stageDate'>{request.anonymizing.finished_at_date} {request.anonymizing.finished_at_time}</p>}
                        </div>
                        </>
                    )}

                    {request.cleaning && (
                        <>
                        <div className='not_startedNet'></div>
                        <div className='row'>
                            <div id='stageStatus'>
                            <img src={statusImages[request.cleaning.status]} className='stageStatusIcon' alt="Статус" />
                            <p className={request.cleaning.status}>Подготовка датасета к использованию, предобработка данных</p>
                            </div>
                            {request.cleaning.finished_at_date!== 'None' && <p className='stageDate'>{request.cleaning.finished_at_date} {request.cleaning.finished_at_time}</p>}
                        </div>
                        </>
                    )}

                    {request.uploading && (
                        <>
                        <div className='not_startedNet'></div>
                        <div className='row'>
                            <div id='stageStatus'>
                            <img src={statusImages[request.uploading.status]} className='stageStatusIcon' alt="Статус" />
                            <p className={request.uploading.status}>Датасет загружен</p>
                            </div>
                            {request.uploading.finished_at_date!== 'None' && <p className='stageDate'>{request.uploading.finished_at_date} {request.uploading.finished_at_time}</p>}
                        </div>
                        </>
                    )}
                    </div>
                </div>
        
        </div>
        </div>
    );
}

export default RequestFullModal;