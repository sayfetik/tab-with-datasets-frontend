import React, {useState} from 'react'
import DatasetCard from '../DatasetCard/DatasetCard'
import Back from '../Back/Back'
import Header from '../Header/Header'
import './Datasets.css'
import Sort from '../Sort/Sort'
import Filters from '../Filters/Filters'
import { useLocation, useNavigate } from 'react-router-dom'; 

const Datasets = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { datasets: initialDatasets } = location.state || { datasets: [] };
    const [datasets, setDatasets] = useState(initialDatasets);
    const [searchString, setSearchString] = useState('');
    const [resultsLimit, setResultsLimit] = useState(5);

    const handleSearch = async (e) => {
        e.preventDefault();
        const url = `http://localhost:8080/api/search/${searchString}/${resultsLimit}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                alert('Network response was not ok');
                return;
            }
            const data = await response.json();
            if (data && data.length > 0) {
                setDatasets(data);
                navigate('/datasets', { state: { datasets: data } });
            } else {
                alert('No data returned from the server');
            } 
        } catch (error) {
            alert("Error fetching datasets: " + error);
        }
    };

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