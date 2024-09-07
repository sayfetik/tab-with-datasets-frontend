import React, { useState } from 'react';
import back from '../../../img/back.png';
import Icon from '../../Icon/Icon';
import './RequestReport.css'

const RequestReport = ({ isOpen, onClose, report, warning, label }) => {
    const [isFileOpen, setIsFileOpen] = useState(-1); // Track the open file

    const closeWindow = () => {
        onClose();
    };

    if (!isOpen) {
        return null;
    }

    const getData = (str) => {
        switch (str) {
            case '[NAME]': return 'имена';
            case '[PLACE OF WORK]': return 'места работы';
            case '[PHONE]': return 'номера телефонов';
            case '[EMAIL]': return 'адреса электронных почт';
            case '[OTHER]': return 'персональные данные';
            case '[LOCATION]': return 'местоположения';
            default: return str; // Return the original string if no match
        }
    }

    const formatReport = (report) => {
        if (!report || Object.keys(report).length === 0) return '';

        return Object.keys(report).map((filename) => {
            return (
                <div className='row reportFile' key={filename}>
                    <p id='reportFileName'>{filename}</p>
                    <p className='not_started'>
                        Удалены {report[filename].map(item => getData(item)).join(', ')}
                    </p>
                </div>
            );
        });
    };

    return (
        <div className="modal-overlay">
            {isFileOpen === -1 && 
            <div className="reportWindow">
                <div className="reportHeader">
                    <h3 id='reportLabel'>{label}</h3>
                    <button className="report-close-button" onClick={closeWindow}>&times;</button>
                </div>
                <div className='scroll'>{formatReport(report)}</div>

                {warning && 
                    <div id='warningButtons'>
                        <button className='lightBlueButton'>Игнорировать нарушения</button>
                        <button className='lightRedButton'>Отклонить заявку</button>
                    </div>}
            </div>}
            {/* Display the content of the opened file */}
            {isFileOpen !== -1 && (
                <div className="reportWindow">
                    <div className='rowSpaceBetween' style={{ marginBottom: '15px' }}>
                        <button className='row' id='backToFiles' style={{ marginBottom: '5px' }} onClick={() => setIsFileOpen(-1)}>
                            <Icon image={back} />
                            <p id='backToFilesButtonLabel'>Назад</p>
                        </button>
                        <button className="report-close-button" onClick={closeWindow}>&times;</button>
                    </div>

                    <div className='scroll'>
                        {/* Display the content of the opened file */}
                        {Object.keys(report[isFileOpen]).map((filename) => (
                            <div key={filename}>
                                <p id='reportFileName' style={{ marginBottom: '20px' }}>{filename}</p>
                                {report[isFileOpen][filename].map((item, index) => (
                                    <div className='row' key={index} style={{ marginBottom: '15px' }}>
                                        <p className='line'>{item.suspicious_fragment}</p>
                                        <p className='failed' style={{ display: 'inline', marginLeft: '8px' }}>{item.reason}</p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default RequestReport;