import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import downloadIconWhite from '../../img/downloadWhite.png'
import downloadIconBlack from '../../img/downloadBlack.png'
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
        rating: 0
    });
        
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate('/editDataset', { state: dataset});
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
                                tag !== "" && <span key={index} className='datasetTag'>{tag}</span>
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
                                        
                                            <div className='file'>
                                                <Icon className="downloadIcon" image={downloadIconBlack} />
                                                <p className='fileDownload'>files.zip</p>
                                            </div>
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