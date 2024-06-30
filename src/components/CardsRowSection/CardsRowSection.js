import React from 'react'
import './CardsRowSection.css'
import DatasetCard from '../DatasetCard/DatasetCard'
import arrowsIcon from '../../img/iconArrows.png'

class CardsRowSection extends React.Component {
    render() {
        return (
            <div id='cardsRowSection'>
                <div className='topicCardsInRow'>
                    <h2>{this.props.topicName}</h2>
                    <div id='seeAllIcon'>
                        <p id='seeAll'>Смотреть все</p>
                        <img src={arrowsIcon} width={"19px"}/>
                    </div>
                </div>

                <div id='cards4'>
                    <DatasetCard />
                    <DatasetCard />
                    <DatasetCard />
                    <DatasetCard />
                </div>
                <div id='cards3'>
                    <DatasetCard />
                    <DatasetCard />
                    <DatasetCard />
                </div>
            </div>
        ) 
    }
}

export default CardsRowSection