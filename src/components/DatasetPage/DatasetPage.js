import React from 'react'
import { useParams } from 'react-router-dom';
import Back from '../Back/Back'
import './DatasetPage.css'
import CardsRowSection from '../CardsRowSection/CardsRowSection'
import datasetImage from '../../img/datasetImage.png'
import Header from '../Header/Header'
import Icon from '../Icon'
import downloadIconWhite from '../../img/downloadWhite.png'
import downloadIconBlack from '../../img/downloadBlack.png'
import star from '../../img/star.png'

const DatasetPage = () => {
    const { id } = useParams();
    const [dataset, setDataset] = React.useState({
        id: '',
        title: '',
        description: '',
        tags: [],
        owner: '',
        authors: '',
        data_source: '',
        license: '',
        number_of_files: 0,
        doi: '',
        expected_update_frequency: '',
        last_change_datetime: '',
        downloads_number: 0,
        visibility: '',
        usability_rating: 0,
        size: ''
    });

    React.useEffect(() => {
        const url = `http://localhost:8080/api/preview/${id}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setDataset({
                    id: data.id || '',
                    title: data.title || '',
                    description: data.description || '',
                    tags: data.tags ? data.tags.split(',') : [],
                    owner: data.owner || '',
                    authors: data.authors || '',
                    data_source: data.data_source || '',
                    license: data.license || '',
                    number_of_files: data.number_of_files || 0,
                    doi: data.doi || '',
                    expected_update_frequency: data.expected_update_frequency || '',
                    last_change_datetime: data.last_change_datetime || '',
                    downloads_number: data.downloads_number || 0,
                    visibility: data.visibility || '',
                    usability_rating: data.usability_rating || 0,
                    size: data.size || '',
                    files: data.files || []
                });
            })
            .catch(error => console.error("Error fetching data: ", error));
        }, [id]);

    return (
        <div>
            <Header />
            <div id='datasetPage'>
                <Back />
                <div id='datasetInfoHeader'>
                    <img id='datasetCoverImage' src={datasetImage} alt='Dataset cover'></img>
                    <div id='mainInfo'>
                        <p className='author'>{dataset.authors}</p>
                        <h1 id='datasetTitle'>{dataset.title}</h1>
                        <div id='tags'>
                            {dataset.tags.map((tag, index) => ( 
                                <span key={index} className='datasetTag'>{tag}</span>
                            ))}
                        </div>
                        <div id='downloadRationgSection'>
                            <button id='downloadButton'>
                                <span id='downloadLabel'>Скачать</span>
                                <Icon image={downloadIconWhite} />
                            </button>
                            <div>
                                <div id='ratingLabel'>
                                    <img src={star} width='17px' height='17px' alt=''/>
                                    <p id='rating'>4.2</p>
                                </div>
                                <div id='numOfDownloads'>1858 скачиваний</div>
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
                                    <p className='author' id='versionLabel'>{dataset.doi}</p>
                                </div> :
                                <div>
                                    <div id='filesHeaderWithBottomDivider'>
                                        <p className='author'>Данные ({dataset.number_of_files} файлов)</p>
                                        <p className='author' id='versionLabel'>{dataset.doi}</p>
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
                            <p className='metaWhite'>{dataset.source}</p>
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
                            <p className='metaWhite'>{dataset.last_change_datetime}</p>
                        </div>
                        <div className='infoContainer'>
                            <h4 className='metaWhite'>Количество скачиваний</h4>
                            <p className='metaWhite'>{dataset.amount}</p>
                        </div>
                        <div className='infoContainer'>
                            <h4 className='metaWhite'>Видимость</h4>
                            <p className='metaWhite'>{dataset.visibility}</p>
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
                {/*<CardsRowSection topicName="Похожие датасеты"/>*/}
            </div>
        </div>
    );
}


export default DatasetPage;