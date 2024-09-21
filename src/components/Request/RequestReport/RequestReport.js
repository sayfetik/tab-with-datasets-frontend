import React, { useState } from 'react';
import back from '../../../img/back.png';
import Icon from '../../Icon/Icon';
import './RequestReport.css';

const RequestReport = ({ isOpen, onClose, report, warning, label }) => {
    const [isFileOpen, setIsFileOpen] = useState(null); // Используем null для отслеживания открытого файла

    const closeWindow = () => {
        onClose();
        setIsFileOpen(null); // Сбрасываем состояние при закрытии окна
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            {isFileOpen === null && 
            <div className="reportWindow">
                <div className="reportHeader">
                    <h3 id='reportLabel'>{label}</h3>
                    <button className="report-close-button" onClick={closeWindow}>&times;</button>
                </div>

                {/* Отображаем список файлов, если нет открытого файла */}
                {Object.keys(report).map((filename, index) => (
                    <div className='row reportFile' key={filename}>
                        <p id='reportFileName'>{filename}</p>
                        <button className='showReportButton' id='showFile' onClick={() => setIsFileOpen(filename)}>
                            Подробнее
                        </button>
                    </div>
                ))}

                {warning && 
                    <div id='warningButtons'>
                        <button className='lightBlueButton'>Игнорировать нарушения</button>
                        <button className='lightRedButton'>Отклонить заявку</button>
                    </div>}
            </div>}
            
            {/* Отображаем содержимое открытого файла */}
            {isFileOpen && (
                <div className="reportWindow">
                    <div className='rowSpaceBetween' style={{ marginBottom: '15px' }}>
                        <button className='row' id='backToFiles' style={{ marginBottom: '5px' }} onClick={() => setIsFileOpen(null)}>
                            <Icon image={back} />
                            <p id='backToFilesButtonLabel'>Назад</p>
                        </button>
                        <button className="report-close-button" onClick={closeWindow}>&times;</button>
                    </div>

                    {/* Отображаем содержимое открытого файла */}
                    <div>
                        <p id='reportFileName' style={{marginBottom: '10px'}}>{isFileOpen}</p>
                        {report[isFileOpen].map((item, index) => (
                            <div className='row' key={index} style={{marginBottom: '10px'}}>
                                <p className='line'>{item.suspicious_fragment}</p>
                                <p className='in_progress' style={{ display: 'inline', marginLeft: '8px' }}>{item.reason}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default RequestReport;
