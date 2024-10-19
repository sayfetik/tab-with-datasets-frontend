import React from 'react';
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
        'Загрузка датасета на платформу',
        'Загружен'
    ];

    const hasFailed = statuses.includes('failed');
    //const allDone = statuses.every(status => status === 'done');
    
    const formatInProgressStages = () => {
        if (statuses[6] === 'done') return <p id='requestStatus' className='done'>{stages[7]}</p>;

        if (hasFailed) {
            const failedIndices = statuses.map((status, index) => (status === 'failed' ? index : -1)).filter(index => index !== -1);
            return <p className='failed' id='requestStatus'>{failedIndices.map(index => stages[index]).join(', ')}</p>
        }

        const inProgressIndices = statuses.map((status, index) => (status === 'in_progress' ? index : -1)).filter(index => index !== -1);
        return <p className='in_progress' id='requestStatus'>{inProgressIndices.map(index => stages[index]).join(', ')}</p>
    };

    return (
        <div className='row' style={{margin: '0'}}>
            <div id='status'>
                {formatInProgressStages()}
                {<ProgressCircle statuses={statuses} />}
            </div>
        </div>
    );
};

export default RequestStatus;
