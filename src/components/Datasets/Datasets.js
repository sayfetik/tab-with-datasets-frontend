import React, { useState, useEffect } from 'react'
import DatasetCard from '../DatasetCard/DatasetCard'
import Back from '../Back/Back'
import Header from '../Header/Header'
import './Datasets.css'
import Filters from '../Filters/Filters'
import { useLocation, useNavigate } from 'react-router-dom';
import searchIcon from '../../img/search.png'
import _ from 'lodash';

const Datasets = () => {
    const location = useLocation();
    const { state } = location;
    const { searchString: searchQuery, datasets: initialDatasets } = state;
    const [datasets, setDatasets] = useState(initialDatasets);
    const [sortedData, setSortedData] = useState(initialDatasets);
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
    


    const [selectedOption, setSelectedOption] = useState('byRelevance');

    useEffect(() => {
        sortData(selectedOption);
    }, [selectedOption, datasets]);

    const sortData = (option) => {
        switch(option) {
            case 'byRelevance':
                setSortedData([...initialDatasets]);
                break;
            case 'byRating':
                setSortedData(_.orderBy(datasets, ['rating'], ['desc']));
                break;
            case 'byUsabilityRating':
                setSortedData(_.orderBy(datasets, ['usability_rating'], ['desc']));
                break;
            case 'largeFirst':
                setSortedData(_.orderBy(datasets, ['size'], ['desc']));
                break;
            case 'smallFirst':
                setSortedData(_.orderBy(datasets, ['size'], ['asc']));
                break;
            default:
                setSortedData([...datasets]);
        }
    };

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
                            <Filters />
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