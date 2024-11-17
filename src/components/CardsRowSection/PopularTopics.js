import React, { useEffect, useState } from 'react';
import './CardsRowSection.css';
import { DatasetCard, BackendConnector, Topic } from '../../components';
import linkIcon from '../../img/link-external.png'
import classification_icon from '../../img/popularTopicsIcons/classification.png';
import books_icon from '../../img/popularTopicsIcons/books.png';
import business_icon from '../../img/popularTopicsIcons/business.png';
import emotions_icon from '../../img/popularTopicsIcons/emotions.png';
import images_icon from '../../img/popularTopicsIcons/images.png';
import marketing_icon from '../../img/popularTopicsIcons/marketing.png';
import movies_icon from '../../img/popularTopicsIcons/movies.png';

const PopularTopics = ({ topics, showAllClick, addToHistory }) => {
    return (
        <div id='highlyRatedDatasetsSection'>
            {topics && topics.map(topic => (
                <Topic topic={topic} showAllClick={showAllClick} addToHistory={addToHistory}/>
            ))}
        </div>
    );
};

export default PopularTopics;