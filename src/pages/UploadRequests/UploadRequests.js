import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, UploadRequest, RequestCard, BackendConnector, Icon } from '../../components';
import './UploadRequests.css';
import plusWhiteIcon from '../../img/plusWhite.png';
import accountImage from '../../img/accountImage.png';
import back from '../../img/back.png';
import loadingDarkGif from '../../img/loadingDark.gif';

const UploadRequests = () => {
    const navigate = useNavigate();
        
    const [requests, setRequests] = useState([]);

    const fetchRequests = async () => {
        try {
            const data = await BackendConnector.fetchUploadRequests(1);
            setRequests(data.reverse());
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(fetchRequests, 5000);
        return () => clearInterval(intervalId);
    }, []);

    const [openStageIndex, setOpenStageIndex] = useState([]);
    const [view, setView] = useState('list');

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
                        <div className='back' onClick={()=>{navigate('/')}} style={{marginBottom: '40px', }}>
                            <Icon image={back} />
                            <button>На главную</button>
                        </div>
                        <div className='rowSpaceBetween' id='pageLabel'>
                            <h3 id='requestsLabel'>Заявки на загрузку</h3>
                            <div className='row'>
                                <button className='blueButton' onClick={() => { navigate('/upload') }}>
                                    <img src={plusWhiteIcon} id='plusIcon' alt="Добавить новый датасет" />
                                    Новый датасет
                                </button>
                            </div>
                        </div>
                        <div style={{marginBottom: '30px'}}></div>
                        <h3 className='subSectionRequests'>Загрузите датасет и он появится тут!</h3>
                    </div>
                </div>;
    }

    const failedRequests = requests.filter(request => {
        return Object.values(request).some(stage => stage.status === 'failed');
      });
    
    const inProgressRequests = requests.filter(request => {
    const hasFailedStage = Object.values(request).some(stage => stage.status === 'failed');
    const isUploadingNotDone = request.uploading.status !== 'done';
    
    return !hasFailedStage && isUploadingNotDone;
    });

    return (
        <div>
            <Header />
            <div id='uploadRequests'>
                <div className='back'onClick={()=>{navigate('/')}} style={{marginBottom: '40px'}}>
                    <Icon image={back} />
                    <button style={{whiteSpace: 'nowrap'}}>На главную</button>
                </div>
                <div className='profile'>
                    <img src={accountImage} id='profileImage' alt=''/>
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

                {requests.length === 0 && <div className='row'>
                    <h3 id='loadingRequests'>Загрузка</h3>
                    <img src={loadingDarkGif} id='loadingGifRequests'/>
                </div>}
                
                {inProgressRequests.length !==0 && <h3 className={view === 'list' ? 'subSectionRequests' : 'subSectionRequestsCards'}>Загружаются</h3>}
                {view === 'list' ?
                    <div className='datasetsList'>
                        {inProgressRequests.map((request, index) => (
                            <UploadRequest
                                key={index}
                                request={request}
                                toggleStage={toggleStage}
                                isOpen={openStageIndex.includes(request.request_id)}
                                fetchPreview={false}
                            />
                        ))}
                    </div>
                    :
                    <div id='cardsContainer'>
                        <div id='cards'>
                            {inProgressRequests.map((request, index) => (
                                <RequestCard key={index} request={request} fetchPreview={false}/>
                            ))}
                        </div>
                    </div>}

                {failedRequests.length !==0 && <h3  className={view === 'list' ? 'subSectionRequests' : 'subSectionRequestsCards'} style={{marginTop: '30px'}}>Загрузка приостановлена</h3>}
                {view === 'list' ?
                    <div className='datasetsList'>
                        {failedRequests.map((request, index) => (
                            <UploadRequest
                                key={index}
                                request={request}
                                toggleStage={toggleStage}
                                isOpen={openStageIndex.includes(request.request_id)}
                                fetchPreview={false}
                            />
                        ))}
                    </div>
                    :
                    <div id='cardsContainer'>
                        <div id='cards'>
                            {failedRequests.map((request, index) => (
                                <RequestCard key={index} request={request} fetchPreview={false}/>
                            ))}
                        </div>
                    </div>}
                    

                {requests.filter(item => item.uploading.status === 'done').length !==0 && <h3  className={view === 'list' ? 'subSectionRequests' : 'subSectionRequestsCards'} style={{marginTop: '30px'}}>Загруженные</h3>}
                {view === 'list' ?
                    <div className='datasetsList'>
                        {requests.map((request, index) => (
                            request.uploading.status === 'done' &&
                                <UploadRequest
                                    key={index}
                                    request={request}
                                    toggleStage={toggleStage}
                                    isOpen={openStageIndex.includes(request.request_id)}
                                    fetchPreview={true}
                                />
                        ))}
                    </div>
                    :
                    <div id='cardsContainer'>
                        <div id='cards'>
                            {requests.map((request, index) => (
                                request.uploading.status === 'done' && <RequestCard key={index} request={request} fetchPreview={true}/>
                            ))}
                        </div>
                    </div>}
            </div>
        </div>
    );
}

export default UploadRequests;