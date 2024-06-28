import React from 'react'
import './DatasetCard.css'
import datasetImage from '../../img/datasetImage.png'
import { useNavigate } from 'react-router-dom';

const DatasetCard = () => {
    const navigate = useNavigate();
    return (
        <div id='datasetCard'>
        <div onClick={()=>{navigate('/dataset')}} id='card' >
            <img id='datasetImage' src={datasetImage}></img>
            <h3>Вставить название датасета</h3>
            <div id='cardInfo'>
                <p className='fieldInfo'>Вставить автора</p>
                <p className='fieldInfo'>Вставить дату обновления</p>
                <p className='fieldInfo'>Вставить количество скачиваний</p>
                <p className='fieldInfo'>2 файла (CSV) 9 МБ</p>
            </div>
        </div>
        </div>
    )
}

export default DatasetCard