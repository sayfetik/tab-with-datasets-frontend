import React, { Component }  from 'react'
import './BigInput.css'

class BigInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
          inputValue: this.props.value || ''
        };
      }

    handleChange = (event) => {
        this.setState({ inputValue: event.target.value });
        this.props.onChange(event);
    };

    render() {
        return (
            <div className='input'>
                <span className='inputLabel'>{this.props.label}</span>
                <div className='inputField'>
                    <input
                        type="text"
                        placeholder={this.props.placeholder}
                        value={this.state.inputValue}
                        className='metadataBig'
                        onChange={this.handleChange}>
                    </input>
                </div>
            </div>
        ) 
    }
}

export default BigInput