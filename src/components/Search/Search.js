import React, { useState } from 'react'
import './Search.css'
import Header from '../Header/Header'
import Filters from '../Filters/Filters'
import { useNavigate } from 'react-router-dom';
import searchIcon from '../../img/search.png'

const Search = () => {
    const navigate = useNavigate();
    const [searchString, setSearchString] = useState('');
    const resultsLimit = 8;
    const [datasets, setDatasets] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        const url = `http://10.100.30.74/api/search/${searchString}/${resultsLimit}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                alert('Network response was not ok');
            }
            const data = await response.json();

            if (data && data.length > 0) {
                setDatasets(data);
                navigate(`/datasets`, { state: {searchString: searchString, datasets: data } });
            } else {
                alert('No data returned from the server');
            }
        } catch (error) {
            alert("Error fetching datasets: ", error);
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
                        <button type='submit' id='searchIcon'><img id='searchIcon' src={searchIcon} alt='search'/></button>
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