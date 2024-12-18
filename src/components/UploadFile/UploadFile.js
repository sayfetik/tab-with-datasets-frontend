import React, { useState, useEffect, useRef } from 'react';
import './UploadFile.css';
import UploadedFile from '../UploadedFile/UploadedFile';
import deleteIcon from '../../img/delete.png';
import JSZip from 'jszip';
import uploadIcon from '../../img/upload.png';
import folderDarkIcon from '../../img/folderDark.png';

const UploadFilesPart = ({ pageLabel, files, setFiles, image, setImage, filesStructure, setFilesStructure, fileSizes, setFileSizes, initialImageSize, setInitialImageSize, initialImageFile, setInitialImageFile }) => {
    const beginFilesSizes = fileSizes;
    const [showDeleteIcon, setShowDeleteIcon] = useState(false);
    const [isZipUploaded, setIsZipUploaded] = useState(false);
    const [uploadFilesChoice, setuploadFilesChoice] = useState(true);
    const [totalFileSize, setTotalFileSize] = useState(0);
    const [imageSize, setImageSize] = useState(initialImageSize!==0? initialImageSize : 0);
    const [imageFile, setImageFile] = useState(initialImageFile);
    const previousUploadFilesChoice = useRef(uploadFilesChoice);

    const [warningFileLimitState, setwarningFileLimitState] = useState(false);
    const [warningImageLimitState, setwarningImageLimitState] = useState(false);
    const [warningInvalidZip, setwarningInvalidZip] = useState(false);
    const [warningZips, setwarningZips] = useState(false);
    const [warningFiles, setwarningFiles] = useState(false);
    const [warningFilesAndZip, setwarningFilesAndZip] = useState(false);
    const [warningImage, setwarningImage] = useState(false);

    const handleFileDrop = (event) => {
        event.preventDefault(); // Останавливаем поведение по умолчанию
        handleFileAdding(event); // Вызываем существующую функцию для добавления файлов
    };
    
    const handleDragOver = (event) => {
        event.preventDefault(); // Останавливаем поведение по умолчанию
    };

    const handleImageDrop = (event) => {
        event.preventDefault(); // Останавливаем поведение по умолчанию
        handleImageAdding(event); // Вызываем существующую функцию для добавления файлов
    };

    useEffect(() => {
        const hasZipFile = Object.keys(fileSizes).some(fileName => fileName.endsWith('.zip'));
        if (hasZipFile) {
            setIsZipUploaded(true);
            setuploadFilesChoice(false);
        } else {
            setIsZipUploaded(false);
            setuploadFilesChoice(true);
        }
    }, []);
    
    useEffect(()=> {
        if (totalFileSize > 5*1024*1024*1024) setwarningFileLimitState(true);
        setwarningFileLimitState(false);
        setwarningInvalidZip(false);
        setwarningZips(false);
        setwarningFiles(false);
        setwarningFilesAndZip(false);

        if (imageSize > 100*1024*1024) setwarningImageLimitState(true);
        setwarningImageLimitState(false);
    }, [fileSizes, image])

    useEffect(() => {
        if (initialImageSize !== 0) {
            setImageSize(initialImageSize);
        }
    }, [initialImageSize]);

    useEffect(()=>{
        setTotalFileSize(calculateTotalFileSize(fileSizes))
    }, [pageLabel])

    useEffect(() => {
        // Проверяем, изменилось ли значение uploadFilesChoice
        if (previousUploadFilesChoice.current !== uploadFilesChoice) {
            setFiles([]);
            setFileSizes({});
            setTotalFileSize(calculateTotalFileSize(beginFilesSizes));
            setIsZipUploaded(false);
        }
        // Обновляем ref на текущее значение
        previousUploadFilesChoice.current = uploadFilesChoice;
    }, [uploadFilesChoice]);

    const formatFileSize = (size) => {
        if (size === 0) return '0 Б';
        const sizes = ['Б', 'КБ', 'МБ', 'ГБ'];
        const i = Math.floor(Math.log(size) / Math.log(1024));
        const formattedSize = (size / Math.pow(1024, i)).toFixed(2);
        return `${formattedSize} ${sizes[i]}`;
    };

    const calculateTotalFileSize = (fileSizes) => {
        let totalSize = 0;

        const addSizes = (sizes) => {
            if (typeof sizes === 'object' && sizes !== null) {
                Object.values(sizes).forEach((size) => {
                    if (typeof size === 'number') totalSize += size;
                    else addSizes(size);
                });
            }
        };

        addSizes(fileSizes);
        return totalSize;
    };

    const handleFileAdding = (event) => {
        event.preventDefault();

        let selectedFiles = [];

        if (event.target && event.target.files) selectedFiles = Array.from(event.target.files);
        else if (event.dataTransfer && event.dataTransfer.files) selectedFiles = Array.from(event.dataTransfer.files);

        let zipFile = selectedFiles.find(file => file.name.endsWith('.zip'));

        if (zipFile) {
            if (isZipUploaded) {
                setwarningZips(true);
                return;
            }
            if (uploadFilesChoice) {
                setwarningFiles(true);
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
                        zipFile = false;
                    }
                });
            };
            reader.readAsArrayBuffer(zipFile);
        } else {
            const validExtensions = ['json', 'csv'];
            const validFiles = [];
            const invalidFiles = [];

            selectedFiles.forEach(file => {
                const extension = file.name.split('.').pop().toLowerCase();
                if (validExtensions.includes(extension)) validFiles.push(file);
                else invalidFiles.push(file);
            });

            if (invalidFiles.length > 0) {
                setwarningFiles(true);
                return;
            }

            if (validFiles.length > 0) {
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
        
        const newTotalSize = calculateTotalFileSize(updatedFileSizes);
        setTotalFileSize(newTotalSize);

        // Сбрасываем состояние isZipUploaded, если больше нет загруженных файлов
        if (newFiles.length === 0) {
            setIsZipUploaded(false);
        }
    };

    const handleImageAdding = (event) => {
        let selectedImage;
        if (event.target && event.target.files) selectedImage = event.target.files[0];
        else if (event.dataTransfer && event.dataTransfer.files) selectedImage = event.dataTransfer.files[0];

        if (selectedImage) {
            const validImageTypes = ['image/jpeg', 'image/png'];
            if (validImageTypes.includes(selectedImage.type)) {
                const imageUrl = URL.createObjectURL(selectedImage);
                setImage(imageUrl);
                setImageSize(selectedImage.size);
                setShowDeleteIcon(false);
                setImageFile(selectedImage);
            } else setwarningImage(true);
        } else console.error('No file selected');
    };

    useEffect(() => {
        return () => {
            if (image) {
                URL.revokeObjectURL(image);
            }
        };
    }, [image]);

    const handleDeleteImage = () => {
        if (image) URL.revokeObjectURL(image);
        setImage(null);
        setImageSize(0);
        setShowDeleteIcon(false);
        setImageFile(null);
    };

    return (
        <div className='uploadPage'>
            <h1 style={{marginBottom: '10px'}}>{pageLabel}</h1>
            <p id='requiredFieldsLabel'>* Обязательные поля</p>
            
            <div className='filesSection'>
                <div onDrop={handleImageDrop} onDragOver={handleDragOver}>
                    <div id='filesSectionTitle'>Обложка для датасета <span className='limitFile'>{formatFileSize(imageSize)} / 100 МБ</span></div>
                    {!image && (
                        <div className='uploadImage'>
                            <img src={uploadIcon}></img>
                            <input type="file" id='chooseImage' className='displayNone' onChange={handleImageAdding} accept="image/*"/>
                            <p className='dropFile'>Перетащите файлы сюда <br/>или <span className='seeFiles' onClick={() => {document.getElementById('chooseImage').click()}}>
                                <br/>выберите JPEG или PNG</span></p>
                        </div>
                    )}
                    {image && (
                        <div id='datasetImageUpload' >
                            <img
                                onMouseEnter={() => setShowDeleteIcon(true)}
                                onMouseLeave={() => setShowDeleteIcon(false)}
                                style={{ filter: showDeleteIcon ? 'brightness(70%)' : 'none' }}
                                src={image}
                                alt="Uploaded cover"
                                id='coverPreviewImage'
                            />
                            {showDeleteIcon && (
                                <img src={deleteIcon} alt='Удалить обложку датасета'
                                    onMouseEnter={() => setShowDeleteIcon(true)}
                                    onMouseLeave={() => setShowDeleteIcon(false)}
                                    id='deleteImageIcon'
                                    onClick={handleDeleteImage}
                                />
                            )}
                        </div>
                    )}
                    
                    {warningImageLimitState && <p className='warning'>Размер обложки превышает лимит</p>}
                    {warningImage && <p className='warning'>Допустимые форматы обложки: JPEG или PNG</p>}
                </div>
                <div>
                        <div id='filesSectionTitle'>
                            Файлы *
                            <button id={uploadFilesChoice ? 'uploadChosen' : 'uploadChoice'} onClick={()=>{setuploadFilesChoice(true)}}>
                                json, csv</button>
                            <p style={{margin: '0'}}>или</p>
                            <button id={uploadFilesChoice ? 'uploadChoice' : 'uploadChosen'} onClick={()=>{setuploadFilesChoice(false)}}>
                                zip</button>
                        </div>
                        <div id='filesPart' onDrop={handleFileDrop} onDragOver={handleDragOver}>
                            {uploadFilesChoice && <div className='uploadFile'>
                                <input type="file" id='chooseFiles' className='displayNone' onChange={handleFileAdding} multiple accept=".json,.csv"/>
                                <img src={uploadIcon} alt=''></img>
                                <p className='dropFile'>Переместите файлы сюда <br/>или <span className='seeFiles' onClick={() => {document.getElementById('chooseFiles').click()}}>
                                    <br/>выберите файлы JSON или CSV</span></p>
                                <div className='limitFile'></div>
                            </div>}

                            {!uploadFilesChoice && <div className='uploadFile' onDrop={handleFileAdding} onDragOver={handleFileAdding}>
                                <input type="file" id='chooseZip' className='displayNone' onChange={handleFileAdding} multiple accept=".zip"/>
                                <img src={uploadIcon} alt=''></img>
                                <p className='dropFile'>Переместите файлы сюда или <span className='seeFiles' onClick={() => {document.getElementById('chooseZip').click()}}>выберите zip</span></p>
                            </div>}

                            <div className='uploadedFilesSection'>
                                <div id='labelUploadedFiles' className='rowSpaceBetween'>
                                    Загружено <span id='folder'>{formatFileSize(totalFileSize)} / 5 ГБ</span>
                                </div>
                                <div className='uploadedFilesContainer'>
                                    {(() => {
                                        if (typeof fileSizes === 'object' && fileSizes !== null) {
                                            return Object.entries(fileSizes).map(([folderName, files], index) => {
                                                if (typeof files === 'object' && files !== null) {
                                                    return (
                                                        <div key={index}>
                                                            <div className='row' style={{marginBottom: '10px', marginLeft: '10px'}}>
                                                                <img width='15px' src={folderDarkIcon} alt="Folder" />
                                                                <p id='folder'>{folderName}:</p>
                                                            </div>
                                                            {Object.entries(files).map(([fileName, fileSize], subIndex) => (
                                                                <UploadedFile 
                                                                    key={subIndex} // Изменено на subIndex
                                                                    fileName={fileName} 
                                                                    fileSize={formatFileSize(fileSize)} 
                                                                    index={subIndex} // Используйте subIndex для уникальности
                                                                    handleDeleteFile={handleDeleteFile} 
                                                                />
                                                            ))}
                                                        </div>
                                                    );
                                                } else {
                                                    return (
                                                        <div key={index}>
                                                            <UploadedFile 
                                                                key={index} 
                                                                fileName={folderName} 
                                                                fileSize={formatFileSize(files)} 
                                                                index={index}
                                                                handleDeleteFile={handleDeleteFile} 
                                                            />
                                                        </div>
                                                    );
                                                }
                                            });
                                        } else {
                                            return <p>No files</p>;
                                        }
                                    })()}
                                </div>
                            </div>
                    </div>
                    {warningFileLimitState && <p className='warning'>Размер загружаемых файлов превышает лимит</p>}
                    {warningInvalidZip && <p className='warning'>ZIP архив должен содержать только JSON или CSV файлы.</p>}
                    {warningZips && <p className='warning'>Вы можете загрузить только один ZIP архив.</p>}
                    {warningFiles && <p className='warning'>Вы можете загрузить только JSON или CSV файлы.</p>}
                    {warningZips && <p className='warning'>Вы можете загрузить только один ZIP архив.</p>}
                    {warningFiles && <p className='warning'>Вы можете загрузить только JSON или CSV файлы.</p>}
                    {warningFilesAndZip && <p className='warning'>Вы можете загрузить JSON, CSV файлы или один ZIP.</p>}
                </div>
            </div>
        </div>
    );
};

export default UploadFilesPart;