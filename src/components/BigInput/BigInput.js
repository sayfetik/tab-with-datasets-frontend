import React from 'react'
import './BigInput.css'

class BigInput extends React.Component {
    render() {
        return (
            <div className='input'>
                <span className='inputLabel'>{this.props.label}</span>
                <div className='inputField'>
                    <input type="text" placeholder={this.props.placeholder} className='metadataBig'></input>
                </div>
            </div>
        ) 
    }
}

export default BigInput