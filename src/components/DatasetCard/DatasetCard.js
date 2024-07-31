import React from 'react'
import './DatasetCard.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BackendConnector from '../BackendConnector';

const DatasetCard = ({ 
    id, 
    title,
    authors, 
    numberOfFiles, 
    lastChangeDate, 
    downloadsNumber,
    size,
    smallDescription
}) => {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);

    const fetchImage = async () => {
        try {
            const imageUrl = await BackendConnector.getImage(id);
            setImage(imageUrl);
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };

    useEffect(() => {
        if (image === null) fetchImage();
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


    const [isHovered, setIsHovered] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    let hoverTimer = null;

    const handleMouseEnter = () => {
        setIsExpanded(true);
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimer);
        setIsExpanded(false);
        setIsHovered(false);
    };
    
    return (
        <div
            id='datasetCard'
            onClick={() => {navigate(`/dataset/${id}`)}}
            className={isExpanded ? 'expanded' : ''} 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
        >
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
            <p id='description'>{smallDescription}</p>
            </div>
        </div>
    );
}



export default DatasetCard