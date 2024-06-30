import React from 'react'
import Back from '../Back/Back'
import './DatasetPage.css'
import CardsRowSection from '../CardsRowSection/CardsRowSection'
import datasetImage from '../../img/datasetImage.png'
import Header from '../Header/Header'
import Icon from '../Icon'
import downloadIconWhite from '../../img/downloadWhite.png'
import downloadIconBlack from '../../img/downloadBlack.png'

class DatasetPage extends React.Component {
    render() {
        return (
            <div>
            <Header />
            <div id='datasetPage'>
                <Back />
                <div id='datasetInfoHeader'>
                    <img id='datasetCoverImage' src={datasetImage}></img>
                    <div id='mainInfo'>
                        <p className='author'>Вставить имя автора</p>
                        <h1>Вставить название датасета</h1>
                        <div id='tags'>
                            <span className='datasetTag'>Вставить тег </span>
                            <span className='datasetTag'>Вставить тег2</span>
                        </div>
                        <button id='downloadButton'>
                            <Icon image={downloadIconWhite} />
                            <span id='downloadLabel'>Скачать</span>
                        </button>
                    </div>
                </div>
                    
                <div id='datasetInfo'>
                    <div id='section'>
                        <h2 id='descriptionLabel'>Описание</h2>
                        <p id='description'>ВСТАВИТЬ ОПИСАНИЕ ДАТАСЕТА. Изучите обширный набор данных, охватывающий различные аспекты истории населения Индии и демографические тенденции.</p>

                        <div id='filesSection'>
                            <div id='filesHeader'>
                                <p className='author'>Данные</p>
                                <p className='author' id='versionLabel'> Вставить версию</p>
                            </div>
                            <div className='files'>
                                <div className='file'>
                                    <Icon className="downloadIcon" image={downloadIconBlack} />
                                    <p className='fileDownload'>Вставить файл</p>
                                </div>
                                <div className='file'>
                                    <Icon className="downloadIcon" image={downloadIconBlack} />
                                    <p className='fileDownload'>Вставить файл</p>
                                </div>
                                <div className='file'>
                                    <Icon className="downloadIcon" image={downloadIconBlack} />
                                    <p className='fileDownload'>Вставить файл</p>
                                </div>
                                <div className='file'>
                                    <Icon className="downloadIcon" image={downloadIconBlack} />
                                    <p className='fileDownload'>Вставить файл</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div id='metainfo'>
                        <h3 className='metaWhite' id='meta'>Метаданные</h3>
                        <div className='infoContainer'>
                            <h4 className='metaWhite'>Авторы</h4>
                            <p className='metaWhite'>Вставить автора</p>
                        </div>
                        <div className='infoContainer'>
                            <h4 className='metaWhite'>Источник</h4>
                            <p className='metaWhite'>Вставить источник</p>
                        </div>
                        <div className='infoContainer'>
                            <h4 className='metaWhite'>Лицензия</h4>
                            <p className='metaWhite'>Вставить лицензию</p>
                        </div>
                        <div className='infoContainer'>
                            <h4 className='metaWhite'>Ожидаемая частота обновления</h4>
                            <p className='metaWhite'>Вставить частоту обновления</p>
                        </div>
                        <div className='infoContainer'>
                            <h4 className='metaWhite'>Количество скачиваний</h4>
                            <p className='metaWhite'>Вставить количество скачиваний</p>
                        </div>
                    </div>
                </div>
                <CardsRowSection topicName="Похожие датасеты"/>
            </div>

            </div>
        ) 
    }
}

export default DatasetPage