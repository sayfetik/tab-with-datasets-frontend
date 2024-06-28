import React from 'react'
import './UploadFile.css'
import UploadedFile from '../UploadedFile/UploadedFile'

class UploadFile extends React.Component {
    render() {
        return (
            <div className='uploadPage'>
                <h1>Датасет</h1>

                <div className='uploadFilesContainer'>
                    <div className='uploadFile'>
                        <div className='dropFile'>Перетащите файлы для загрузки</div>
                        <input type="file" id='chooseFiles' style={{display: 'none'}}></input>
                        <button className='seeFiles' onClick={()=>{
                            document.getElementById('chooseFiles').click();
                        }}>Просмотр файлов</button>
                        <div className='limitFile'>0кБ / {this.props.limitFile} ГБ</div>
                    </div>

                    <div>
                        <div>
                            <div className='coverImageText'>Обложка для датасета</div>
                            <div className='uploadImage' id='datasetImageUpload'>
                                <div className='dropImage'>Перетащите файлы для загрузки</div>
                                <input type="file" id='chooseImage' style={{display: 'none'}}></input>
                                <button className='seeImage' onClick={()=>{
                                    document.getElementById('chooseImage').click();
                                }}>Просмотр файлов</button>
                                <div className='limitImage'>0кБ / {this.props.limitImage} МБ</div>
                            </div>
                        </div>
                    
                        <div className='uploadedFilesSection'>
                            <div className='uploadedFilesTitle'>Загруженные файлы</div>
                            <div className='uploadedFilesContainer'>
                                <UploadedFile fileName="Название загруженного файла"/>
                                <UploadedFile fileName="Название большой загруженного файла"/>
                                <UploadedFile fileName="Название загруженного файла"/>
                                <UploadedFile fileName="Название загруженного файла"/>
                                <UploadedFile fileName="Название большой загруженного файла"/>
                                <UploadedFile fileName="Название загруженного файла"/>
                            </div>
                        </div>
                    </div>
            </div>
            </div>
        ) 
    }
}

export default UploadFile
