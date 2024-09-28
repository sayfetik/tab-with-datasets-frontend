import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import downloadIconWhite from '../../img/downloadWhite.png';
import folderDarkIcon from '../../img/folderDark.png';
import star from '../../img/star.png'
import './DatasetPage.css'
import copyBlue from '../../img/copyBlue.png'
import { Back, Header, DownloadCopyCode, DatasetCard, BackendConnector, Download, DeleteVerification } from '../../components'

const DatasetPage = () => {
    const { id } = useParams();
    const [datasets, setDatasets] = useState([]);
    const [image, setImage] = useState(null);
    const [isDownloadOpen, setIsDownloadOpen] = useState(false);
    const [isCopyCodeOpen, setIsCopyCodeOpen] = useState(false);
    const [isDeleteVerification, setisDeleteVerification] = useState(false);

    const formatFileSize = (size) => {
        if (size === 0) return '0 Б';
        const sizes = ['Б', 'КБ', 'МБ', 'ГБ'];
        const i = Math.floor(Math.log(size) / Math.log(1024));
        const formattedSize = (size / Math.pow(1024, i)).toFixed(2);
        return `${formattedSize} ${sizes[i]}`;
    };

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const imageData = await BackendConnector.getImage(id);
                setImage(imageData.imageUrl);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };
        if (image === null) fetchImage();

        const fetchRecommendations = async () => {
            try {
                const data = await BackendConnector.recommend(id);
                if (data && data.length > 0) setDatasets(data);
                else console.log('No data returned from the server');
            } catch (error) {
                console.error("Error fetching datasets: ", error);
            }
        };

        const fetchDatasetPreview = async () => {
            try {
                const data = await BackendConnector.preview(id);
                setDataset(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchRecommendations();
        fetchDatasetPreview();
    }, [id]);

    const [dataset, setDataset] = React.useState({
        id: '',
        title: '',
        description: '',
        small_description: '',
        tags: [],
        geography_and_places: [],
        language: [],
        data_type: [],
        task: [],
        technique: [],
        subject: [],
        owner: '',
        authors: '',
        data_source: '',
        license: '',
        number_of_files: 0,
        doi: '',
        expected_update_frequency: '',
        last_change_date: '',
        last_change_time: '',
        downloads_number: 0,
        visibility: '',
        usability_rating: 0,
        size: '',
        size_bytes: 0,
        rating: 0,
        files_structure: {},
    });
        
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate('/editDataset', { state: dataset });
      };

    const handleDeleteClick = () => {
        setisDeleteVerification(true);
    }

    const getFileWord = (number) => {
        if (11 <= number % 100 && number % 100 <= 14) {
            return `${number} файлов`;
        } else { 
            const lastDigit = number % 10;
            if (lastDigit === 1) {
                return `${number} файл`;
            } else if (2 <= lastDigit && lastDigit <= 4) {
                return `${number} файла`;
            } else {
                return `${number} файлов`;
            }
        }
    };

    function getFileCountString(folderCount, fileCount) {
        const getFolderWord = (count) => {
          if (count % 10 === 1 && count % 100 !== 11) {
            return 'папка';
          } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
            return 'папки';
          } else {
            return 'папок';
          }
        };
      
        const getFileWord = (count) => {
          if (count % 10 === 1 && count % 100 !== 11) {
            return 'файл';
          } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
            return 'файла';
          } else {
            return 'файлов';
          }
        };
      
        if (folderCount === 0) return `${fileCount} ${getFileWord(fileCount)}`;
        return `${folderCount} ${getFolderWord(folderCount)}, ${fileCount} ${getFileWord(fileCount)}`;
      }

    return (
        <div>
            <Header />
            {dataset ?
                <div id='datasetPage'>
                    <Back />
                    <div id='datasetInfoHeader'>
                    <img id='datasetCoverImage' src={image} alt='Dataset cover'></img>
                        <div id='mainInfo'>
                            <div className='rowSpaceBetween'>
                                <p className='author'>{dataset.owner}</p>
                                {dataset.visibility === "private" ?
                                    <div id='visibilityLabel'>Приватный</div>
                                    : <div id='visibilityLabel'>Публичный</div>
                                }
                            </div>
                            <h1 id='datasetTitle'>{dataset.title}</h1>
                            <div id='tags'>
                                {dataset.geography_and_places.length >0 && dataset.geography_and_places.map((tag, index) => ( 
                                    tag !== "" && <span key={index} className='datasetTag capitalize'>{tag}</span>
                                ))}
                                {dataset.language.length > 0 && dataset.language.map((tag, index) => ( 
                                    tag !== "" && <span key={index} className='datasetTag'>{tag}</span>
                                ))}
                                {dataset.data_type.length > 0 && dataset.data_type.map((tag, index) => ( 
                                    tag !== "" && <span key={index} className='datasetTag'>{tag}</span>
                                ))}
                                {dataset.task.length > 0 && dataset.task.map((tag, index) => ( 
                                    tag !== "" && <span key={index} className='datasetTag'>{tag}</span>
                                ))}
                                {dataset.technique.length > 0 && dataset.technique.map((tag, index) => ( 
                                    tag !== "" && <span key={index} className='datasetTag'>{tag}</span>
                                ))}
                                {dataset.subject.length > 0 && dataset.subject.map((tag, index) => ( 
                                    tag !== "" && <span key={index} className='datasetTag'>{tag}</span>
                                ))}
                            </div>
                            <div>
                                <div id='downloadRationgSection'>
                                    <button className='blueButton' id='downloadButton' onClick={() => setIsDownloadOpen(true)}>
                                        <span id='downloadLabel'>Скачать</span>
                                        <img src={downloadIconWhite} id='downloadIcon' alt=''/>
                                    </button>
                                    <button className='lightBlueButton' id='copyCodeButton' onClick={() => setIsCopyCodeOpen(true)}>
                                    <span id='copyCodeLabel'>Скопировать код для скачивания</span>
                                        <img src={copyBlue} id='copyCodeIcon' alt=''/>
                                    </button>
                                    <Download
                                        isOpen={isDownloadOpen}
                                        onClose={() => setIsDownloadOpen(false)}
                                        id={dataset.id}
                                    />
                                    <DownloadCopyCode
                                        isOpen={isCopyCodeOpen}
                                        onClose={() => setIsCopyCodeOpen(false)}
                                        id={dataset.id}
                                    />
                                    <div>
                                        <div id='ratingLabel'>
                                            <img src={star} width='17px' height='17px' alt=''/>
                                            <p id='rating'>{dataset.rating}</p>
                                        </div>
                                        <div id='numOfDownloads'>{dataset.downloads_number} скачиваний</div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <button className='whiteBlueButton' style={{margin: '0', padding: '8px 16px'}} onClick={handleEditClick}>Редактировать</button>
                                    <button className='whiteRedButton' onClick={handleDeleteClick} style={{padding: '8px 16px'}}>Удалить</button>
                                    <DeleteVerification onClose={()=>{setisDeleteVerification(false)}} isOpen={isDeleteVerification} dataset={dataset.id} back={true}/>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                        
                    <div id='datasetInfo'>
                        <div id='section'>
                            <h2 id='descriptionLabel'>Описание</h2>
                            <p id='description'>{dataset.description}</p>
                            <div id='filesSection'>
                                {dataset.number_of_files === 0 ?

                                    <div id='filesHeader'>
                                        <p className='author'>Данные ({getFileWord(dataset.number_of_files)})</p>
                                    </div>

                                    :

                                    <div>
                                        <div id='filesHeaderWithBottomDivider'>
                                            {/* Calculate the number of folders and total files */}
                                            {(() => {
                                                const folderCount = Object.keys(dataset.files_structure).filter(key => 
                                                    typeof dataset.files_structure[key] === 'object' && dataset.files_structure[key] !== null
                                                ).length; // Count the number of folders
                                                
                                                let totalFileCount = 0;

                                                // Calculate the total number of files in all folders and flat structures
                                                Object.entries(dataset.files_structure).forEach(([key, value]) => {
                                                    if (typeof value === 'object' && value !== null) {
                                                        totalFileCount += Object.keys(value).length; // Count files in each folder
                                                    } else {
                                                        totalFileCount += 1; // Count the flat structure as a single file
                                                    }
                                                });

                                                return (
                                                    <p className='author'>Данные ({getFileCountString(folderCount, totalFileCount)})</p>
                                                );
                                            })()}
                                            {/* <p className='author' id='versionLabel'>{dataset.version}</p> */}
                                        </div>
                                        <div className='files'>
                                            {(() => {
                                                if (typeof dataset.files_structure === 'object' && dataset.files_structure !== null) {
                                                    return Object.entries(dataset.files_structure).map(([folderName, files], index) => {
                                                        if (typeof files === 'object' && files !== null) {
                                                            return (
                                                                <div key={index}>
                                                                    <div className='row'>
                                                                        <img id="folderIcon" src={folderDarkIcon}  alt="Folder"/>
                                                                        <p id='folderName'>{folderName}</p>
                                                                    </div>
                                                                    {Object.entries(files).map(([fileName, fileSize], subIndex) => (
                                                                        <div key={subIndex} className='file' id='fileInFolder'>
                                                                            {/*<Icon className="downloadIcon" image={downloadIconBlack} />*/}
                                                                            <p className='fileDownload'>{fileName} - {formatFileSize(fileSize)}</p>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            );
                                                        } else {
                                                            return (
                                                                <div key={index} className='file'>
                                                                    <p className='fileDownload'>{folderName} - {formatFileSize(files)}</p>
                                                                </div>
                                                            );
                                                        }
                                                    });
                                                } else {
                                                    // Handle the case where files_structure is not a valid object
                                                    return <p>No files</p>;
                                                }
                                            })()}
                                        </div>
                                    </div> 
                                }
                            </div>
                        </div>
                        
                        <div id='metainfo'>
                            <h3 className='metaWhite' id='meta'>Метаданные</h3>
                            {dataset.owner && <div className='infoContainer'>
                                <h4 className='metaWhite'>Владельцы</h4>
                                <p className='metaWhite'>{dataset.owner}</p>
                            </div>}
                            {dataset.authors && <div className='infoContainer'>
                                <h4 className='metaWhite'>Авторы</h4>
                                <p className='metaWhite'>{dataset.authors}</p>
                            </div>}
                            {dataset.data_source && <div className='infoContainer'>
                                <h4 className='metaWhite'>Источник</h4>
                                <p className='metaWhite'>{dataset.data_source}</p>
                            </div>}
                            {dataset.license && <div className='infoContainer'>
                                <h4 className='metaWhite'>Лицензия</h4>
                                <p className='metaWhite'>{dataset.license}</p>
                            </div>}
                            {dataset.expected_update_frequency && <div className='infoContainer'>
                                <h4 className='metaWhite'>Ожидаемая частота обновления</h4>
                                <p className='metaWhite'>{dataset.expected_update_frequency}</p>
                            </div>}
                            {dataset.last_change_date && <div className='infoContainer'>
                                <h4 className='metaWhite'>Последнее изменение</h4>
                                <p className='metaWhite'>{dataset.last_change_date}</p>
                            </div>}
                            {dataset.doi && <div className='infoContainer'>
                                <h4 className='metaWhite'>DOI</h4>
                                <p className='metaWhite'>{dataset.doi}</p>
                            </div>}
                            <div className='infoContainer'>
                                <h4 className='metaWhite'>Количество скачиваний</h4>
                                <p className='metaWhite'>{dataset.downloads_number}</p>
                            </div>
                            <div className='infoContainer'>
                                <h4 className='metaWhite'>Размер</h4>
                                <p className='metaWhite'>{dataset.size}</p>
                            </div>
                        </div>
                    </div>
                    <div id='cardsRowSection'>
                    <div className='topicCardsInRow'>
                        <h2>Похожее</h2>
                        {/*<div id='seeAllIcon'>
                            <p id='seeAll'>Смотреть все</p>
                            <img src={arrowsIcon} width={"19px"} alt=''/>
                            </div>*/}
                    </div>

                    <div id='cards'>
                        {datasets.length > 0 ? (
                            datasets.map(dataset => (
                                <DatasetCard
                                    key={dataset.id}
                                    id={dataset.id}
                                    title={dataset.title}
                                    authors={dataset.authors}
                                    numberOfFiles={dataset.number_of_files}
                                    lastChangeDatetime={dataset.last_change_date}
                                    downloadsNumber={dataset.downloads_number}
                                    size={dataset.size}
                                    smallDescription={dataset.small_description}
                                />
                            ))
                        ) : (
                            <p>Error ocurred</p>
                        )}       
                    </div>    
                </div>
                </div>
                :
                <h3 style={{margin: '50px 0px 0px 80px'}}>Не удалось получить информацию о датасете. Повторите попытку позже</h3>
            }
        </div>
    );
}


export default DatasetPage;