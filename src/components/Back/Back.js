import React from 'react'
import Icon from '../Icon/Icon'
import backIcon from '../../img/back.png'
import './Back.css'
import { useNavigate } from 'react-router-dom';

const Back = ({back}) => {
    const click = () => {
        // console.log(back());
        navigate(back())
    }
    const navigate = useNavigate();
    return (
        <div className='back' onClick={click}>
            <Icon image={backIcon} />
            <button>Назад</button>
        </div>
    )   
}

export default Back