import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Header, UploadRequest, RequestCard, BackendConnector } from '../../components';
import './UploadRequests.css';
import plusWhiteIcon from '../../img/plusWhite.png';
import accountImage from '../../img/accountImage.png'

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
    if (!requests) {
        return <div>
                    <Header />
                    <div id='uploadRequests'>
                        <div className='rowSpaceBetween' id='pageLabel'>
                            <h2>Заявки на загрузку</h2>
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
                        <div style={{marginBottom: '30px'}}></div>
                        <h3>Загрузите датасет и он появится тут!</h3>
                    </div>
                </div>;
    }

    return (
        <div>
            <Header />
            <div id='uploadRequests'>
                <div className='profile'>
                    <img src={accountImage} id='profileImage' />
                    <h2>Администратор</h2>
                </div>
                <div className='rowSpaceBetween' id='pageLabel'>
                    <h3 id='requestsLabel'>Заявки на загрузку</h3>
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

                {requests.filter(item => item.uploading.status === 'done').length !==0 && <h3  className='subSectionRequests'>Загруженные</h3>}
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

                {requests.filter(item => item.uploading.status !== 'done').length !==0 && <h3 className='subSectionRequests'>Загружаются</h3>}
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