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
        if (event.target.value.length <= this.props.textLimit) {
            this.setState({ inputValue: event.target.value });
            this.props.onChange(event);
        }
    };

    render() {
        const counterColor = this.props.value.length < this.props.textLimit ? 'rgb(169 169 169)' : '#3E456F';
        
        return (
            <div>
            {this.props.textLimit != 0 ?
                (<div className='input'>
                    <span className='inputLabel'>{this.props.label}</span>
                    <div className='inputField row'>
                        <input
                            type="text"
                            placeholder={this.props.placeholder}
                            value={this.props.value}
                            id='metadataField'
                            maxLength={this.props.textLimit}
                            onChange={this.props.onChange}>
                        </input>
                        <p className='textLimit'>
                            <p style={{color: counterColor}}>{this.props.value.length}</p>
                            /
                            {this.props.textLimit}
                        </p>
                    </div>
                </div>)
                :
                (<div className='input'>
                    <span className='inputLabel'>{this.props.label}</span>
                    <div className='inputField row'>
                        <input
                            type="text"
                            placeholder={this.props.placeholder}
                            value={this.props.value}
                            id='metadataField'
                            onChange={this.props.onChange}>
                        </input>
                    </div>
                </div>)
            }
            </div>
        ) 
    }
}

export default Input;