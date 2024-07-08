import React, {useState} from 'react'
import DatasetCard from '../DatasetCard/DatasetCard'
import Back from '../Back/Back'
import Header from '../Header/Header'
import './Datasets.css'
import Sort from '../Sort/Sort'
import Filters from '../Filters/Filters'
import { useLocation } from 'react-router-dom'; 

const Datasets = () => {
    const location = useLocation();
    const { datasets } = location.state || { datasets: [] };
    const [searchString, setSearchString] = useState('');

    const handleSearch = () => {}

        return (
            <div>
                <Header />
                <div id='datasets'>
                    <Back />
                    <div className='searchFiltersSort'>
                        <input
                            type='text'
                            id="sortInput"
                            placeholder="Введённый запрос"
                            value={searchString}
                            onChange={(e) => setSearchString(e.target.value)}
                        />
                        <Filters />
                        <Sort />
                        <button
                            type='submit'
                            id='searchButton'
                            onClick={handleSearch}
                        >

                            Найти
                        </button>     
                    </div>
                    <div id='cards'>
                        {datasets.length > 0 ? (
                            datasets.map(dataset => (
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
        );
}

export default Datasets;