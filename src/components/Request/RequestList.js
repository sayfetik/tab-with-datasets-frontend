import React, { useState, useEffect } from 'react';
import { UploadRequest, RequestCard, BackendConnector } from '../';
import loadingDarkGif from '../../img/loadingDark.gif';

const RequestList = ({type, view}) => {
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setisLoading] = useState(true);
    
    const fetchRequests = async () => {
        try {
            let data;
            if (type === 'uploading') data = await BackendConnector.getUploadingRequests();
            else if (type === 'failed') data = await BackendConnector.getFailedRequests();
            else if (type === 'uploaded') data = await BackendConnector.getUploadedRequests();
            if (data && data.length > 0) setRequests(data.reverse());
            if (data && data.length === 0) setRequests(data);
            setError(false);
        } catch (error) {
            console.error(error);
            setError(true);
        }
        setisLoading(false);
    };

    useEffect(() => {
        fetchRequests();
        const intervalId = setInterval(() => {
            fetchRequests();
        }, 7000);

        return () => clearInterval(intervalId);
    }, [type]);

    const [openStageIndex, setOpenStageIndex] = useState([]);

    const toggleStage = (index) => {
        if (openStageIndex.includes(index)) setOpenStageIndex(openStageIndex.filter((i) => i !== index));
        else setOpenStageIndex([...openStageIndex, index]);
    };

    if (error) { return (
        <h3 id='loadingRequests' style={{marginTop: '15px'}}>Произошла ошибка. Попробуйте позже</h3>)
    }

    if (requests.length === 0) { 
        if (loading) { return (
            <div className='row' style={{marginTop: '15px'}}>
                <h3 id='loadingRequests'>Загрузка</h3>
                <img src={loadingDarkGif} id='loadingGifRequests'/>
            </div>)
        } else {
            return <h3 id='loadingRequests' style={{marginTop: '15px'}}>Таких датасетов нет</h3>
        }
    }

    if (view === 'list') { return (
        <div className='datasetsList'>
            {requests.map((request, index) => (
                <UploadRequest
                    key={index}
                    request={request}
                    toggleStage={toggleStage}
                    isOpen={openStageIndex.includes(request.request_id)}
                    fetchPreview={type === 'uploaded'}
                />))}
        </div>)
    } else { return (
        <div id='cardsContainer'>
            <div id='cards'>
                {requests.map((request, index) => (
                    <RequestCard key={index} request={request} fetchPreview={type === 'uploaded'}/>
                ))}
            </div>
        </div>)  
    }
}

export default RequestList;