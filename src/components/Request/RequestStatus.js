import React, {useEffect} from 'react';
import datasetUploadedIcon from '../../img/datasetUploaded.png';
import stage1 from '../../img/stage0.png';
import stage2 from '../../img/stage1.png';
import stage3 from '../../img/stage2.png';
import stage4 from '../../img/stage3.png';
import failed from '../../img/failStage.png';

const RequestStatus = ({ request }) => {
    
useEffect(()=>{
    console.log(request.metadata_securing)
})
    return (
        <div className='row' style={{margin: '0'}}>
            {request.sending?.status === 'in_progress' && (
                <div id='status'>
                    <p className={request.sending.status}> На проверке </p>
                    <img src={stage1} className='statusIcon' alt="Статус" />
                </div>
            )}
            {(request.metadata_securing.status === 'in_progress' || request.metadata_securing.status === 'failed')&& (
                <div id='status'>
                    <p className={request.metadata_securing.status}> Сканирование метаданных</p>
                    <img src={request.metadata_securing.status === 'failed' ? failed : stage1} className={request.metadata_securing.status === 'failed' ? 'statusIconSmaller' :'statusIcon'} alt="Статус" />
                </div>
            )}
            {(request.files_securing?.status === 'in_progress' || request.files_securing?.status === 'failed') && (
                <div id='status'>
                    <p className={request.files_securing.status}> Сканирование на безопасность</p>
                    <img src={request.files_securing.status === 'failed' ? failed : stage1} className={request.files_securing.status === 'failed' ? 'statusIconSmaller' :'statusIcon'} alt="Статус" />
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
                    <p className={request.uploading.status}> Датасет загружается</p>
                    <img src={stage4} className='statusIcon' alt="Статус" />
                </div>
            )}
            {request.uploading?.status === 'done' && (
                <div id='status'>
                    <p className={request.uploading.status}> Датасет загружен</p>
                    <img src={datasetUploadedIcon} className='statusIcon' alt="Статус" />
                </div>
            )}
        </div>
    );
}

export default RequestStatus;