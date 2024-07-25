import React from 'react'
import './UploadedFile.css'

class UploadedFile extends React.Component {
    render() {
        return (
            <div className='uploadedFile'>
                <div id='uploadedFileName'>{this.props.fileName}</div>
            </div>
        ) 
    }
}

export default UploadedFile
