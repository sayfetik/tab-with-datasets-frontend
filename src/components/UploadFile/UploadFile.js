import React, { useState, useEffect } from 'react';
import './UploadFile.css';
import UploadedFile from '../UploadedFile/UploadedFile';
import deleteIcon from '../../img/delete.png';
import JSZip from 'jszip';
import uploadIcon from '../../img/upload.png';

const UploadFilesPart = ({ pageLabel, files, setFiles, image, setImage, filesStructure, setFilesStructure, filesSizes }) => {
    const beginFilesSizes = filesSizes;
    const [showDeleteIcon, setShowDeleteIcon] = useState(false);
    const [isZipUploaded, setIsZipUploaded] = useState(false);
    const [uploadFilesChoice, setuploadFilesChoice] = useState(true);
    const [totalFileSize, setTotalFileSize] = useState(0);
    const [imageSize, setImageSize] = useState(0);
    const [fileSizes, setFileSizes] = useState(filesSizes);

    const [warningFileLimitState, setwarningFileLimitState] = useState(false);
    const [warningImageLimitState, setwarningImageLimitState] = useState(false);
    const [warningInvalidZip, setwarningInvalidZip] = useState(false);
    const [warningZips, setwarningZips] = useState(false);
    
    useEffect(()=> {
        if (totalFileSize > 5*1024*1024*1024) setwarningFileLimitState(true);
        setwarningFileLimitState(false);
        setwarningInvalidZip(false);
        setwarningZips(false);

        if (imageSize > 100*1024*1024) setwarningImageLimitState(true);
        setwarningImageLimitState(false);
    }, [fileSizes, image])

    useEffect(()=>{
        setTotalFileSize(calculateTotalFileSize(fileSizes))
    }, [pageLabel])

    useEffect(()=>{
        setFiles([]);
        setFileSizes({})
        setTotalFileSize(calculateTotalFileSize(beginFilesSizes))
        setIsZipUploaded(false)
    }, [uploadFilesChoice])

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

    const handleFileAdding = (event) => {
        const selectedFiles = Array.from(event.target.files);
        const zipFile = selectedFiles.find(file => file.name.endsWith('.zip'));

        if (zipFile) {
            if (isZipUploaded) {
                setwarningZips(true);
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
                        setwarningInvalidZip(true);
                    }
                });
            };
            reader.readAsArrayBuffer(zipFile);
        } else {
            // Обновляем состояние файлов и общий размер
            setFiles(prevFiles => [...prevFiles, ...selectedFiles]);

            const updatedStructure = { ...filesStructure };
            selectedFiles.forEach(file => {
                updatedStructure[file.name] = true;
            });
            setFilesStructure(updatedStructure);

            const updatedFileSizes = { ...fileSizes };
            selectedFiles.forEach(file => {
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
            <div style={{margin: '15px'}}></div>
            
            <div className='metadataSection'>
                <div>
                    <div id='filesSectionTitle'>Обложка для датасета <span style={{marginLeft: '20px'}} className='limitFile'>{formatFileSize(imageSize)} / 100 МБ</span></div>
                    {!image && (
                        <div className='uploadImage'>
                            <img src={uploadIcon}></img>
                            <input type="file" id='chooseImage' style={{ display: 'none' }} onChange={handleImageAdding} accept="image/*"/>
                            <p className='dropFile'>Переместите файлы сюда или <span className='seeFiles' onClick={() => {document.getElementById('chooseImage').click()}}>выберите файлы</span></p>
                            
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
                                style={{ filter: showDeleteIcon ? 'brightness(70%)' : 'none' }}
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
                    
                    {warningImageLimitState && <p className='warning'>Размер обложки превышает лимит</p>}
                </div>
                <div id='rightContainer'>
                        <div id='filesSectionTitle' className='row'>
                            Загрузите датасет *
                            <button style={{marginLeft: '10px'}} id={uploadFilesChoice ? 'uploadChosen' : 'uploadChoice'} onClick={()=>{setuploadFilesChoice(true)}}>
                                json, csv</button>
                            <p>или</p>
                            <button id={uploadFilesChoice ? 'uploadChoice' : 'uploadChosen'} style={{marginLeft: '15px'}} onClick={()=>{setuploadFilesChoice(false)}}>
                                zip</button>
                        </div>
                        <div className='row' id='filesPart'>
                            {uploadFilesChoice && <div className='uploadFile'>
                                <input type="file" id='chooseFiles' style={{ display: 'none' }} onChange={handleFileAdding} multiple accept=".json,.csv"/>
                                <img src={uploadIcon}></img>
                                <p className='dropFile'>Переместите файлы сюда или <span className='seeFiles' onClick={() => {document.getElementById('chooseFiles').click()}}>выберите файлы</span></p>
                                <div className='limitFile'></div>
                            </div>}

                            {!uploadFilesChoice && <div className='uploadFile'>
                                <input type="file" id='chooseZip' style={{ display: 'none' }} onChange={handleFileAdding} multiple accept=".zip"/>
                                <img src={uploadIcon}></img>
                                <p className='dropFile'>Переместите файлы сюда или <span className='seeFiles' onClick={() => {document.getElementById('chooseZip').click()}}>выберите zip</span></p>
                            </div>}

                            <div className='uploadedFilesSection'>
                                <div style={{margin: '5px'}}></div>
                                <div id='inputLabel' style={{display: 'flex', justifyContent: 'space-between'}}>Загруженные файлы <span>{formatFileSize(totalFileSize)} / 5 ГБ</span></div>
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
                    </div>
                    {warningFileLimitState && <p className='warning'>Размер загружаемых файлов превышает лимит</p>}
                    {warningInvalidZip && <p className='warning'>ZIP архив должен содержать только JSON или CSV файлы.</p>}
                    {warningZips && <p className='warning'>Вы можете загрузить только один ZIP архив.</p>}
                </div>
            </div>
        </div>
    );
};

export default UploadFilesPart;