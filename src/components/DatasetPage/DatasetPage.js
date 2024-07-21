import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Back from '../Back/Back'
import './DatasetPage.css'
import datasetImage from '../../img/datasetImage.png'
import Header from '../Header/Header'
import Icon from '../Icon'
import downloadIconWhite from '../../img/downloadWhite.png'
import downloadIconBlack from '../../img/downloadBlack.png'
import star from '../../img/star.png'
import DatasetCard from '../DatasetCard/DatasetCard';
import BackendConnector from '../BackendConnector';

const DatasetPage = () => {
    const { id } = useParams();
    const [datasets, setDatasets] = useState([]);
    const resultsLimit = 4;

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const data = await BackendConnector.recommend(id);
                if (data && data.length > 0) {
                    setDatasets(data);
                } else {
                    console.log('No data returned from the server');
                }
            } catch (error) {
                console.error("Error fetching datasets: ", error);
            }
        };

        fetchRecommendations();
    }, [id, resultsLimit]);

    const [dataset, setDataset] = React.useState({
        id: '',
        title: '',
        description: '',
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
        downloads_number: 0,
        visibility: '',
        usability_rating: 0,
        size: '',
        size_bytes: 0,
        rating: 0
    });

    useEffect(() => {
        const url = `http://10.100.30.74/api/preview/${id}`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            setDataset({
              id: data.id || '',
              title: data.title || '',
              description: data.description || '',
              geography_and_places: data.tags.geography_and_places || [],
              language: data.tags.language || [],
              data_type: data.tags.data_type || [],
              task: data.tags.task || [],
              technique: data.tags.technique || [],
              subject: data.tags.subject || [],
              owner: data.owner || '',
              authors: data.authors || '',
              data_source: data.data_source || '',
              license: data.license || '',
              number_of_files: data.number_of_files || 0,
              doi: data.doi || '',
              expected_update_frequency: data.expected_update_frequency || 'Никогда',
              last_change_date: data.last_change_date || '',
              downloads_number: data.downloads_number || 0,
              visibility: data.visibility || '',
              usability_rating: data.usability_rating || 0,
              size: data.size || '',
              size_bytes: data.size_bytes || '',
              files: data.files || [],
              rating: data.rating || 0
            });
          })
          .catch(error => {
            console.error("Error fetching data: ", error);
          });
      }, [id]);
        
    const navigate = useNavigate();
    const handleEditClick = () => {
        navigate('/editDataset', { state: dataset });
      };

    return (
        <div>
            <Header />
            <div id='datasetPage'>
                <Back />
                <div id='datasetInfoHeader'>
                    <img id='datasetCoverImage' src={datasetImage} alt='Dataset cover'></img>
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
                            {dataset.geography_and_places.length !==0 && dataset.geography_and_places.map((tag, index) => ( 
                                <span key={index} className='datasetTag'>{tag}</span>
                            ))}
                            {dataset.language.length !==0 && dataset.language.map((tag, index) => ( 
                                <span key={index} className='datasetTag'>{tag}</span>
                            ))}
                            {dataset.data_type.length !==0 && dataset.data_type.map((tag, index) => ( 
                                <span key={index} className='datasetTag'>{tag}</span>
                            ))}
                            {dataset.task.length !==0 && dataset.task.map((tag, index) => ( 
                                <span key={index} className='datasetTag'>{tag}</span>
                            ))}
                            {dataset.technique.length !==0 && dataset.technique.map((tag, index) => ( 
                                <span key={index} className='datasetTag'>{tag}</span>
                            ))}
                            {dataset.subject.length !==0 && dataset.subject.map((tag, index) => ( 
                                <span key={index} className='datasetTag'>{tag}</span>
                            ))}
                        </div>
                        <div>
                            <div id='downloadRationgSection'>
                                <button id='downloadButton'>
                                    <span id='downloadLabel'>Скачать</span>
                                    <Icon image={downloadIconWhite} />
                                </button>
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
                                <button id='deleteDatasetButton'>Удалить</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
                    
                <div id='datasetInfo'>
                    <div id='section'>
                        <h1 id='descriptionLabel'>Описание</h1>
                        <p id='description'>{dataset.description}</p>
                        <div id='filesSection'>
                            {dataset.number_of_files === 0 ?

                                <div id='filesHeader'>
                                    <p className='author'>Данные ({dataset.number_of_files} файлов)</p>
                                    {/*<p className='author' id='versionLabel'>{dataset.version}</p>*/}
                                </div>

                                :

                                <div>
                                    <div id='filesHeaderWithBottomDivider'>
                                        <p className='author'>Данные ({dataset.number_of_files} файлов)</p>
                                        {/*<p className='author' id='versionLabel'>{dataset.version}</p>*/}
                                    </div>
                                    <div className='files'>
                                        {dataset.files && dataset.files.map((file, index) => ( 
                                            <div key={index} className='file'>
                                                <Icon className="downloadIcon" image={downloadIconBlack} />
                                                <p className='fileDownload'>{file}</p>
                                            </div>
                                        ))}
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
                            <h4 className='metaWhite'>Оценка удобства использования</h4>
                            <p className='metaWhite'>{dataset.usability_rating}</p>
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