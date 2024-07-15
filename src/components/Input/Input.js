import React from 'react'
import './Input.css'

class Input extends React.Component {
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
                        value={this.props.value}
                        id='metadataField'
                        onChange={this.props.onChange}>
                    </input>
                </div>
            </div>
        ) 
    }
}

export default Input;