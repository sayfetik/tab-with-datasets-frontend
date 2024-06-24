import React from 'react'
import './Input.css'

class Input extends React.Component {
    render() {
        return (
            <div className='input'>
                <span className='inputLabel'>{this.props.label}</span>
                <div className='inputField'>
                    <input type="text" placeholder={this.props.placeholder}  id='metadataField'></input>
                </div>
            </div>
        ) 
    }
}

export default Input