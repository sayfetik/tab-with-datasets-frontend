import React, { useState, useEffect } from 'react'
import DatasetCard from '../DatasetCard/DatasetCard'
import Back from '../Back/Back'
import Header from '../Header/Header'
import './Datasets.css'
import Filters from '../Filters/Filters'
import { useLocation } from 'react-router-dom';
import searchIcon from '../../img/search.png'
import _ from 'lodash';
    import {
    InputAdornment,
    IconButton,
    } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

const Datasets = () => {
    const location = useLocation();
    const { state } = location;
    const {
        searchString: searchQuery,
        datasets: initialDatasets,
        geography_and_places: initialGeography,
        language: initialLanguage,
        data_type: initialDataType,
        task: initialTask,
        technique: initialTechnique,
        subject: initialSubject,
    } = state;
    const [datasets, setDatasets] = useState(initialDatasets || []);
    const [searchString, setSearchString] = useState(searchQuery || '');
    const [sortedData, setSortedData] = useState(initialDatasets || []);
    const [selectedOption, setSelectedOption] = useState('byRelevance');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const resultsLimit = 30;
    
    const [geography_and_places, setGeography] = useState(initialGeography || []);
    const [language, setLanguage] = useState(initialLanguage || []);
    const [data_type, setData_type] = useState(initialDataType || []);
    const [task, setTask] = useState(initialTask || []);
    const [technique, setTechnique] = useState(initialTechnique || []);
    const [subject, setSubject] = useState(initialSubject || []);

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
                setSortedData(data);
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
            geography_and_places,
            language,
            data_type,
            task,
            technique,
            subject,
        };
        console.log('search_by_query requestBody:', requestBody);
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
                setSortedData(data);
            } else {
                alert('No data returned from the server');
            }
        } catch (error) {
            alert("Error fetching datasets: " + error);
        }
    };

    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        if (searchString.length > 0) {
            await search_by_query(e);
        } else {
            await search_by_tags(e);
        }
    };

    useEffect(() => {
        handleSearch();
    }, [datasets]);


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch(event);
        }
    };

    useEffect(() => {
        let sorted = [...datasets];
        switch(selectedOption) {
            case 'byRelevance':
                sorted = [...datasets];
                break;
            case 'byRating':
                sorted = _.orderBy(datasets, ['rating'], ['desc']);
                break;
            case 'byUsabilityRating':
                sorted = _.orderBy(datasets, ['usability_rating'], ['desc']);
                break;
            case 'largeFirst':
                sorted = _.orderBy(datasets, ['size_bytes'], ['desc']);
                break;
            case 'smallFirst':
                sorted = _.orderBy(datasets, ['size_bytes'], ['asc']);
                break;
            default:
                sorted = [...datasets];
        }
        setSortedData(sorted);
    }, [selectedOption, datasets]);

        return (
            <div>
                <Header />
                <div id='datasets'>
                    <Back />
                    <div className='searchFiltersSort'>
                        <form id='inputSearchDatasets' onSubmit={handleSearch} onKeyDown={handleKeyDown}>
                            <input
                                type='text' 
                                id="sortInput"
                                placeholder='Поиск по каталогу датасетов'
                                value={searchString}
                                onChange={(e) => setSearchString(e.target.value)} 
                            />
                            <InputAdornment position='end'>
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
                                <select className="visible" id='sort' value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                                <option value="byRelevance">By relevance</option>
                                <option value="byRating">By rating</option>
                                <option value="byUsabilityRating">By usability rating</option>
                                <option value="largeFirst">Large first</option>
                                <option value="smallFirst">Small first</option>
                            </select>
                            <button type='submit' id='searchButton'>Найти</button>
                            <button type='submit' id='searchIcon'><img id='searchIcon' src={searchIcon} alt='search'/></button>
                        </form>
                    </div>
                    <div id='cardsContainer'>
                        <div id='cards'>
                            {sortedData.length > 0 ? (
                                sortedData.map(dataset => (
                                    <DatasetCard
                                        key={dataset.id}
                                        id={dataset.id}
                                        title={dataset.title}
                                        authors={dataset.authors}
                                        numberOfFiles={dataset.number_of_files}
                                        lastChangeDate={dataset.last_change_date}
                                        downloadsNumber={dataset.downloads_number}
                                        size={dataset.size}
                                    />
                                ))
                            ) : ( 
                                <p>No datasets found</p>
                            )}   
                        </div>
                    </div>
                    
                </div>
            </div>
        );
}

export default Datasets;