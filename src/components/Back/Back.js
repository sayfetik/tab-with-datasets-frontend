import React from 'react'
import Icon from '../Icon'
import back from '../../img/back.png'
import './Back.css'
import { useNavigate } from 'react-router-dom';

const Back = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };
    return (
        <div className='back' onClick={goBack}>
            <Icon image={back} />
            <button>Назад</button>
        </div>
    )   
}

export default Back