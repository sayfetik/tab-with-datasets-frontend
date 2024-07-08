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
    state = {
        author: '',
        title: '',
        tags: [],
        description: '',
        version: '',
        files: [],
        source: '',
        license: '',
        frequency: '',
        amount: ''
    };

    componentDidMount() {
        fetch('URL')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({
                    author: data.author,
                    title: data.title,
                    description: data.description,
                    version: data.version,
                    files: data.files,
                    source: data.source,
                    license: data.license,
                    frequency: data.frequency,
                    amount: data.amount
                });
            })
            .catch(error => console.error("Error fetching data: ", error));
    }

    render() {
        return (
            <div>
            <Header />
            <div id='datasetPage'>
                <Back />
                <div id='datasetInfoHeader'>
                    <img id='datasetCoverImage' src={datasetImage} alt='Dataset cover'></img>
                    <div id='mainInfo'>
                        <p className='author'>{this.state.author}</p>
                        <h1>{this.state.title}</h1>
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
                        <h1 id='descriptionLabel'>Описание</h1>
                        <p id='description'>{this.state.description}</p>
                        <div id='filesSection'>
                            <div id='filesHeader'>
                                <p className='author'>Данные</p>
                                <p className='author' id='versionLabel'>{this.state.version}</p>
                            </div>
                            <div className='files'>
                                {this.state.files.map((file, index) => ( 
                                    <div className='file'>
                                    <Icon className="downloadIcon" image={downloadIconBlack} />
                                    <p className='fileDownload'>{file}</p>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div id='metainfo'>
                        <h3 className='metaWhite' id='meta'>Метаданные</h3>
                        <div className='infoContainer'>
                            <h4 className='metaWhite'>Авторы</h4>
                            <p className='metaWhite'>{this.state.author}</p>
                        </div>
                        <div className='infoContainer'>
                            <h4 className='metaWhite'>Источник</h4>
                            <p className='metaWhite'>{this.state.source}</p>
                        </div>
                        <div className='infoContainer'>
                            <h4 className='metaWhite'>Лицензия</h4>
                            <p className='metaWhite'>{this.state.license}</p>
                        </div>
                        <div className='infoContainer'>
                            <h4 className='metaWhite'>Ожидаемая частота обновления</h4>
                            <p className='metaWhite'>{this.state.frequency}</p>
                        </div>
                        <div className='infoContainer'>
                            <h4 className='metaWhite'>Количество скачиваний</h4>
                            <p className='metaWhite'>{this.state.amount}</p>
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