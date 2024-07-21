import React, { useState } from 'react'
import './Search.css'
import CardsRowSection from '../CardsRowSection/CardsRowSection'
import Header from '../Header/Header'
import Filters from '../Filters/Filters'
import Input from '../Input/Input'
import { useParams, useNavigate } from 'react-router-dom';
import arrowsIcon from '../../img/iconArrows.png'
import searchIcon from '../../img/search.png'
import BackendConnector from '../BackendConnector'

const Search = ({ fetchUrl }) => {
    const navigate = useNavigate();
    const [searchString, setSearchString] = useState('');
    const [resultsLimit, setResultsLimit] = useState(8);
    const [datasets, setDatasets] = useState('');
    // const [geography_and_places, set_geography_and_places] = useState([]);
    // const [language, set_language] = useState([]);
    // const [data_type, set_data_type] = useState([]);
    // const [task, set_task] = useState([]);
    // const [technique, set_technique] = useState([]);
    // const [subject, set_subject] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        const tags = {
            geography_and_places: [],
            language: [], 
            data_type: [], 
            task: [], 
            technique: [], 
            subject: [] 
        };
        try {
            const data = await BackendConnector.search(searchString, tags);
            if (data && data.length > 0) {
                setDatasets(data);
                navigate('/datasets', { state: {searchString: searchString, datasets: data } });
            } else {
                console.log('No data returned from the server');
            }
        } catch (error) {
            console.log("Error fetching datasets: ", error);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch(event);
        }
      };

    return (
        <div id='all'>
            <Header />
        <div id='search'>
            <div id='searchSection'>
                <div id='datasetLabel'>
                    <p id='main'>Датасеты</p>
                </div>
                <form id='inputSearch' onSubmit={handleSearch} onKeyDown={handleKeyDown}>
                    <input type='text' 
                        placeholder='Поиск по каталогу датасетов'
                        value={searchString}
                        onChange={(e) => setSearchString(e.target.value)} 
                    />
                    <Filters />
                    <button type='submit' id='searchButton'>Найти</button>
                    <button type='submit' id='searchIcon'><img id='searchIcon' src={searchIcon}/></button>
                </form>
                <button id='newDatasetButton' onClick={()=>{navigate('/upload')}}>+ Новый датасет</button>
            </div>
{/*
                <div className='datasetTopicSection'>
                    <div id='topicTags'>
                        <button id='topicTag'>Классификация</button>
                        <button id='topicTag'>Музыка</button>
                        <button id='topicTag'>Демография</button>
                        <button id='topicTag'>Лингвистика</button>
                        <button id='topicTag'>Бизнес</button>
                        <button id='topicTag'>Образование</button>
                        <button id='topicTag'>Экзамены</button>
                        <button id='topicTag'>Погода</button>
                        <button id='topicTag'>Компьютерное зрение</button>
                        <button id='topicTag'>Компьютерное технологие</button>
                        <button id='topicTag'>Температура</button>
                        <button id='topicTag'>Социальные науки</button>
                        <button id='topicTag'>Математика</button>
                        <button id='topicTag'>Ветеринария</button>
                        <button id='topicTag'>Население</button>
                        <button id='topicTag'>Фильмы</button>
                        <button id='topicTag'>Растительный мир</button>
                        <button id='topicTag'>Искусство</button>
                        <button id='topicTag'>Человек</button>
                        <button id='topicTag'>Животные</button>
                        <button id='topicTag'>Книги</button>
                    </div>
                    <p id='main'>Темы датасетов</p>
                </div>

                <div>
                    <CardsRowSection topicName={'Популярное'} />
                    <CardsRowSection topicName={'Рекомендованное'} />
                    <CardsRowSection topicName={'Путешествия'} />
                </div>

                <div id='seeAllDatasets'>
                    <h2 id='seeAllTopic'>Смотреть все датасеты</h2>
                    <img src={arrowsIcon} width='30px' height='30px' alt=''></img>
                </div>  
        */}
            </div>
            </div>
        ) 
    }

export default Search