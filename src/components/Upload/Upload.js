import React, { useState } from 'react';
import Input from '../Input/Input';
import Back from '../Back/Back';
import UploadFile from './UploadFilesSection/UploadFilesPart';
import './Upload.css';
import axios from 'axios';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Header />
            <div className='upload'>
            <Back />
            <UploadFile limitFile="5" limitImage="100" />
            <div className='metadataSection'>
                <div>
                    <Input label="Название" placeholder="Введите название"/>
                    <div className='metadataLabel'>Видимость</div>
                    <select className="visible" id="metadataField">
                        <option value="Private">Приватный</option>
                        <option value="Public">Публичный</option>
                    </select>
                    <Input label="Авторы" placeholder="Введите автора"/>
                    <Input label="Источник" placeholder="Введите источник"/>
                    <Input label="Частота обновлений" placeholder="Введите частоту обновлений"/>
                </div>
                <div>
                    <Input label="Теги" placeholder="Введите теги" />
                    <div id='descriptionInputContainer'>
                        <div className='metadataBigItem'>
                            <div className='inputLabel'>Описание</div>
                            <textarea id='descriptionInput' placeholder='Введите описание'></textarea>
                        </div>
                    </div>
                    <div id='saveButtons'>
                        <button className='saveDraft' onClick={()=>{
                                axios.get('https://tab-with-datasets-mock.onrender.com/save_draft', {})
                                    .then(response => { alert(response.data); })
                                    .catch((error) => { console.log(error); });
                            }}>Сохранить черновик</button>
                            <button className='uploadDataset' onClick={()=>{navigate('/unsuccessUpload')}}>Загрузить датасет</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Upload;
