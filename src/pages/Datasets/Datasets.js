import React, { useState, useEffect } from 'react'
import { DatasetCard, Back, Header, Filters, BackendConnector } from '../../components'
import './Datasets.css'
import { useLocation } from 'react-router-dom';
import searchIcon from '../../img/search.png'
import _ from 'lodash';
import { IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

const Datasets = () => {
    const { state } = useLocation();
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
    
    const [geography_and_places, setGeography] = useState(initialGeography || []);
    const [language, setLanguage] = useState(initialLanguage || []);
    const [data_type, setData_type] = useState(initialDataType || []);
    const [task, setTask] = useState(initialTask || []);
    const [technique, setTechnique] = useState(initialTechnique || []);
    const [subject, setSubject] = useState(initialSubject || []);

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
                setSortedData(data);
            } else {
                console.log('No data returned from the server');
            }
        } catch (error) {
            alert("Error fetching datasets: " + error);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') handleSearch(event);
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
    }, [selectedOption]);

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
                                        smallDescription={dataset.small_description}
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