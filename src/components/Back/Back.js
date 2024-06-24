import React from 'react'
import Icon from '../Header/Icon'
import back from '../../img/back.png'
import './Back.css'

class Back extends React.Component {
    render() {
        return (
            <div className='back'>
                <Icon image={back} />
                <a href="">Назад</a>
            </div>
        ) 
    }
}

export default Back