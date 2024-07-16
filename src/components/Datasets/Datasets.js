import React, { useState, useEffect } from 'react'
import DatasetCard from '../DatasetCard/DatasetCard'
import Back from '../Back/Back'
import Header from '../Header/Header'
import './Datasets.css'
import Filters from '../Filters/Filters'
import { useLocation, useNavigate } from 'react-router-dom';
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
    const { searchString: searchQuery, datasets: initialDatasets } = state;
    const [datasets, setDatasets] = useState(initialDatasets);
    const [searchString, setSearchString] = useState(searchQuery || '');

    const navigate = useNavigate();
    const resultsLimit = 8;

    const handleSearch = async (e) => {
        e.preventDefault();
        const url = `http://10.100.30.74/api/search/${searchString}/${resultsLimit}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                alert('Network response was not ok');
                return;
            }
            const data = await response.json();
            if (data && data.length > 0) {
                setDatasets(data);
                setFilteredData(data);
                setSortedData(data); 
                navigate('/datasets', { state: { datasets: data } });
            } else {
                alert('No data returned from the server');
            } 
        } catch (error) {
            alert("Error fetching datasets: " + error);
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch(event);
        }
      };
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredData, setFilteredData] = useState(datasets);
    const handleFilterChange = (filters) => {
        const filteredDatasets = datasets.filter(dataset => {
            // Проверяем каждую категорию фильтров
            const categories = ['geography_and_places', 'language', 'data_type', 'task', 'technique', 'subject'];
            
            return categories.every(category => {
                // Проверяем, существует ли категория в фильтрах и является ли она массивом
                if (!filters[category] || !Array.isArray(filters[category]) || filters[category].length === 0) {
                    return true;
                }
                
                // Проверяем, содержит ли датасет хотя бы один тег из фильтра для этой категории
                return filters[category].some(filterTag => 
                    /*dataset.tags && Array.isArray(dataset.tags) && dataset.tags.some(datasetTag => 
                        datasetTag && filterTag &&
                        datasetTag.value === filterTag.value && 
                        datasetTag.label === filterTag.label
                    )*/
                    dataset.tags && Array.isArray(dataset.tags) && dataset.tags.some(datasetTag =>  
                        datasetTag.label === filterTag.label
                    )
                );
            });
        });
    
        console.log(filters);
        setFilteredData(filteredDatasets);
        setSortedData(filteredDatasets);
    };

    const [sortedData, setSortedData] = useState(filteredData);
    const [selectedOption, setSelectedOption] = useState('byRelevance');

    useEffect(() => {
        switch(selectedOption) {
            case 'byRelevance':
                setSortedData([...filteredData]);
                break;
            case 'byRating':
                setSortedData(_.orderBy(filteredData, ['rating'], ['desc']));
                break;
            case 'byUsabilityRating':
                setSortedData(_.orderBy(filteredData, ['usability_rating'], ['desc']));
                break;
            case 'largeFirst':
                setSortedData(_.orderBy(filteredData, ['size'], ['desc']));
                break;
            case 'smallFirst':
                setSortedData(_.orderBy(filteredData, ['size'], ['asc']));
                break;
            default:
                setSortedData([...filteredData]);
        }
    }, [selectedOption, filteredData]);

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
                            <InputAdornment position="start">
                                <IconButton aria-controls="filter-menu" aria-haspopup="true" onClick={() => setIsModalOpen(true)}><FilterListIcon /></IconButton>
                            </InputAdornment>
                            <Filters 
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                onFilterChange={handleFilterChange}
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
                                        lastChangeDatetime={dataset.last_change_datetime}
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