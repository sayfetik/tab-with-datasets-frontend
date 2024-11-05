import React from 'react'
import './CardsRowSection.css'
import DatasetCard from '../DatasetCard/DatasetCard'
import fireIcon from '../../img/fireIcon.png';

const CardsRowSection = ({label, datasets}) => {
    return ( datasets &&
        (<div id='highlyRatedDatasetsSection'>
            <div className='row' style={{marginBottom: '20px'}}>
                <img src={fireIcon} alt='' id='cardsRowIcon'/>
                <p id='highlyRatedDatasetsLabel'>{label}</p>
            </div>
            <div id='cardsContainer'>
                <div id='cards'>
                    {datasets.map(dataset => (
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
                        />))}
                </div>
            </div>
        </div>)
    )
}

export default CardsRowSection