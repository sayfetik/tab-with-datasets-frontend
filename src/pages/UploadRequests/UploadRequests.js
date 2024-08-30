import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Header, UploadRequest, RequestCard, BackendConnector } from '../../components';
import './UploadRequests.css';
import plusWhiteIcon from '../../img/plusWhite.png';

const UploadRequests = () => {
    const [requests, setRequests] = useState([]);
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const data = await BackendConnector.fetchUploadRequests(1);
                setRequests(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
    
        fetchRequests();
    }, [requests]);

    const [openStageIndex, setOpenStageIndex] = useState([]);
    const [view, setView] = useState('list');
    const navigate = useNavigate();

    const toggleStage = (index) => {
        if (openStageIndex.includes(index)) {
            setOpenStageIndex(openStageIndex.filter((i) => i !== index));
        } else {
            setOpenStageIndex([...openStageIndex, index]);
        }
    };

    // Проверка на наличие requests
    if (!requests || !Array.isArray(requests)) {
        return <div id='unsuccessUpload'>
                    <div id='mainSectionUnsuccess'>
                        <h2>Произошла ошибка. Повторите попытку</h2>
                    </div>
                </div>;
    }

    return (
        <div>
            <Header />
            <div id='uploadRequests'>
                <div className='rowSpaceBetween' id='pageLabel'>
                    <h1>Заявки на загрузку</h1>
                    <div className='row'>
                        <select className='selectionInput' onChange={(e)=>{setView(e.target.value)}} defaultValue='list' id='datasetForm'>
                            <option value='list'>Список</option>
                            <option value='cards'>Карточки</option>
                        </select>
                        <button className='blueButton' onClick={() => { navigate('/upload') }}>
                            <img src={plusWhiteIcon} id='plusIcon' alt="Добавить новый датасет" />
                            Новый датасет
                        </button>
                    </div>
                </div>

                <h2 className='subSectionRequests'>Загруженные</h2>
                {view === 'list' ?
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
                    :
                    <div id='cards'>
                        {requests.map((request, index) => (
                            request.uploading.status === 'done' && <RequestCard key={index} request={request}/>
                        ))}
                    </div>}

                {requests.filter(item => item.uploading.status !== 'done').length !==0 && <h2 className='subSectionRequests'>Загружаются</h2>}
                {view === 'list' ?
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
                    :
                    <div id='cards'>
                        {requests.map((request, index) => (
                            request.uploading.status != 'done' && <RequestCard key={index} request={request}/>
                        ))}
                    </div>}
            </div>
        </div>
    );
}

export default UploadRequests;