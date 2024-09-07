import React from 'react';
import datasetUploadedIcon from '../../img/datasetUploaded.png';
import failed from '../../img/failStage.png';
import stage1 from '../../img/stage0.png';
import stage2 from '../../img/stage1.png';
import stage3 from '../../img/stage2.png';
import stage4 from '../../img/stage3.png';
import { ProgressCircle } from '..';

const RequestStatus = ({ request }) => {
    const statuses = [
        request.sending?.status,
        request.image_securing?.status,
        request.metadata_securing?.status,
        request.files_securing?.status,
        request.anonymizing?.status,
        request.cleaning?.status,
        request.uploading?.status
    ];
    
    const stages = [
        'На проверке',
        'Сканирование обложки на безопасность',
        'Сканирование метаданных',
        'Сканирование датасета на безопасность',
        'Анонимизация датасета, защита персональных данных',
        'Подготовка датасета к использованию, предобработка данных',
        'Датасет загружен'
    ];

    const hasFailed = statuses.includes('failed');
    const allDone = statuses.every(status => status === 'done');
    
    const formatInProgressStages = () => {
        if (statuses[6] === 'done') return <p className='done'>{stages[6]}</p>;

        if (hasFailed) {
            const failedIndices = statuses.map((status, index) => (status === 'failed' ? index : -1)).filter(index => index !== -1);
            return <p className='failed'>{failedIndices.map(index => stages[index]).join(', ')}</p>
        }

        const inProgressIndices = statuses.map((status, index) => (status === 'in_progress' ? index : -1)).filter(index => index !== -1);
        return <p className='in_progress'>{inProgressIndices.map(index => stages[index]).join(', ')}</p>
    };

    return (
        <div className='row' style={{margin: '0'}}>
            <div id='status'>
                {formatInProgressStages()}
                {
                    hasFailed ? (<img src={failed} className='statusIcon' alt="Статус" />)
                    : statuses[6] === 'done' ? (<img src={datasetUploadedIcon} className='statusIcon' alt="Статус" />)
                    : <ProgressCircle statuses={statuses} />
                }
            </div>
        </div>
    );
};

export default RequestStatus;
