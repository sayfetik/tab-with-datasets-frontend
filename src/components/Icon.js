import React from 'react'
import './Icon.css'

class Icon extends React.Component {
    render() {
        return (
            <img src={this.props.image} id="icon" width="20px" height="20px" viewBox="0px 0px 20px 20px" fill="none" alt="Иконка"/>
        ) 
    }
}

export default Icon