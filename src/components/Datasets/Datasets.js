import React from 'react'
import DatasetCard from '../DatasetCard/DatasetCard'
import Back from '../Back/Back'
import Header from '../Header/Header'
import './Datasets.css'
import Sort from '../Sort/Sort'
import Filters from '../Filters/Filters'
import { useNavigate } from 'react-router-dom'; 

const Datasets = () => {
    const navigate = useNavigate();
        return (
            <div>
                <Header />
                <div id='datasets'>
                    <Back />
                    <div className='searchFiltersSort'>
                        <input type='text' id="sortInput" placeholder="Введённый запрос"/>
                        <Filters />
                        <Sort />
                        <button type='submit' id='searchButton' onClick={()=>{navigate('/datasets')}}>Найти</button>
                    </div>

                    <div id='cards'>
                        <DatasetCard />
                        <DatasetCard />
                        <DatasetCard />
                        <DatasetCard />
                        <DatasetCard />
                        <DatasetCard />
                        <DatasetCard />
                        <DatasetCard />
                        <DatasetCard />
                        <DatasetCard />
                        <DatasetCard />
                        <DatasetCard />
                        <DatasetCard />
                        <DatasetCard />
                        <DatasetCard />
                        <DatasetCard />
                        <DatasetCard />
                        <DatasetCard />
                        <DatasetCard />
                        <DatasetCard />
                        <DatasetCard />
                        <DatasetCard />
                        <DatasetCard />
                        <DatasetCard />
                    </div>
                </div>
            </div>
        ) 
}

export default Datasets