import React, { useState, useEffect } from 'react';
import { Tabs } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { Header, UploadRequest, RequestCard, BackendConnector, Icon, RequestList } from '../../components';
import './UploadRequests.css';
import plusWhiteIcon from '../../img/plusWhite.png';
//import accountImage from '../../img/accountImage.png';
import back from '../../img/back.png';
import loadingDarkGif from '../../img/loadingDark.gif';

const UploadRequests = () => {
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [openStageIndex, setOpenStageIndex] = useState([]);
    const [view, setView] = useState('list');
    const [isError, setError] = useState(false);
    const [isLoading, setisLoading] = useState(false);

    const fetchRequests = async () => {
        try {
            const data = await BackendConnector.fetchUploadRequests(1);
            setRequests(data.reverse());
        } catch (error) {
            console.error("Error fetching data: ", error);
            setError(true);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(fetchRequests, 10000);
        return () => clearInterval(intervalId);
    }, []);

    const failedRequests = requests.filter(request => {
        return Object.values(request).some(stage => stage.status === 'failed');
    });
    
    const inProgressRequests = requests.filter(request => {
        const hasFailedStage = Object.values(request).some(stage => stage.status === 'failed');
        const isUploadingNotDone = request.uploading.status !== 'done';
        return !hasFailedStage && isUploadingNotDone;
    });
    const uploadedRequests = requests.filter(request => {
        const hasFailedStage = Object.values(request).some(stage => stage.status === 'failed');
        const isUploadingDone = request.uploading.status === 'done';
        return !hasFailedStage && isUploadingDone;
    });

    return (
        <div>
            <Header />
            <div id='uploadRequests'>
                <div className='back'onClick={()=>{navigate('/')}} style={{marginBottom: '40px'}}>
                    <Icon image={back} />
                    <button style={{whiteSpace: 'nowrap'}}>На главную</button>
                </div>
                {/*<div className='profile'>
                    <img src={accountImage} id='profileImage' alt=''/>
                    <h2>Администратор</h2>
    </div>*/}
                <div className='rowSpaceBetween' id='pageLabel' style={{marginBottom: '20px'}}>
                    {/*<h3 id='requestsLabel'>Заявки на загрузку</h3>*/}
                    <h2>Мои датасеты</h2>
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
                
                <Tabs defaultValue="gallery" classNames={{tabLabel: 'tabLabel', list: 'tabList', tab: 'tab'}}>
                    <Tabs.List>
                        <Tabs.Tab value="in_progress">
                        Загружаются
                        </Tabs.Tab>
                        <Tabs.Tab value="stopped">
                        Загрузка приостановлена
                        </Tabs.Tab>
                        <Tabs.Tab value="uploaded">
                        Загруженные
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="in_progress" pt="xs">
                        <RequestList requests={inProgressRequests} error={isError} view={view} loading={isLoading} />
                    </Tabs.Panel>

                    <Tabs.Panel value="stopped" pt="xs">
                        <RequestList requests={failedRequests} error={isError} view={view} loading={isLoading} />
                    </Tabs.Panel>

                    <Tabs.Panel value="uploaded" pt="xs">
                        <RequestList requests={uploadedRequests} error={isError} view={view} loading={isLoading} />
                    </Tabs.Panel>
                </Tabs>
            </div>
        </div>
    );
}

export default UploadRequests;