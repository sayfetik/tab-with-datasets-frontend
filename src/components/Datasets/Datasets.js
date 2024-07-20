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
    const { searchString: searchQuery, datasets: initialDatasets } = state;
    const [datasets, setDatasets] = useState(initialDatasets);
    const [searchString, setSearchString] = useState(searchQuery || '');
    const [sortedData, setSortedData] = useState(initialDatasets);
    const [selectedOption, setSelectedOption] = useState('byRelevance');
    const [isModalOpen, setIsModalOpen] = useState(false);
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
            setDatasets(data);
            setSortedData(data);
        } catch (error) {
            alert("Error fetching datasets: " + error);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch(event);
        }
      };
    
    const sendFiltersToBackend = async (filters) => {
        const url = 'http://10.100.30.74/api/filters';
    
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(filters),
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const data = await response.json();
          console.log('Response from backend:', data);
          setSortedData(data);
        } catch (error) {
          console.error('Error sending filters to backend:', error);
        }
      };

    useEffect(() => {
        switch(selectedOption) {
            case 'byRelevance':
                setSortedData([...datasets]);
                break;
            case 'byRating':
                setSortedData(_.orderBy(sortedData, ['rating'], ['desc']));
                break;
            case 'byUsabilityRating':
                setSortedData(_.orderBy(sortedData, ['usability_rating'], ['desc']));
                break;
            case 'largeFirst':
                setSortedData(_.orderBy(sortedData, ['size_bytes'], ['desc']));
                break;
            case 'smallFirst':
                setSortedData(_.orderBy(sortedData, ['size_bytes'], ['asc']));
                break;
            default:
                setSortedData([...datasets]);
        }
    }, [selectedOption, sortedData, datasets]);

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
                            <InputAdornment>
                                <IconButton aria-controls="filter-menu" aria-haspopup="true" onClick={() => setIsModalOpen(true)}><FilterListIcon /></IconButton>
                            </InputAdornment>
                            <Filters 
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                onFilterChange={sendFiltersToBackend}
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