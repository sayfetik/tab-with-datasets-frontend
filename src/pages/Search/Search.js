import React, { useState, useEffect, useLayoutEffect } from 'react';
import './Search.css';
import { Filters, BackendConnector, DatasetCard, AuthAlert, CardsRowSection, PopularTopics } from '../../components';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../../img/search.png';
import { IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useKeycloak } from '@react-keycloak/web'
import fireIcon from '../../img/fireIcon.png';

const Search = () => {
    const { keycloak } = useKeycloak()
    const auth = keycloak.authenticated
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const [searchString, setSearchString] = useState('');
    const [geography_and_places, setGeography] = useState([]);
    const [language, setLanguage] = useState([]);
    const [data_type, setData_type] = useState([]);
    const [task, setTask] = useState([]);
    const [technique, setTechnique] = useState([]);
    const [subject, setSubject] = useState([]);
    const [datasets, setDatasets] = useState([]);
    const [noDatasets, setnoDatasets] = useState(false);
    const [warningSearch, setwarningSearch] = useState(false);
    const [authWarning, setauthWarning] = useState(false);

    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        if (!(searchString.length > 0 || geography_and_places.length > 0 || language.length > 0 || data_type.length > 0 || task.length > 0 || technique.length > 0 || subject.length > 0)) {
            setwarningSearch(true);
            return;
        }
        
        navigate('/datasets', { state: {
            searchString: searchString,
            geography_and_places: geography_and_places,
            language: language,
            data_type: data_type,
            task: task,
            technique: technique,
            subject: subject
        } })
    };

    const handleTopicSearch = async (topic) => {
        navigate('/datasets', { state: { searchString: topic } })
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') handleSearch(event);
    };

    const topics = [
        'Классификация',
        'Фильмы',
        'Бизнес',
        'Эмоции',
        'Картинки',
        'Маркетинг',
        'Книги'
    ]

    // const topics = [
    //     'Высокий рейтинг',
    //     'Компьютерное зрение',
    //     'Классификация',
    //     'Фильмы',
    //     'Бизнес',
    //     'Эмоции',
    //     'Картинки',
    //     'Маркетинг',
    //     'Недвижимость',
    //     'Музыка',
    //     'Отзывы',
    //     'Образование',
    //     'Отели',
    //     'Автомобили',
    //     'Моделирование',
    //     'Спрос',
    //     'Книги',
    //     'Страхование',
    //     'Цветы',
    //     'Одежда',
    //     'Прогнозирование',
    //     'Электроэнергия',
    //     'Блокчейн',
    //     'Здравоохранение',
    //     'Железные дороги',
    // ]

    const getHighlyRatedDatasets = async () => {
        try {
            const data = await BackendConnector.highly_rated_datasets(6);

            if (data && data.length > 0) setDatasets(data);
            else setnoDatasets(true);
        } catch (error) {
        }
    };

    const handleUploadClick = () => {
        if (!auth) setauthWarning(true);
        else navigate('/upload');
    }
    
    useEffect(() => {
        document.title = `Поиск датасета`;
        getHighlyRatedDatasets();
      }, []);

    return (
        <div id='all'>
            <div id='search'>
                <div id='searchSection'>
                    <p id='main'>Датасеты</p>
                    <div id='searchRow' style={{width: '100%'}}>
                        <form id='inputSearch' onSubmit={handleSearch} onKeyDown={handleKeyDown}>
                            <div style={{width: '100%'}}>
                                <input type='text'
                                    id={warningSearch ? 'wrongInput' : 'correctInput'}
                                    placeholder='Поиск по каталогу датасетов'
                                    value={warningSearch? 'Введите запрос в поле или укажите фильтры' : searchString}
                                    onChange={(e) => setSearchString(e.target.value)}
                                    onClick={()=>{setwarningSearch(false)}}
                                />
                            </div>
                            <div id='filterIcon'>
                                <IconButton aria-controls="filter-menu" aria-haspopup="true" onClick={() => setIsModalOpen(true)}><FilterListIcon /></IconButton>
                            </div>
                            
                            <Filters
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                geography_and_places={geography_and_places}
                                setGeography={setGeography}
                                language={language}
                                setLanguage={setLanguage}
                                data_type={data_type}
                                setData_type={setData_type}
                                task={task}
                                setTask={setTask}
                                technique={technique}
                                setTechnique={setTechnique}
                                subject={subject}
                                setSubject={setSubject}
                                applyChanges={handleSearch}
                            />
                            <button type='submit' id='searchButton'>Найти</button>
                            <button type='submit' id='searchIcon'><img id='searchIcon' src={searchIcon} alt='search'/></button>
                        </form>
                        <button className='lightBlueButton' id='uploadDatasetButton' style={{padding: '9px 20px', textWrap: 'nowrap'}} onClick={()=>handleUploadClick()}>+ Новый датасет</button>
                        <button className='lightBlueButton' id='uploadIcon' style={{padding: '9px 20px', textWrap: 'nowrap'}} onClick={()=>handleUploadClick()}>+</button>
                        {authWarning && <AuthAlert onClose={()=>setauthWarning(false)} isOpen={authWarning}/>}
                    </div>
                    </div>
                
                <div className="topicsList">
                    {topics.map((topic, index) => (
                        <button key={index} onClick={()=>{handleTopicSearch(topic)}} className="whiteBlueButton" id="topic">{topic}</button>
                    ))}
                </div>

                <CardsRowSection datasets={datasets} label='Высокий рейтинг'/>   
                <PopularTopics topics={topics} showAll={handleTopicSearch}/>         
            </div>
        </div>
    );
}

export default Search;
