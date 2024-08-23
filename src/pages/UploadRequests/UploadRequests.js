import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Header, UploadRequest } from '../../components';
import './UploadRequests.css';
import plusWhiteIcon from '../../img/plusWhite.png';

const UploadRequests = () => {
    const { state: requests } = useLocation();
    const [openStageIndex, setOpenStageIndex] = useState([]);
    
    const toggleStage = (index) => {
        if (openStageIndex.includes(index)) {
            setOpenStageIndex(openStageIndex.filter((i) => i !== index));
        } else {
            setOpenStageIndex([...openStageIndex, index]);
        }
    };


    return (
        <div>
            <Header />
            <div id='uploadRequests'>
                <div className='rowSpaceBetween' id='pageLabel'>
                    <h1>Заявки на загрузку</h1>
                    <div className='row'>
                        <select className='selectionInput' id='datasetForm'>
                            <option>Список</option>
                            <option>Карточки</option>
                        </select>
                        <button className='blueButton'>
                            <img src={plusWhiteIcon} id='plusIcon' alt="Добавить новый датасет" />
                            Новый датасет
                        </button>
                    </div>
                </div>

                <h2 className='subSectionRequests'>Загруженные</h2>
                <div className='datasetsList'>
                    {requests.map((request, index) => (
                        request.uploading.status === 'done' &&
                            <UploadRequest
                                key={index}
                                request={request}
                                toggleStage={toggleStage}
                                isOpen={openStageIndex.includes(request.request_id)}
                            />
                    ))}
                </div>

                <h2 className='subSectionRequests'>Загружаются</h2>
                <div className='datasetsList'>
                    {requests.map((request, index) => (
                            request.uploading.status != 'done' &&
                                <UploadRequest
                                    key={index}
                                    request={request}
                                    toggleStage={toggleStage}
                                    isOpen={openStageIndex.includes(request.request_id)}
                                />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default UploadRequests;