import React from 'react';
import './UploadFile.css';
import UploadedFile from '../UploadedFile/UploadedFile';

const UploadFilesPart = ({ files, setFiles, image, setImage }) => {

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
    };

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        if (selectedImage) {
            setImage(URL.createObjectURL(selectedImage));
        }
    };

        return (
            <div className='uploadPage'>
                <h1>Новый датасет</h1>

                <div className='uploadFilesContainer'>
                    <div className='uploadFile'>
                        <div className='dropFile'>Перетащите файлы для загрузки</div>
                        <input
                            type="file"
                            id='chooseFiles'
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                            multiple
                        />
                        <button className='seeFiles' onClick={() => {
                            document.getElementById('chooseFiles').click();
                        }}>Просмотр файлов</button>
                        <div className='limitFile'>0кБ / 5 ГБ</div>
                    </div>

                    <div>
                        <div>
                            <div className='coverImageText'>Обложка для датасета</div>
                            <div className='uploadImage' id='datasetImageUpload'>
                                <div className='dropImage'>Перетащите файлы для загрузки</div>
                                <input
                                    type="file"
                                    id='chooseImage'
                                    style={{ display: 'none' }}
                                    onChange={handleImageChange}
                                    accept="image/*"
                                />        
                                <button className='seeImage' onClick={() => {
                                    document.getElementById('chooseImage').click();
                                }}>Просмотр файлов</button>
                                <div className='limitImage'>0кБ / 100 ГБ</div>
                            </div>
                            {image && (
                                <div classname='uploadedImagePreview'>
                                    <img src={image} alt="Uploaded cover" classname='coverPreviewImage' />
                                </div>
                            )}
                        </div>
                    
                        <div className='uploadedFilesSection'>
                            <div className='uploadedFilesTitle'>Загруженные файлы</div>
                            <div className='uploadedFilesContainer'>
                                {files.map((file, index) => (
                                    <UploadedFile key={index} fileName={file.name} />
                                ))}
                            </div>
                        </div>
                    </div>
            </div>
            </div>
        );
    }
    

export default UploadFilesPart;
