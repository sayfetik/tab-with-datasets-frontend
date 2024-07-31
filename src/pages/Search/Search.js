import React, { useState } from 'react';
import './Search.css';
import { Header, Filters, BackendConnector } from '../../components'
import { useNavigate } from 'react-router-dom';
import searchIcon from '../../img/search.png';
import { IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

const Search = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const [searchString, setSearchString] = useState('');
    const [datasets, setDatasets] = useState('');
    const [geography_and_places, setGeography] = useState([]);
    const [language, setLanguage] = useState([]);
    const [data_type, setData_type] = useState([]);
    const [task, setTask] = useState([]);
    const [technique, setTechnique] = useState([]);
    const [subject, setSubject] = useState([]);

    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        if (!(searchString.length > 0 || geography_and_places.length > 0 || language.length > 0 || data_type.length > 0 || task.length > 0 || technique.length > 0 || subject.length > 0)) {
            alert('Введите запрос в поле поиска или укажите теги для фильтрации датасетов');
            return;
        }
        try {
            let data;
            const filters = {
                geography_and_places: geography_and_places,
                language: language,
                data_type: data_type,
                task: task,
                technique: technique,
                subject: subject
            };

            if (searchString.length > 0) {
                data = await BackendConnector.searchByQuery(searchString, filters);
            } else {
                data = await BackendConnector.searchByTags(filters);
            }

            if (data && data.length > 0) {
                setDatasets(data);
                navigate('/datasets', { state: {
                    searchString: searchString, 
                    datasets: data, 
                    geography_and_places: geography_and_places,
                    language: language,
                    data_type: data_type,
                    task: task,
                    technique: technique,
                    subject: subject
                 } });
            } else {
                alert('No data returned from the server');
            }
        } catch (error) {
            alert("Error fetching datasets: " + error);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') handleSearch(event);
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
                    <button id='newDatasetButton' onClick={() => { navigate('/upload') }}>+ Новый датасет</button>
                </div>
            </div>
        </div>
    );
};

export default Search;
