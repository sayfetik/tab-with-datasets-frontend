import React, { useState } from 'react'
import './CardsRowSection.css'
import DatasetCard from '../DatasetCard/DatasetCard'
import arrowsIcon from '../../img/iconArrows.png'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const CardsRowSection = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { datasets: initialDatasets } = location.state || { datasets: [] };
    const [searchString, setSearchString] = useState('');
    const [resultsLimit, setResultsLimit] = useState(5);
    const [datasets, setDatasets] = useState([]);
    
    

        return (
            <div id='cardsRowSection'>
                <div className='topicCardsInRow'>
                    <h2>Похожее</h2>
                    <div id='seeAllIcon'>
                        <p id='seeAll'>Смотреть все</p>
                        <img src={arrowsIcon} width={"19px"} alt=''/>
                    </div>
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
                        <p>Error ocurred</p>
                    )}       
                </div>    
            </div>
        ) 
    
}

export default CardsRowSection