import React, { useState, useEffect } from 'react';
import { Tabs } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { Header, Icon, RequestList } from '../../components';
import './UploadRequests.css';
import plusWhiteIcon from '../../img/plusWhite.png';
//import accountImage from '../../img/accountImage.png';
import back from '../../img/back.png';

const UploadRequests = () => {
    const navigate = useNavigate();
    const [view, setView] = useState('list');
    useEffect(() => {
        document.title = `Мои датасеты`;
      }, []);
    
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
                        <button className='blueButton' id='newDatasetButtonBig' onClick={() => { navigate('/upload') }}>
                            <img src={plusWhiteIcon} id='plusIcon' alt="Добавить новый датасет" />
                            Новый датасет
                        </button>
                        <button className='blueButton' id='newDatasetButtonSmall' onClick={() => { navigate('/upload') }}>
                            <img src={plusWhiteIcon} id='plusIcon' alt="Добавить новый датасет" />
                        </button>
                    </div>
                </div>
                
                <Tabs defaultValue="in_progress" classNames={{tabLabel: 'tabLabel', list: 'tabList', tab: 'tab'}}>
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
                        <RequestList type='uploading'view={view}  />
                    </Tabs.Panel>

                    <Tabs.Panel value="stopped" pt="xs">
                        <RequestList type='failed' view={view} />
                    </Tabs.Panel>

                    <Tabs.Panel value="uploaded" pt="xs">
                        <RequestList type='uploaded' view={view} />
                    </Tabs.Panel>
                </Tabs>
            </div>
        </div>
    );
}

export default UploadRequests;