import React from 'react'
import './DatasetCard.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const DatasetCard = ({ 
    id, 
    title,
    authors, 
    numberOfFiles, 
    lastChangeDate, 
    downloadsNumber,
    size
}) => {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);

    const getImage = () => {
        const url = `http://10.100.30.74/api/get_image/${id}`;

        fetch(url, {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.blob();  // Изменено на получение blob
        })
        .then(blob => {
            const imageUrl = URL.createObjectURL(blob);
            setImage(imageUrl);
            console.log(imageUrl);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        if (image === null) getImage();
    })

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
            <img id='datasetImage' src={image} alt='Dataset cover'></img>
            <h3 id='datasetTitleOnCard'>{title}</h3>
            <div id='cardInfo'>
                <div className='rowSpaceBetween'>
                    <p className='fieldInfo' id='authors'>{authors}</p>
                    <p className='fieldInfo' id='renewData'>{lastChangeDate}</p>
                </div>
                <p className='fieldInfo'>{downloadsNumber} скачиваний</p>
                <div className='row'>
                    <p className='fieldInfo'>{getFileWord(numberOfFiles)}</p>
                    <p className='fieldInfo'>{size}</p>
                </div>
            </div>
        </div>
    );
}



export default DatasetCard