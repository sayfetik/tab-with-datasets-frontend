import React, { useState } from 'react';
import { UploadRequest, RequestCard } from '../';
import loadingDarkGif from '../../img/loadingDark.gif';

const RequestList = ({requests, error, view, loading}) => {
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
            return <h3 id='loadingRequests' style={{marginTop: '15px'}}>Здесь пока пусто!</h3>
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
                    fetchPreview={false}
                />))}
        </div>)
    } else { return (
        <div id='cardsContainer'>
            <div id='cards'>
                {requests.map((request, index) => (
                    <RequestCard key={index} request={request} fetchPreview={false}/>
                ))}
            </div>
        </div>)  
    }
}

export default RequestList;