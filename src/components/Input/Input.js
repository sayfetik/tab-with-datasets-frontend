import React from 'react'
import './Input.css'
import { THEME_ID } from '@mui/material'

class Input extends React.Component {
    render() {
        return (
            <div className='input'>
                <span className='inputLabel'>{this.props.label}</span>
                <div className='inputField'>
                    <input
                        type="text"
                        placeholder={this.props.placeholder} 
                        value={this.props.value}
                        onChange={this.props.onChange}
                        id='metadataField'>
                    </input>
                </div>
            </div>
        ) 
    }
}

export default Input;