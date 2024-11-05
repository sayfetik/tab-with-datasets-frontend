import React from 'react';
import folderDarkIcon from '../../img/folderDark.png';
import './Files.css';

const Files = ({ filesStructure }) => {
    // Рекурсивная функция для отображения файлов и папок
    const renderFiles = (files, path = '', isRoot = false) => {
        return Object.entries(files).map(([name, value], index) => {
            const currentPath = `${path}${name}/`; // Формируем текущий путь

            if (typeof value === 'object' && value !== null) {
                // Если это папка, рендерим её содержимое рекурсивно
                return (
                    <div key={index} id={isRoot ? 'folder' : 'fileInFolder'}>
                        <div className='row folderMargin'>
                            <img id="folderIcon" src={folderDarkIcon} alt="Folder" />
                            <p id='folderName'>{name}</p>
                        </div>
                        <div className='subfolder'>
                            {renderFiles(value, currentPath)} {/* Рекурсивный вызов */}
                        </div>
                    </div>
                );
            } else {
                // Если это файл, рендерим его
                return (
                    <div key={index} className='file' id={isRoot ? 'file' : 'fileInFolder'}>
                        <p className='fileDownload'>{name} - {formatFileSize(value)}</p>
                    </div>
                );
            }
        });
    };

    return (
        <div className='files'>
            {typeof filesStructure === 'object' && filesStructure !== null ? (
                renderFiles(filesStructure, '', true) // Начинаем рендеринг с корневой структуры файлов
            ) : (
                <p className='author'>Файлов нет</p>
            )}
        </div>
    );
};

// Функция для форматирования размера файла
const formatFileSize = (size) => {
    if (size === 0) return '0 Б';
    const sizes = ['Б', 'КБ', 'МБ', 'ГБ'];
    const i = Math.floor(Math.log(size) / Math.log(1024));
    const formattedSize = (size / Math.pow(1024, i)).toFixed(2);
    return `${formattedSize} ${sizes[i]}`;
};

export default Files;