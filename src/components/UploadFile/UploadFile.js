import React, { useState, useEffect } from 'react';
import './UploadFile.css';
import UploadedFile from '../UploadedFile/UploadedFile';
import deleteIcon from '../../img/delete.png';
import JSZip from 'jszip';

const UploadFilesPart = ({ pageLabel, files, setFiles, image, setImage, filesStructure, setFilesStructure, filesSizes }) => {
    const [showDeleteIcon, setShowDeleteIcon] = useState(false);
    const [isZipUploaded, setIsZipUploaded] = useState(false);
    const [totalFileSize, setTotalFileSize] = useState(0);
    const [imageSize, setImageSize] = useState(0);
    const [fileSizes, setFileSizes] = useState(filesSizes);
    let warningState = false;

    useEffect(()=>{
        setTotalFileSize(calculateTotalFileSize(fileSizes))
    }, [pageLabel])

    const isValidFile = (file) => {
        const validExtensions = ['.csv', '.json'];
        const fileExtension = file.name.slice((file.name.lastIndexOf(".") - 1 >>> 0) + 2);
        return validExtensions.includes(`.${fileExtension}`);
    };

    const formatFileSize = (size) => {
        if (size === 0) return '0 Б';
        const sizes = ['Б', 'КБ', 'МБ', 'ГБ'];
        const i = Math.floor(Math.log(size) / Math.log(1024));
        const formattedSize = (size / Math.pow(1024, i)).toFixed(2);
        return `${formattedSize} ${sizes[i]}`;
    };

    const calculateTotalFileSize = (fileSizes) => {
        return Object.values(fileSizes).reduce((total, size) => total + size, 0);
    };

    
    useEffect(()=> {
        console.log(filesStructure);
        console.log(fileSizes);
        if (totalFileSize > 5*1024*1024*1024) warningState = true;
    }, [fileSizes])

    const handleFileAdding = (event) => {
        const selectedFiles = Array.from(event.target.files);
        const zipFile = selectedFiles.find(file => file.name.endsWith('.zip'));

        if (zipFile) {
            if (files.length > 0 && !isZipUploaded) {
                alert('Сначала удалите загруженные файлы перед загрузкой ZIP архива.');
                return;
            }

            if (isZipUploaded) {
                alert('Вы можете загрузить только один ZIP архив.');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const zip = new JSZip();
                zip.loadAsync(e.target.result).then(contents => {
                    const filesInZip = Object.keys(contents.files);
                    const validFiles = filesInZip.filter(fileName => {
                        const extension = fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2);
                        return ['csv', 'json'].includes(extension);
                    });

                    if (validFiles.length === filesInZip.length) {
                        // Добавляем только ZIP файл в список загруженных файлов
                        const newFiles = { name: zipFile.name, size: zipFile.size };
                        setFiles(prevFiles => [...prevFiles, newFiles]);
                        setIsZipUploaded(true);
                        setTotalFileSize(prevSize => prevSize + zipFile.size);

                        const updatedStructure = { ...filesStructure };
                        updatedStructure[zipFile.name] = true;
                        setFilesStructure(updatedStructure);

                        const updatedFileSizes = { ...fileSizes };
                        updatedFileSizes[zipFile.name] = zipFile.size;
                        setFileSizes(updatedFileSizes);
                    } else {
                        alert('ZIP архив должен содержать только CSV или JSON файлы.');
                    }
                });
            };
            reader.readAsArrayBuffer(zipFile);
        } else {
            if (isZipUploaded) {
                alert('Вы можете загрузить только один ZIP архив.');
                return;
            }

            const validFiles = selectedFiles.filter(isValidFile);
            if (validFiles.length !== selectedFiles.length) {
                alert('Разрешены только CSV и JSON файлы.');
                return;
            }

            // Обновляем состояние файлов и общий размер
            setFiles(prevFiles => [...prevFiles, ...validFiles]);

            const updatedStructure = { ...filesStructure };
            validFiles.forEach(file => {
                updatedStructure[file.name] = true;
            });
            setFilesStructure(updatedStructure);

            const updatedFileSizes = { ...fileSizes };
            validFiles.forEach(file => {
                updatedFileSizes[file.name] = file.size;
            });
            setFileSizes(updatedFileSizes);

            setTotalFileSize(calculateTotalFileSize(updatedFileSizes)); // Пересчитываем общий размер
        }
    };

    const handleDeleteFile = (index) => {
        const keys = Object.keys(filesStructure);
        const fileName = keys[index];

        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);

        const updatedStructure = { ...filesStructure };
        delete updatedStructure[fileName]; // Удаляем файл из структуры
        setFilesStructure(updatedStructure);

        const updatedFileSizes = { ...fileSizes };
        delete updatedFileSizes[fileName]; // Удаляем файл из структуры
        setFileSizes(updatedFileSizes);
        
        // Пересчитываем общий размер файлов
        const newTotalSize = calculateTotalFileSize(updatedFileSizes);
        setTotalFileSize(newTotalSize);

        // Сбрасываем состояние isZipUploaded, если больше нет загруженных файлов
        if (newFiles.length === 0) {
            setIsZipUploaded(false);
        }
    };

    const handleImageAdding = (event) => {
        const selectedImage = event.target.files[0];
        if (selectedImage) {
            setImage(selectedImage);
            setImageSize(selectedImage.size);
            setShowDeleteIcon(false);
        }
    };

    const handleDeleteImage = () => {
        setImage(null);
        setImageSize(0);
        setShowDeleteIcon(false);
    };

    return (
        <div className='uploadPage'>
            <h1>{pageLabel}</h1>
            <div className='uploadFilesContainer'>
                <div className='uploadFile'>
                    <div className='dropFile'>Загрузите файлы json, csv или один архив с файлами</div>
                    <input
                        type="file"
                        id='chooseFiles'
                        style={{ display: 'none' }}
                        onChange={handleFileAdding}
                        multiple
                    />
                    <button className='seeFiles' onClick={() => {
                        document.getElementById('chooseFiles').click();
                    }}>Просмотр файлов</button>
                    <div className='limitFile'>{formatFileSize(totalFileSize)} / 5 ГБ</div>
                </div>

                <div>
                    <div className='coverImageText'>Обложка для датасета</div>
                    {!image && (
                        <div>
                            <div className='uploadImage' id='datasetImageUpload'>
                                <div className='dropImage'>Загрузить обложку</div>
                                <input
                                    type="file"
                                    id='chooseImage'
                                    style={{ display: 'none' }}
                                    onChange={handleImageAdding}
                                    accept="image/*"
                                />
                                <button className='seeImage' onClick={() => {
                                    document.getElementById('chooseImage').click();
                                }}>Просмотр файлов</button>
                                <div className='limitImage'>{formatFileSize(imageSize)} / 100 МБ</div>
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
                            {Object.entries(fileSizes).map(([fileName, fileSize], index) => (
                                <UploadedFile 
                                    key={index} 
                                    fileName={fileName} 
                                    fileSize={formatFileSize(fileSize)} 
                                    index={index}
                                    handleDeleteFile={handleDeleteFile} 
                                />
                            ))}
                        </div>
                    </div>
                    
                    {warningState && <p className='warning'>* Размер загружаемых файлов превышает лимит</p>}
                </div>
            </div>
        </div>
    );
};

export default UploadFilesPart;