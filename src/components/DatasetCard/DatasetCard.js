import React from 'react'
import './DatasetCard.css'
import datasetImage from '../../img/datasetImage.png'
import { useNavigate } from 'react-router-dom';

const DatasetCard = ({ 
    id, 
    title, 
    authors, 
    numberOfFiles, 
    lastChangeDatetime, 
    downloadsNumber, 
    size 
}) => {
    const navigate = useNavigate();

    const getFileWord = (number) => {
        if (11 <= number % 100 && number % 100 <= 14) {
            return `${number} файлов`;
        } else { 
            const lastDigit = number % 10;
            if (lastDigit === 1) {
                return `${number} файл`;
            } else if (2 <= lastDigit && lastDigit <= 4) {
                return `${number} файла`;
            } else {
                return `${number} файлов`;
            }
        }
    };
    
    return (
        <div id='datasetCard' onClick={() => {navigate(`/dataset/${id}`)}} >
            <img id='datasetImage' src={datasetImage} alt="Dataset"/>
            <h3>{title}</h3>
            <div id='cardInfo'>
                <p className='fieldInfo'>Авторы: {authors}</p>
                <p className='fieldInfo'>Обновлён: {lastChangeDatetime}</p>
                <p className='fieldInfo'>{downloadsNumber} скачиваний</p>
                <p className='fieldInfo'>{getFileWord(numberOfFiles)}</p>
                <p className='fieldInfo'>{size}</p>
            </div>
        </div>
    );
}



export default DatasetCard