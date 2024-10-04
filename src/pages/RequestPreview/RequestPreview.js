import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import folderDarkIcon from '../../img/folderDark.png';
import { Back, Header, BackendConnector } from '../../components'

const RequestPreview = () => {
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
        visibility: '',
        usability_rating: 0,
        size: '',
        size_bytes: 0,
        files_structure: {}
    });
    const { state: request_id } = useLocation();

    const formatFileSize = (size) => {
        if (size === 0) return '0 Б';
        const sizes = ['Б', 'КБ', 'МБ', 'ГБ'];
        const i = Math.floor(Math.log(size) / Math.log(1024));
        const formattedSize = (size / Math.pow(1024, i)).toFixed(2);
        return `${formattedSize} ${sizes[i]}`;
    };

    useEffect(() => {
        const fetchDatasetPreview = async () => {
            try {
                const data = await BackendConnector.previewUploadRequest(request_id);
                setDataset(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchDatasetPreview();
    }, []);

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
                        <div id='mainInfo'>
                            <div className='rowSpaceBetween'>
                                <p className='author'>{dataset.title}</p>
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
                            <div id='downloadRationgSection'>
                                <button id='deleteDatasetButton'>Удалить</button>
                            </div>
                        </div>
                    </div>
                        
                    <div id='datasetInfo'>
                        <div id='section'>
                            <h2 id='descriptionLabel'>Описание</h2>
                            <p id='description'>{dataset.description}</p>
                            <h2 id='descriptionLabel'>Краткое описание</h2>
                            <p id='description'>{dataset.small_description}</p>
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
                                                                    <div className='row folderMargin'>
                                                                        <img id="folderIcon" src={folderDarkIcon} />
                                                                        <p id='folderName'>{folderName}</p>
                                                                    </div>
                                                                    {Object.entries(files).map(([fileName, fileSize], subIndex) => (
                                                                        <div key={subIndex} className='file' id='fileInFolder'>
                                                                            {/*<Icon className="downloadIcon" image={downloadIconBlack} />*/}
                                                                            <p className='fileDownload'>{fileName} {fileSize} && (- {formatFileSize(fileSize)})</p>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            );
                                                        } else {
                                                            // If it's not an object, treat it as a flat structure
                                                            return (
                                                                <div key={index} className='file'>
                                                                    {/*<Icon className="downloadIcon" image={downloadIconBlack} />*/}
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
                                <h4 className='metaWhite'>Размер</h4>
                                <p className='metaWhite'>{dataset.size}</p>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <h3 style={{margin: '50px 0px 0px 80px'}}>Не удалось получить информацию о датасете. Повторите попытку позже</h3>}
        </div>
    );
}


export default RequestPreview;