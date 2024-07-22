import React, { useState } from 'react';
import './Search.css';
import Header from '../Header/Header';
import Filters from '../Filters/Filters';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../../img/search.png';
import {
    InputAdornment,
    IconButton,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

const Search = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const [searchString, setSearchString] = useState('');
    const resultsLimit = 30;
    const [datasets, setDatasets] = useState('');
    const [geography_and_places, setGeography] = useState([]);
    const [language, setLanguage] = useState([]);
    const [data_type, setData_type] = useState([]);
    const [task, setTask] = useState([]);
    const [technique, setTechnique] = useState([]);
    const [subject, setSubject] = useState([]);

    const search_by_query = async (e) => {
        if (e) e.preventDefault();
        const url = `http://10.100.30.74/api/search_by_query/${searchString}/${resultsLimit}`;
        const requestBody = {
            geography_and_places: geography_and_places, 
            language: language, 
            data_type: data_type, 
            task: task, 
            technique: technique, 
            subject: subject
        };
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            if (!response.ok) {
                alert('Network response was not ok');
                return;
            }
    
            const data = await response.json();
            if (data && data.length > 0) {
                setDatasets(data);
                navigate('/datasets', { state: { searchString, 
                    datasets: data, 
                    geography_and_places, 
                    language,
                    data_type,
                    task, 
                    technique, 
                    subject 
                 } });
            } else {
                console.log('No data returned from the server');
            }
        } catch (error) {
            alert("Error fetching datasets: " + error);
        }
    };

    const search_by_tags = async (e) => {
        if (e) e.preventDefault();
        const url = `http://10.100.30.74/api/search_by_tags/20`;
        const requestBody = {
            geography_and_places: geography_and_places, 
            language: language, 
            data_type: data_type, 
            task: task, 
            technique: technique, 
            subject: subject 
        };
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                alert('Network response was not ok');
                return;
            }

            const data = await response.json();

            if (data && data.length > 0) {
                setDatasets(data);
                navigate('/datasets', { state: { searchString, 
                    datasets: data, 
                    geography_and_places, 
                    language, 
                    data_type, 
                    task, 
                    technique, 
                    subject 
                 } });
            } else {
                alert('No data returned from the server');
            }
        } catch (error) {
            alert("Error fetching datasets: " + error);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchString.length > 0) {
            await search_by_query(e);
        } else {
            await search_by_tags(e);
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
                        <InputAdornment position="start">
                            <IconButton aria-controls="filter-menu" aria-haspopup="true" onClick={() => setIsModalOpen(true)}><FilterListIcon /></IconButton>
                        </InputAdornment>
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
                            applyChanges={search_by_tags}
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
