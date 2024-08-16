import React from 'react';
import './UploadedFile.css';
import closeIcon from '../../img/close.png';

const UploadedFile = ({ index, fileName, fileSize, handleDeleteFile }) => {
        return (
            <div className='uploadedFile'>
                <div id='uploadedFileName'>{fileName} - {fileSize}</div>
                <button onClick={() => handleDeleteFile(index)} style={{ margin: '0px 10px', border: 'none', fontWeight: '700', width: '20px', height: '20px'}}><img width='15px' height='15px' src={closeIcon}></img></button>
            </div>
        )
}

export default UploadedFile
