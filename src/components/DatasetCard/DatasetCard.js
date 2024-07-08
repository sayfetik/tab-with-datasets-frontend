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
    
    return (
        <div id='datasetCard' onClick={() => {navigate(`/dataset/${id}`)}} >
            <img id='datasetImage' src={datasetImage} alt="Dataset"/>
            <h3>{title}</h3>
            <div id='cardInfo'>
                <p className='fieldInfo'>Authors: {authors}</p>
                <p className='fieldInfo'>Last Change: {lastChangeDatetime}</p>
                <p className='fieldInfo'>Downloads: {downloadsNumber}</p>
                <p className='fieldInfo'>Size: {size}</p>
                <p className='fieldInfo'>Number of Files: {numberOfFiles}</p>
            </div>
        </div>
    );
}



export default DatasetCard