import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import downloadIconWhite from '../../img/downloadWhite.png';
import folderDarkIcon from '../../img/folderDark.png';
import downloadIconBlack from '../../img/downloadBlack.png';
import line from '../../img/lineDark.png'
import star from '../../img/star.png'
import './DatasetPage.css'
import { Back, Header, Icon, DatasetCard, BackendConnector, Download } from '../../components'

const DatasetPage = () => {
    const { id } = useParams();
    const [datasets, setDatasets] = useState([]);
    const [image, setImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchImage = async () => {
        try {
            const imageUrl = await BackendConnector.getImage(id);
            setImage(imageUrl);
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };

    const formatFileSize = (size) => {
        if (size === 0) return '0 Б';
        const sizes = ['Б', 'КБ', 'МБ', 'ГБ'];
        const i = Math.floor(Math.log(size) / Math.log(1024));
        const formattedSize = (size / Math.pow(1024, i)).toFixed(2);
        return `${formattedSize} ${sizes[i]}`;
    };

    useEffect(() => {
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
        files_structure: {}
    });
        
    const navigate = useNavigate();

    const handleEditClick = () => {
        console.log(dataset);
        navigate('/editDataset', { state: dataset });
      };

    const handleDeleteClick = (event) => {
        event.preventDefault();
        BackendConnector.delete(dataset.id)
            .then(response => {
                console.log(response);
                navigate(-1);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handleDownloadClick = async () => {
        try {
            const blob = await BackendConnector.download(dataset.id);
            if (blob) {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'file.zip'); // Specify the filename here
                document.body.appendChild(link);
                link.click();
                link.remove();
            }
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

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
            <div id='datasetPage'>
                <Back />
                <div id='datasetInfoHeader'>
                <img id='datasetCoverImage' src={image} alt='Dataset cover'></img>
                    <div id='mainInfo'>
                        <div className='rowSpaceBetween'>
                            <p className='author'>{dataset.owner}</p>
                            {dataset.visibility === "private" ?
                                <div id='visibilityLabel'>Private</div>
                                : <div id='visibilityLabel'>Public</div>
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
                                <button id='downloadButton'>
                                    <span id='downloadLabel' onClick={handleDownloadClick}>Скачать</span>
                                    <Icon image={downloadIconWhite} />
                                </button>
                                <Download
                                    isOpen={isModalOpen}
                                    onClose={() => setIsModalOpen(false)}
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
                                <button id='editDatasetButton' onClick={handleEditClick}>Редактировать</button>
                                <button id='deleteDatasetButton' onClick={handleDeleteClick}>Удалить</button>
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
                                            // Check if files_structure is an object and not null
                                            if (typeof dataset.files_structure === 'object' && dataset.files_structure !== null) {
                                                // Iterate through the entries of files_structure
                                                return Object.entries(dataset.files_structure).map(([folderName, files], index) => {
                                                    // Check if the current entry is an object (folder)
                                                    if (typeof files === 'object' && files !== null) {
                                                        return (
                                                            <div key={index}>
                                                                <div className='row'>
                                                                    <img id="folderIcon" src={folderDarkIcon} />
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
                                                        // If it's not an object, treat it as a flat structure
                                                        return (
                                                            <div key={index} className='file'>
                                                                {/*<Icon className="downloadIcon" image={downloadIconBlack} />*/}
                                                                <p className='fileDownload'>{folderName} - {files}</p>
                                                            </div>
                                                        );
                                                    }
                                                });
                                            } else {
                                                // Handle the case where files_structure is not a valid object
                                                return <p>No files available.</p>;
                                            }
                                        })()}
                                    </div>
                                </div> 
                            }
                        </div>
                    </div>
                    
                    <div id='metainfo'>
                        <h3 className='metaWhite' id='meta'>Метаданные</h3>
                        <div className='infoContainer'>
                            <h4 className='metaWhite'>Владельцы</h4>
                            <p className='metaWhite'>{dataset.owner}</p>
                        </div>
                        <div className='infoContainer'>
                            <h4 className='metaWhite'>Авторы</h4>
                            <p className='metaWhite'>{dataset.authors}</p>
                        </div>
                        <div className='infoContainer'>
                            <h4 className='metaWhite'>Источник</h4>
                            <p className='metaWhite'>{dataset.data_source}</p>
                        </div>
                        <div className='infoContainer'>
                            <h4 className='metaWhite'>Лицензия</h4>
                            <p className='metaWhite'>{dataset.license}</p>
                        </div>
                        <div className='infoContainer'>
                            <h4 className='metaWhite'>Ожидаемая частота обновления</h4>
                            <p className='metaWhite'>{dataset.expected_update_frequency}</p>
                        </div>
                        <div className='infoContainer'>
                            <h4 className='metaWhite'>Последнее изменение</h4>
                            <p className='metaWhite'>{dataset.last_change_date}</p>
                        </div>
                        <div className='infoContainer'>
                            <h4 className='metaWhite'>DOI</h4>
                            <p className='metaWhite'>{dataset.doi}</p>
                        </div>
                        <div className='infoContainer'>
                            <h4 className='metaWhite'>Количество скачиваний</h4>
                            <p className='metaWhite'>{dataset.downloads_number}</p>
                        </div>
                        <div className='infoContainer'>
                            <h4 className='metaWhite'>Подробность описания</h4>
                            <p className='metaWhite'>{dataset.usability_rating}%</p>
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
                                lastChangeDatetime={dataset.last_change_datetime}
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
        </div>
    );
}


export default DatasetPage;