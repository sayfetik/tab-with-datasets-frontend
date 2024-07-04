import React from 'react'
import './Search.css'
import CardsRowSection from '../CardsRowSection/CardsRowSection'
import Header from '../Header/Header'
import Filters from '../Filters/Filters'
import Input from '../Input/Input'
import { useNavigate } from 'react-router-dom'; 
import arrowsIcon from '../../img/iconArrows.png'

const Search = () => {
    const navigate = useNavigate();
        return (
            <div id='all'>
                <Header />
            <div id='search'>
                <div id='searchSection'>
                    <div id='datasetLabel'>
                        <p id='main'>Датасеты</p>
                    </div>
                    <form id='inputSearch'>
                        <Input placeholder='Поиск по каталогу датасетов'/>
                        <Filters />
                        <button type='submit' id='searchButton' onClick={()=>{navigate('/datasets')}}>Найти</button>
                    </form>
                    <button id='newDatasetButton' onClick={()=>{navigate('/upload')}}>+ Новый датасет</button>
                </div>

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
                        <button id='topicTag'>Растельный мир</button>
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
            </div>
            </div>
        ) 
    }

export default Search