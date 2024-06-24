import React from 'react'
import './UploadedFile.css'

class UploadedFile extends React.Component {
    render() {
        return (
            <div className='uploadedFile'>
                <a>{this.props.fileName}</a>
            </div>
            
        ) 
    }
}

export default UploadedFile
