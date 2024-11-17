import React, { useEffect, useState } from 'react';
import './CardsRowSection.css';
import { DatasetCard, BackendConnector } from '../../components';
import linkIcon from '../../img/link-external.png'
import classification_icon from '../../img/popularTopicsIcons/classification.png';
import books_icon from '../../img/popularTopicsIcons/books.png';
import business_icon from '../../img/popularTopicsIcons/business.png';
import emotions_icon from '../../img/popularTopicsIcons/emotions.png';
import images_icon from '../../img/popularTopicsIcons/images.png';
import marketing_icon from '../../img/popularTopicsIcons/marketing.png';
import movies_icon from '../../img/popularTopicsIcons/movies.png';

const Topic = ({ topic, showAllClick, addToHistory }) => {
    const [datasets, setDatasets] = useState([]);

    const icons = {
        'Классификация': classification_icon,
        'Фильмы': movies_icon,
        'Бизнес': business_icon,
        'Эмоции': emotions_icon,
        'Картинки': images_icon,
        'Маркетинг': marketing_icon,
        'Книги': books_icon
    };

    const showPopularDatasets = async () => {
        try {
            const filters = {
                geography_and_places: [],
                language: [],
                data_type: [],
                task: [],
                technique: [],
                subject: []
            };
            const data = await BackendConnector.search(topic, filters, 6);
            if (data && data.length > 0) setDatasets(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        showPopularDatasets();
    }, []);

    return (
        <div id='highlyRatedDatasetsSection'>
            <div key={topic} className='topicContainer' style={{ marginBottom: '20px' }}>
                <div className='rowSpaceBetween' style={{marginBottom: '5px'}}>
                    <div className='row'>
                        <img src={icons[topic]} alt='' id='cardsRowIcon' />
                        <p id='highlyRatedDatasetsLabel'>{topic}</p>
                    </div>
                    <button className='darkBlueWhiteButton' id='seeAllDatasetsButton' onClick={()=>{showAllClick(topic)}}>
                        <p id='seeAllDatasets'>Смотреть все</p>
                        <img src={linkIcon} width='15px' alt=''/>
                    </button>
                </div>
                <div id='cardsContainer'>
                    <div id='cards'>
                        {datasets.map(dataset => (
                            <DatasetCard
                                key={dataset.id}
                                id={dataset.id}
                                title={dataset.title}
                                authors={dataset.authors}
                                numberOfFiles={dataset.number_of_files}
                                lastChangeDate={dataset.last_change_date}
                                downloadsNumber={dataset.downloads_number}
                                size={dataset.size}
                                smallDescription={dataset.small_description}
                                addToHistory={addToHistory}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topic;