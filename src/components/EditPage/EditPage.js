import React, { useState } from 'react';
import Input from '../Input/Input';
import Back from '../Back/Back';
import UploadFile from '../Upload/UploadFilesSection/UploadFilesPart';
import axios from 'axios';
import Header from '../Header/Header';
import Notification from '../Notification/Notification';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../Notification/NotificationContext';
import InputTags from '../InputTags/InputTags';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './EditPage.css'

const Upload = () => {
    const { id } = useParams();
    const { state: dataset } = useLocation();

    const { showNotification } = useNotification();

    const navigate = useNavigate();
    const navigationButtonClick = () => {
      navigate('/dataset');
      showNotification("Датасет успешно обновлён!");
    };

    const [titleOfDataset, setTitleOfDataset] = useState(dataset.title);
    const [visibility, setVisibility] = useState(dataset.visibility);
    const [authors, setAuthors] = useState(dataset.authors);
    const [dataSource, setDataSource] = useState('');
    const [expectedUpdateFrequency, setExpectedUpdateFrequency] = useState(dataset.expected_update_frequency);
    const [license, setLicense] = useState(dataset.license);
    const [doi, setDoi] = useState(dataset.doi);
    const [description, setDescription] = useState(dataset.description);
    const [tags, setTags] = useState(dataset.tags);

    const areRequiredInputsFilled = description && titleOfDataset && authors && tags;
    
    const checkRequiredInputsAndUpload = () => {
        if (!areRequiredInputsFilled) {
            alert('Пожалуйста, заполните обязательные поля, чтобы продолжить');
        } else 
            navigationButtonClick();
    };

    return (
        <div>
            <Header />
            <div className='upload'>
            <Back />
            <UploadFile limitFile="5" limitImage="100" />
            <div className='metadataSection'>
            <div>
                    <Input
                        label="Название *"
                        placeholder="Введите название"
                        value={titleOfDataset}
                        onChange={(e) => setTitleOfDataset(e.target.value)}
                    />
                    <div className='metadataLabel'>Видимость *</div>
                    <select className="visible" id="metadataField" value={visibility} onChange={(e)=>setVisibility(e.target.value)}>
                        <option value="private">Приватный</option>
                        <option value="public">Публичный</option>
                    </select>
                    <Input
                        label="Авторы *"
                        placeholder="Введите автора"
                        value={authors}
                        onChange={(e) => setAuthors(e.target.value)}
                    />
                    <Input
                        label="Источник"
                        placeholder="Введите источник"
                        value={dataSource}
                        onChange={(e) => setDataSource(e.target.value)}
                        />
                    <Input
                        label="Частота обновлений"
                        placeholder="Введите частоту обновлений"
                        value={expectedUpdateFrequency}
                        onChange={(e) => setExpectedUpdateFrequency(e.target.value)}
                        />
                    <div className='metadataLabel' onChange={(e)=>setLicense(e.target.value)}>Лицензия</div>
                    <select className="visible" id="metadataField">
                        <option value="Public Domain">Public Domain Mark - Public Domain</option>
                        <option value="PDDL">Open Data Commons Public Domain Dedication and License - PDDL</option>
                        <option value="CC-BY">Creative Commons Attribution 4.0 International CC-BY</option>
                        <option value="CDLA Permissive-2.0">Community Data License Agreement – CDLA Permissive-2.0</option>
                        <option value="ODC-BY">Open Data Commons Attribution License - ODC-BY</option>
                        <option value="CC-BY-SA">Creative Commons Attribution-ShareAlike 4.0 International - CC-BY-SA</option>
                        <option value="CDLA-Sharing-1.0">Community Data License Agreement – CDLA-Sharing-1.0</option>
                        <option value="ODC-ODbL">Open Data Commons Open Database License - ODC-ODbL</option>
                        <option value="Creative Commons Public Domain Dedication">Creative Commons Public Domain Dedication</option>
                        <option value="CC BY-NC">Creative Commons Attribution-NonCommercial 4.0 International - CC BY-NC</option>
                        <option value="CC BY-NC-SA">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International - CC BY-NC-SA</option>
                        <option value="ODC-ODbL">Open Data Commons Open Database License - ODC-ODbL</option>
                        <option value="Additional License Coverage Options">Additional License Coverage Options</option>
                        <option value="No license specified">No license specified</option>
                    </select>
                    <Input
                        label="DOI"
                        placeholder="Укажите doi"
                        value={doi}
                        onChange={(e) => setDoi(e.target.value)}
                        />
                </div>

                <div id='rightContainer'>
                    <div>
                        <div id='descriptionInputContainer'>
                            <div className='metadataBigItem'>
                                <div className='inputLabel'>Описание</div>
                                <textarea
                                    id='descriptionInput'
                                    placeholder='Введите описание'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                            </div>
                        </div>
                    </div>
                
                
                    <div>
                        <span className='inputLabel'>Теги</span>
                        <div id='tagsInput'>
                            <InputTags />
                        </div>
                    </div>

                    <div id='saveButtons'>
                            <div className="wrapper">
                                <button className="cta" onClick={checkRequiredInputsAndUpload}>
                                    <span className='renewDataset'>Обновить датасет</span>
                                    <span id='arrowsAnimation'>
                                    <svg className='svgArrows'
                                        width="66px"
                                        height="43px"
                                        viewBox="0 0 66 43"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                    >
                                        <g id="arrow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                        <path
                                            className="one"
                                            d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                                            fill="#FFFFFF"
                                        ></path>
                                        <path
                                            className="two"
                                            d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                                            fill="#FFFFFF"
                                        ></path>
                                        <path
                                            className="three"
                                            d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                                            fill="#FFFFFF"
                                        ></path>
                                        </g>
                                    </svg>
                                    </span>
                                </button>
                                {showNotification && (
                                    <Notification
                                    message="Это уведомление!"
                                    />
                                )}
                            </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Upload;