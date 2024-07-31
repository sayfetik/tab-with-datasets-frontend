import React, { useState } from 'react';
import './UploadFile.css';
import UploadedFile from '../UploadedFile/UploadedFile';
import deleteIcon from '../../img/delete.png'

const UploadFilesPart = ({ pageLabel, files, setFiles, image, setImage }) => {
    const [showDeleteIcon, setShowDeleteIcon] = useState(false);

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
    };

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        if (selectedImage) {
            setImage(selectedImage);
            setShowDeleteIcon(false);
        }
    };

    const handleDeleteImage = () => {
        setImage(null);
        setShowDeleteIcon(false);
    };

    return (
        <div className='uploadPage'>
            <h1>{pageLabel}</h1>
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
                    <div className='coverImageText'>Обложка для датасета</div>
                    {!image && (
                        <div>
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
                                <div className='limitImage'>0кБ / 100 МБ</div>
                            </div>
                        </div>
                    )}
                    {image && (
                        <div
                            id='datasetImageUpload'
                            onMouseEnter={() => setShowDeleteIcon(true)}
                            onMouseLeave={() => setShowDeleteIcon(false)}
                            style={{
                                position: 'relative',
                                display: 'inline-block',
                            }}
                        >
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Uploaded cover"
                                id='coverPreviewImage'
                                style={{
                                    filter: showDeleteIcon ? 'brightness(70%)' : 'none',
                                }}
                            />
                            {showDeleteIcon && (
                                <img src={deleteIcon} alt='Удалить обложку датасета'
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    width: '40px',
                                    transform: 'translate(-50%, -50%)',
                                    cursor: 'pointer',
                                }}
                                onClick={handleDeleteImage}
                            />
                            )}
                        </div>
                    )}

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
};

export default UploadFilesPart;