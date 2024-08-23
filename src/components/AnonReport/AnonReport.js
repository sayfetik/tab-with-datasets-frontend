import React, { useState } from 'react';
import back from '../../img/back.png';
import Icon from '../Icon/Icon';
import './Anon.css';

const AnonReport = ({ isOpen, onClose, report, warning}) => {

    const getData = (str) => {
        if (str === '[NAME]') return 'имена';
        else if (str === '[PLACE OF WORK]') return 'места работы';
        else if (str === '[PHONE]') return 'номера телефонов';
        else if (str === '[EMAIL]') return 'адреса электронных почт';
        else if (str === '[OTHER]') return 'персональные данные';
    }

    const closeWindow = () => {
        onClose();
    };

    const formatReport = (report) => {
        if (report.length === 0) return '';

        const formattedReport = report.map(filename => getData(filename)).flat();;

        if (formattedReport.length === 1) {
            return formattedReport[0] + '.';
        }

        const lastElement = formattedReport.pop();
        const secondLastElement = formattedReport.pop();

        return formattedReport.join(', ') + `, ${secondLastElement} и ${lastElement}.`;
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="reportWindow">
                <div className="reportHeader">
                    <p id='reportFileName'> Удалены {formatReport(report)}</p>
                    <button className="report-close-button" onClick={closeWindow}>&times;</button>
                </div>

            </div>
        </div>
    );
}

export default AnonReport;