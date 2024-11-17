import React from 'react';
import './CardsRowSection.css';
import { Topic } from '../../components';

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