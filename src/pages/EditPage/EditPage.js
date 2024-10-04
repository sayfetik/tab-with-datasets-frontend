import React, { useState, useEffect } from 'react';
import { Back, Header, UploadFile, InputTag, BackendConnector, AutoResizeTextarea, InputMetadata } from '../../components';
import { useNavigate, useLocation } from 'react-router-dom';
import './EditPage.css'
import loadingOnBlue from '../../img/loadingOnBlue.gif'

const EditPage = ({descriptionLimit, smallDescriptionLimit, titleLimit, authorsLimit, sourceLimit, frequencyLimit, doiLimit}) => {
    const { state: dataset } = useLocation();
    const navigate = useNavigate();
    const [warningUploadState, setWarningUploadState] = useState(false);
    const [warningUpload, setWarningUpload] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const [titleOfDataset, setTitleOfDataset] = useState(dataset.title);
    const [visibility, setVisibility] = useState(dataset.visibility);
    const [authors, setAuthors] = useState(dataset.authors);
    const [dataSource, setDataSource] = useState(dataset.data_source);
    const [expectedUpdateFrequency, setExpectedUpdateFrequency] = useState(dataset.expected_update_frequency);
    const [license, setLicense] = useState(dataset.license);
    const [doi, setDoi] = useState(dataset.doi);
    const [description, setDescription] = useState(dataset.description);
    const [smallDescription, setSmallDescription] = useState(dataset.small_description);

    const [geography_and_places, setLocalGeography] = useState(dataset.geography_and_places);
    const [language, setLocalLanguage] = useState(dataset.language);
    const [data_type, setLocalDataType] = useState(dataset.data_type);
    const [task, setLocalTask] = useState(dataset.task);
    const [technique, setLocalTechnique] = useState(dataset.technique);
    const [subject, setLocalSubject] = useState(dataset.subject);

    const [files, setFiles] = useState([]);
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imageSize, setImageSize] = useState(0);
    const [filesStructure, setFilesStructure] = useState(dataset.files_structure);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const imageData = await BackendConnector.getImage(dataset.id);
                setImage(imageData.imageUrl);
                setImageSize(imageData.imageSize);
                setImageFile(imageData.imageFile)
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage();
    }, []);
    

    useEffect(() => {
        const resetFilesStructure = {};
        Object.keys(dataset.files_structure).forEach(key => {
            resetFilesStructure[key] = false;
        });
        setFilesStructure(resetFilesStructure);
    }, [dataset.filesStructure]);

    const areRequiredInputsFilled = description && titleOfDataset;

    const update = () => {
        setWarningUploadState(false);
        if (files.length === 0) {
            setWarningUpload('Пожалуйста, загрузите файлы с данными датасета')
            setWarningUploadState(true);
            return;
        }
        if (!areRequiredInputsFilled) {
            setWarningUpload('Пожалуйста, заполните обязательные поля, чтобы продолжить')
            setWarningUploadState(true);
            return;
        }
        else {
            setIsUploading(true);
            const uploading_metadata = {
                title: titleOfDataset,
                small_description: smallDescription,
                visibility: visibility,
                authors: authors,
                data_source: dataSource,
                doi: doi,
                expected_update_frequency: expectedUpdateFrequency,
                license: license,
                description: description,
                tags: {
                    geography_and_places: geography_and_places,
                    language: language,
                    data_type: data_type,
                    task: task,
                    technique: technique,
                    subject: subject
                }
            };
            const files_updates = filesStructure;
            BackendConnector.update(dataset.id, uploading_metadata, files_updates, files, imageFile)
                .then(response => {
                    console.log(response);
                    navigate(`/uploadRequests`);
                    setIsUploading(false);
                })
                .catch(error => {
                    console.error(error);
                });
    };
}
    
    return (
        <div>
            <Header />
            <div className='upload'>
            <Back />
            <UploadFile pageLabel="Редактировать датасет" image={image} setImage={setImage} files={files} setFiles={setFiles} filesStructure={filesStructure} setFilesStructure={setFilesStructure} filesSizes={dataset.files_structure} initialImageSize = {imageSize} setInitialImageSize={setImageSize} initialImageFile = {imageFile} setInitialImageFile={setImageFile}/>
            <div className='metadataSection'>
            <InputMetadata
                titleOfDataset={titleOfDataset}
                setTitleOfDataset={setTitleOfDataset}
                visibility={visibility}
                setVisibility={setVisibility}
                authors={authors}
                setAuthors={setAuthors}
                dataSource={dataSource}
                setDataSource={setDataSource}
                expectedUpdateFrequency={expectedUpdateFrequency}
                setExpectedUpdateFrequency={setExpectedUpdateFrequency}
                license={license}
                setLicense={setLicense}
                doi={doi}
                setDoi={setDoi}
                titleLimit={titleLimit}
                authorsLimit={authorsLimit}
                sourceLimit={sourceLimit}
                frequencyLimit={frequencyLimit}
                doiLimit={doiLimit}
            />

                <div id='rightContainer'>
                    <div>
                        <div id='descriptionInputContainer'>
                            <div className='metadataBigItem'>
                                <div id='inputLabel'>Описание</div>
                                <AutoResizeTextarea value={description} setValue={setDescription} textLimit={descriptionLimit}/>
                            </div>
                        </div>
                        
                    </div>
                    <div id='smallDescriptionContainer'>
                            <div id='descriptionInputContainer'>
                                <div className='metadataBigItem'>
                                    <div id='inputLabel'>Краткое описание</div>
                                    <AutoResizeTextarea value={smallDescription} setValue={setSmallDescription} textLimit={smallDescriptionLimit}/>
                                </div>
                            </div>
                        </div>
                    <div>
                        <span id='inputLabel'>Теги</span>
                            <div id='tagType'>
                                <p id='tagTypeLabel'>География данных</p>
                                <InputTag label="География данных" tags={geography_and_places} setTags={setLocalGeography}/>
                            </div>
                            <div id='tagType'>
                                <p id='tagTypeLabel'>Язык</p>
                                <InputTag label="Язык" tags={language} setTags={setLocalLanguage}/>
                            </div>
                            <div id='tagType'>
                                <p id='tagTypeLabel'>Тип данных</p>
                                <InputTag label="Тип данных" tags={data_type} setTags={setLocalDataType}/>
                            </div>
                            <div id='tagType'>
                                <p id='tagTypeLabel'>Задача</p>
                                <InputTag label="Задача" tags={task} setTags={setLocalTask}/>
                            </div>
                            <div id='tagType'>
                                <p id='tagTypeLabel'>Техника</p>
                                <InputTag label="Техника" tags={technique} setTags={setLocalTechnique}/>
                            </div>
                            <div id='tagType'>
                                <p id='tagTypeLabel'>Предмет</p>
                                <InputTag label="Предмет" tags={subject} setTags={setLocalSubject}/>
                            </div>
                    </div>

                    <div id='saveButtons'>
                        {/*<button className='saveDraft' onClick={()=>{console.log(subject);}}>Сохранить черновик</button>*/}
                        <div className="wrapper row">
                            {isUploading ?
                            <button className="cta">
                                <span className='uploadDataset'>Обновляется</span>
                                <img src={loadingOnBlue} alt="Loading..." style={{ width: '30px', height: '30px', margin: '0px 0px 0px 15px' }} />
                            </button>
                                :
                            <button className="cta" onClick={update}>
                                <span className='uploadDataset'>Обновить датасет</span>
                                
                                <span id='arrowsAnimation'>
                                    <svg className='svgArrows' style={{marginTop: '5px'}} width="66px" height="43px" viewBox="0 0 66 43" version="1.1"xmlns="http://www.w3.org/2000/svg"xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <g id="arrow" stroke="none"strokeWidth="1" fill="none" fillRule="evenodd">
                                            <path className="one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                                            <path className="two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                                            <path className="three" d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="#FFFFFF"></path>
                                        </g>
                                    </svg>
                                </span>
                            </button>
                            }
                        </div>
                    </div>
                    {warningUploadState && <p style={{textAlign: 'right', marginTop: '10px'}} className='warning'>{warningUpload}</p>}
                </div>
            </div>
        </div>
        </div>
    );
};

export default EditPage;
