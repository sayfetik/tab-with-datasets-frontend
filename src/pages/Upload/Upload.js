import React, { useState } from 'react';
import { Back, UploadFile, Header, BackendConnector, InputTagFilter, AutoResizeTextarea} from '../../components';
import './Upload.css';
import { useNavigate } from 'react-router-dom';
import sparklesIcon from '../../img/sparkles.png';
import loadingGif from '../../img/loading.gif';

const Upload = ({descriptionLimit, smallDescriptionLimit, titleLimit, authorsLimit, sourceLimit, frequencyLimit, descriptionFieldsLimit, doiLimit}) => {
    const navigate = useNavigate();

    const [isGenerateDesc, setIsGenerateDesc] = useState(false);
    const [smallDescriptionState, setStateSmallDescription] = useState(false);
    const [tagsState, setStateTags] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isLoadingSmallDesc, setIsLoadingSmallDesc] = useState(false);

    const [description, setDescription] = useState('');
    const [smallDescription, setSmallDescription] = useState('');
    const [geography_and_places, set_geography_and_places] = useState([]);
    const [language, set_language] = useState([]);
    const [data_type, set_data_type] = useState([]);
    const [task, set_task] = useState([]);
    const [technique, set_technique] = useState([]);
    const [subject, set_subject] = useState([]);
    const [filesStructure, setFilesStructure] = useState({});

    const [generatedDescriptionState, setGeneratedDescriptionState] = useState(false);
    const [generatedSmallDescriptionState, setGeneratedSmallDescriptionState] = useState(false);
    const [generatedTagsState, setGeneratedTagsState] = useState(false);

    const [generatedDescription, setGeneratedDescription] = useState('');
    const [generatedSmallDescription, setGeneratedSmallDescription] = useState('');
    const [Ggeography_and_places, set_Ggeography_and_places] = useState([]);
    const [Glanguage, set_Glanguage] = useState([]);
    const [Gdata_type, set_Gdata_type] = useState([]);
    const [Gtask, set_Gtask] = useState([]);
    const [Gtechnique, set_Gtechnique] = useState([]);
    const [Gsubject, set_Gsubject] = useState([]);

    const [titleOfDataset, setTitleOfDataset] = useState('');
    const [visibility, setVisibility] = useState('public');
    const [authors, setAuthors] = useState('');
    const [dataSource, setDataSource] = useState('');
    const [expectedUpdateFrequency, setExpectedUpdateFrequency] = useState('');
    const [license, setLicense] = useState('No license specified');
    const [doi, setDoi] = useState('');
    const [collectionMethod, setCollectionMethod] = useState('');
    const [dataStructure, setDataStructure] = useState('');
    const [useCases, setUseCases] = useState('');
    const [files, setFiles] = useState([]);
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imageSize, setImageSize] = useState(null);

    const areAllInputsFilledForDesc = collectionMethod && dataStructure && useCases;

    const areRequiredInputsFilled = ((isGenerateDesc && (titleOfDataset && generatedDescription && generatedSmallDescription && (Ggeography_and_places || Glanguage || Gdata_type || Gtask || Gtechnique || Gsubject)))
    || (!isGenerateDesc && ((titleOfDataset && description && smallDescription && (geography_and_places || language || data_type || task || technique || subject)))));

    const upload = () => {
        if (files.length === 0) {
            alert('Пожалуйста, загрузите файлы с данными датасета');
            return;
        }
        if (!areRequiredInputsFilled) {
            alert('Пожалуйста, заполните обязательные поля, чтобы продолжить');
            return;
        }
        navigate(`/uploadRequests`);

        setIsUploading(true);
        let payload;

        if (isGenerateDesc) {
            payload = {
                title: titleOfDataset,
                small_description: generatedSmallDescription,
                visibility,
                authors,
                data_source: dataSource,
                doi,
                expected_update_frequency: expectedUpdateFrequency,
                license,
                description: generatedDescription,
                tags: {
                    geography_and_places: Ggeography_and_places,
                    language: Glanguage,
                    data_type: Gdata_type,
                    task: Gtask,
                    technique: Gtechnique,
                    subject: Gsubject
                }
            }
        } else {
            payload = {
                title: titleOfDataset,
                visibility,
                authors,
                data_source: dataSource,
                doi,
                expected_update_frequency: expectedUpdateFrequency,
                license,
                description,
                small_description: smallDescription,
                tags: {
                    geography_and_places: geography_and_places,
                    language: language,
                    data_type: data_type,
                    task: task,
                    technique: technique,
                    subject: subject
                }
            }
        }; 
        BackendConnector.upload(payload, files, imageFile)
            .then(response => {
                console.log(response);
                setIsUploading(false)
            })
            .catch(error => {
                console.error(error);
        }); 
    }

    const generateDescription = async (e) => {
        if (!areAllInputsFilledForDesc) {
            alert('Заполните все обязательные поля с данными для генерации описания');
            return;
        }
        if (e) e.preventDefault();
        try {
            setIsLoading(true);
            const data = await BackendConnector.generateDescription(collectionMethod, dataStructure, useCases);
            if (data.text.text && data.text.text.length > 0) {
                setGeneratedDescription(data.text.text);
                setGeneratedDescriptionState(true);
            } else {
                alert('No data returned from the server');
            }
            setIsLoading(false);
        } catch (error) {
            alert("Error fetching datasets: " + error);
            setIsLoading(false);
        }
    };

    const generateSmallDescAndTags = async (e) => {
        generateSmallDescription();
        generateTags();
    }

    const generateSmallDescription = async (e) => {
        if (e) e.preventDefault();
        try {
            let data;
            setIsLoadingSmallDesc(true);
            if (isGenerateDesc) {
                data = await BackendConnector.generateSmallDescription(generatedDescription);
            } else {
                data = await BackendConnector.generateSmallDescription(description);
            }
            if (data.text && data.text.length > 0) {
                if (!isGenerateDesc) setSmallDescription(data.text);
                else setGeneratedSmallDescription(data.text)
            } else {
                alert('No data returned from the server');
            }
            setIsLoadingSmallDesc(false);
        } catch (error) {
            alert("Error fetching datasets: " + error);
            setIsLoadingSmallDesc(false);
        }
    };

    const generateTags = async (e) => {
        if (e) e.preventDefault();
        try {
            if (isGenerateDesc) {
                const data = await BackendConnector.generateTags(generatedDescription);
                set_Ggeography_and_places(data.geography_and_places);
                set_Glanguage(data.language);
                set_Gdata_type(data.data_type);
                set_Gtechnique(data.technique);
                set_Gtask(data.task);
                set_Gsubject(data.subject);
            } else {
                const data = await BackendConnector.generateTags(description);
                set_geography_and_places(data.geography_and_places);
                set_language(data.language);
                set_data_type(data.data_type);
                set_technique(data.technique);
                set_task(data.task);
                set_subject(data.subject);
            }
        } catch (error) {
            alert("Error fetching datasets: " + error);
        }
        if (isGenerateDesc) {
            setGeneratedTagsState(true);
            setGeneratedSmallDescriptionState(true);
        } else {
            setStateTags(true);
            setStateSmallDescription(true);
        }
    };

    return (
        <div>
            <Header />
            <div className='upload'>
            <Back />
            <UploadFile pageLabel="Загрузить датасет" image={image} setImage={setImage} files={files} setFiles={setFiles} filesStructure={filesStructure} setFilesStructure={setFilesStructure} filesSizes={{}} initialImageSize = {imageSize} setInitialImageSize={setImageSize} initialImageFile = {imageFile} setInitialImageFile={setImageFile}/>
            <div className='metadataSection'>
                <div>
                    <AutoResizeTextarea
                        label="Название *"
                        placeholder="Введите название"
                        value={titleOfDataset}
                        setValue={setTitleOfDataset}
                        textLimit={titleLimit}
                    />
                    <div className='metadataLabel'>Видимость *</div>
                    <select className="selectionInput" defaultValue={'public'} onChange={(e)=>setVisibility(e.target.value)}>
                        <option value="private">Приватный</option>
                        <option value="public">Публичный</option>
                    </select>
                    <AutoResizeTextarea
                        label="Авторы"
                        placeholder="Введите автора"
                        value={authors}
                        setValue={setAuthors}
                        textLimit={authorsLimit}
                    />
                    <AutoResizeTextarea
                        label="Источник"
                        placeholder="Введите источник"
                        value={dataSource}
                        setValue={setDataSource}
                        textLimit={sourceLimit}
                        />
                    <AutoResizeTextarea
                        label="Частота обновлений"
                        placeholder="Введите частоту обновлений"
                        value={expectedUpdateFrequency}
                        setValue={setExpectedUpdateFrequency}
                        textLimit={frequencyLimit}
                        />
                    <div className='metadataLabel' onChange={(e)=>setLicense(e.target.value)}>Лицензия</div>
                    <select defaultValue={"No license specified"} onChange={(e) => setLicense(e.target.value)} className="selectionInput">
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
                    <AutoResizeTextarea
                        label="DOI"
                        placeholder="Укажите doi"
                        value={doi}
                        setValue={setDoi}
                        textLimit={doiLimit}
                    />
                </div>

                <div id='rightContainer'>
                    <div className='inputLabel' style={{marginBottom: '8px'}}>Описание *</div>
                    <div className='row'>
                    <p style={{marginBottom: '15px'}}>Выберите:</p>
                        <button style={{marginLeft: '10px'}} id={isGenerateDesc ? 'descriptionChoice' : 'descriptionChosen'} onClick={()=>{setIsGenerateDesc(false)}}>
                            добавить своё описание</button>
                        <p style={{marginBottom: '15px'}}>или</p>
                        <button id={isGenerateDesc ? 'descriptionChosen' : 'descriptionChoice'} style={{marginLeft: '15px'}} onClick={()=>{setIsGenerateDesc(true)}}>
                            сгенерировать с помощью ИИ</button>
                    </div>

                    {!isGenerateDesc && <div>
                        <div>
                            <div id='descriptionInputContainer'>
                                <div className='metadataBigItem'>
                                    <AutoResizeTextarea placeholder="Введите описание датасета" value={description} setValue={setDescription} textLimit={descriptionLimit}/>
                                </div>
                            </div>
                            {description && 
                                <div id='rowContunuieLoading'>
                                    <button id='continuie' onClick={generateSmallDescAndTags}>
                                        <img src={sparklesIcon} width='15px' style={{marginRight: '10px'}} alt=''/>
                                        Сгенерировать краткое описание и теги</button>
                                    {isLoadingSmallDesc && <img src={loadingGif} alt="Loading..." style={{ width: '30px', height: '30px' }} />}
                                </div>
                            }
                        </div>

                        {smallDescriptionState && (
                            <div id='smallDescriptionContainer'>
                                <div id='descriptionInputContainer'>
                                    <div className='metadataBigItem'>
                                        <div className='inputLabel'>Краткое описание</div>
                                        <AutoResizeTextarea placeholder="Введите краткое описание датасета" value={smallDescription} setValue={setSmallDescription} textLimit={smallDescriptionLimit}/>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {tagsState && (
                            <div id='tagTypesContainer'>
                                <span className='inputLabel'>Теги</span>
                                <div id='tagType'>
                                    <p id='tagTypeLabel'>География данных</p>
                                    <InputTagFilter label="География данных" tags={geography_and_places} setTags={set_geography_and_places}/>
                                </div>
                                <div id='tagType'>
                                    <p id='tagTypeLabel'>Язык</p>
                                    <InputTagFilter label="Язык" tags={language} setTags={set_language}/>
                                </div>
                                <div id='tagType'>
                                    <p id='tagTypeLabel'>Тип данных</p>
                                    <InputTagFilter label="Тип данных" tags={data_type} setTags={set_data_type}/>
                                </div>
                                <div id='tagType'>
                                    <p id='tagTypeLabel'>Задача</p>
                                    <InputTagFilter label="Задача" tags={task} setTags={set_task}/>
                                </div>
                                <div id='tagType'>
                                    <p id='tagTypeLabel'>Техника</p>
                                    <InputTagFilter label="Техника" tags={technique} setTags={set_technique}/>
                                </div>
                                <div id='tagType'>
                                    <p id='tagTypeLabel'>Предмет</p>
                                    <InputTagFilter label="Предмет" tags={subject} setTags={set_subject}/>
                                </div>
                            </div>
                        )}
                    </div>}

                    {isGenerateDesc && <div>
                    <div>
                        <AutoResizeTextarea placeholder="Введите информацию о том, как были получены данные" value={collectionMethod} setValue={setCollectionMethod} textLimit={descriptionFieldsLimit} label=''/>
                        <AutoResizeTextarea placeholder="Опишите структуру данных" value={dataStructure} setValue={setDataStructure} textLimit={descriptionFieldsLimit} label=''/>
                        <AutoResizeTextarea placeholder="Опишите применение датасета" value={useCases} setValue={setUseCases} textLimit={descriptionFieldsLimit} label=''/>

                        <div id='rowContunuieLoading'>
                            <button id='continuie' onClick={generateDescription}>
                                <img src={sparklesIcon} width='15px' style={{marginRight: '10px'}} alt=''/>
                                Сгенерировать описание
                            </button>
                            {isLoading && <img src={loadingGif} alt="Loading..." style={{ width: '30px', height: '30px' }} />}
                        </div>
                    </div>

                    {generatedDescriptionState && (<div>
                        <div id='descriptionInputContainer'>
                            <div className='metadataBigItem'>
                                <AutoResizeTextarea placeholder="Введите описание датасета" value={generatedDescription} setValue={setGeneratedDescription} textLimit={descriptionLimit}/>
                            </div>
                        </div>
                        {generatedDescription && <div id='rowContunuieLoading'>
                            <button id='continuie' onClick={generateSmallDescAndTags}>
                                <img src={sparklesIcon} width='15px' style={{marginRight: '10px'}} alt=''/>
                                Сгенерировать краткое описание и теги
                            </button>
                            {isLoadingSmallDesc && <img src={loadingGif} alt="Loading..." style={{ width: '30px', height: '30px' }} />}
                        </div>}
                    </div>)}

                    {generatedSmallDescriptionState && (
                        <div id='smallDescriptionContainer'>
                            <div id='descriptionInputContainer'>
                                <div className='metadataBigItem'>
                                    <div className='inputLabel'>Краткое описание *</div>
                                    <AutoResizeTextarea placeholder="Введите краткое описание датасета" value={generatedSmallDescription} setValue={setGeneratedSmallDescription} textLimit={smallDescriptionLimit}/>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {generatedTagsState && (
                        <div id='tagTypesContainer'>
                            <span className='inputLabel'>Теги *</span>
                            <div id='tagType'>
                                <p id='tagTypeLabel'>География данных</p>
                                <InputTagFilter label="География данных" tags={Ggeography_and_places} setTags={set_Ggeography_and_places}/>
                            </div>
                            <div id='tagType'>
                                <p id='tagTypeLabel'>Язык</p>
                                <InputTagFilter label="Язык" tags={Glanguage} setTags={set_Glanguage}/>
                            </div>
                            <div id='tagType'>
                                <p id='tagTypeLabel'>Тип данных</p>
                                <InputTagFilter label="Тип данных" tags={Gdata_type} setTags={set_Gdata_type}/>
                            </div>
                            <div id='tagType'>
                                <p id='tagTypeLabel'>Задача</p>
                                <InputTagFilter label="Задача" tags={Gtask} setTags={set_Gtask}/>
                            </div>
                            <div id='tagType'>
                                <p id='tagTypeLabel'>Техника</p>
                                <InputTagFilter label="Техника" tags={Gtechnique} setTags={set_Gtechnique}/>
                            </div>
                            <div id='tagType'>
                                <p id='tagTypeLabel'>Предмет</p>
                                <InputTagFilter label="Предмет" tags={Gsubject} setTags={set_Gsubject}/>
                            </div>
                        </div>
                    )}
                </div>
                }

                    <div id='saveButtons'>
                        {/*<button className='saveDraft' onClick={()=>{console.log(subject);}}>Сохранить черновик</button>*/}
                        {areRequiredInputsFilled &&  (
                            <div className="wrapper row">
                                
                                {isUploading && <img src={loadingGif} alt="Loading..." style={{ marginRight: '20px', width: '30px', height: '30px' }} />}
                                <button className="cta" onClick={upload}>
                                    <span className='uploadDataset'>Загрузить датасет</span>
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
                            </div>
                        )}
                    </div>
                </div>

                
            </div>
        </div>
    </div>
    );
};

export default Upload;