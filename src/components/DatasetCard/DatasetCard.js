import React, { useEffect, useState } from 'react'
import './DatasetCard.css'
import datasetImage from '../../img/datasetImage.png'
import { useNavigate } from 'react-router-dom';

const DatasetCard = ({ fetchUrl }) => {
    const navigate = useNavigate();
    const [datasets, setDatasets] = useState([
        {
            id: 1,
            name: "Пример датасета 1",
            author: "Автор 1",
            updated_at: "2024-06-30",
            downloads: 150
        },
        {
            id: 2,
            name: "Пример датасета 2",
            author: "Автор 2",
            updated_at: "2024-06-29",
            downloads: 200
        },
        {
            id: 3,
            name: "Пример датасета 3",
            author: "Автор 3",
            updated_at: "2024-06-28",
            downloads: 300
        }
    ]);

    useEffect(() => {
        if (fetchUrl) {
            fetch(fetchUrl)
                .then(response => response.json())
                .then(data => setDatasets(data))
                .catch(error => console.error("Error fetching datasets: ", error));
        }
    }, [fetchUrl]);

    return (
        <div id='datasetCard'>
            {datasets.map(dataset => (
                <div key={dataset.id} onClick={() => {navigate('/dataset')}} id='card' >
                <img id='datasetImage' src={datasetImage} alt="Dataset"/>
                <h3>{dataset.name}</h3>
                <div id='cardInfo'>
                    <p className='fieldInfo'>{dataset.author}</p>
                    <p className='fieldInfo'>{dataset.updated_at}</p>
                    <p className='fieldInfo'>{dataset.downloads}</p>
                    <p className='fieldInfo'>-</p>
                </div>
            </div>
            ))}
        </div>
    )
}

export default DatasetCard