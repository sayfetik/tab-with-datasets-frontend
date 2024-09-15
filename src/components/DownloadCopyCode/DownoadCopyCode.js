import { React, useEffect, useState } from 'react';
import './DownloadCopyCode.css';
import helpBlue from '../../img/helpBlue.png';
import helpPurple from '../../img/helpPurple.png';
import { BackendConnector, ProccessStages } from '..';

const DownloadCopyCode = ({ isOpen, onClose, id }) => {
    const [initialCode, setinitialCode] = useState('Произошла ошибка. Повторите попытку позже');
    const [cleanedCode, setcleanedCode] = useState('Произошла ошибка. Повторите попытку позже');
    const [isCopiedInitialCode, setisCopiedInitialCode] = useState(false);
    const [isCopiedCleanedCode, setisCopiedCleanedCode] = useState(false);
    const [showTooltipBlue, setShowTooltipBlue] = useState(false);
    const [showTooltipPurple, setShowTooltipPurple] = useState(false);
    const [errorBaseCode, seterrorBaseCode] = useState(false);
    const [errorCleanedCode, seterrorCleanedCode] = useState(false);

    useEffect(()=>{
        seterrorBaseCode(false);
        seterrorCleanedCode(false);
    })

    useEffect(() => {
        const getCleanedInitialCode = async () => {
            try {
                const data = await BackendConnector.download_code_initial_dataset(id);
                setinitialCode(formatCode(data));
            } catch (error) {
                seterrorBaseCode(true);
                console.error('Error downloading file:', error);
            }
        };

        const getCleanedCleanedCode = async () => {
            try {
                const data = await BackendConnector.download_code_cleaned_dataset(id);
                setcleanedCode(formatCode(data));
            } catch (error) {
                seterrorCleanedCode(true);
                console.error('Error downloading file:', error);
            }
        };

        getCleanedInitialCode();
        getCleanedCleanedCode();
    }, [id]);

    const formatCode = (code) => {
        const lines = code.split('\n');
        return lines.slice(1, -1).join('\n');
    };

    const copyInitialCode = () => {
        navigator.clipboard.writeText(initialCode);
        setisCopiedInitialCode(true);
    };

    const copyCleanedCode = () => {
        navigator.clipboard.writeText(cleanedCode);
        setisCopiedCleanedCode(true);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content-copy-code">
                <div className="modal-header">
                    <h3>Скопировать код для скачивания</h3>
                    <button className="modal-close-button" onClick={onClose}>&times;</button>
                </div>
                <div className='row'>
                    <div style={{ marginRight: '50px' }}>
                        <div className='codeLabel'>
                            <div className='row'>
                                <p id='datasetBaseClean'>Датасет с базовой обработкой</p>
                                <img 
                                    src={helpBlue} 
                                    width='20px' 
                                    height='20px' 
                                    style={{ marginLeft: '10px' }} 
                                    alt='' 
                                    onMouseEnter={() => setShowTooltipBlue(true)} 
                                    onMouseLeave={() => setShowTooltipBlue(false)} 
                                />
                                {showTooltipBlue && (
                                    <div className="tooltip"><ProccessStages isBase={true}/></div>
                                )}
                            </div>
                            {!isCopiedInitialCode ?
                                <button className='whiteBlueButton' onClick={copyInitialCode}>Копировать код</button>
                                :
                                <button className='blueButton' style={{ padding: '4px 15px' }} onClick={copyInitialCode}>Код скопирован!</button>
                            }
                        </div>
                        <pre id='blueCode'>{initialCode}</pre>
                    </div>

                    <div>
                        <div className='codeLabel'>
                            <div className='row'>
                                <p id='datasetAdvanced'>Датасет с продвинутой обработкой</p>
                                <img 
                                    src={helpPurple} 
                                    width='20px' 
                                    height='20px' 
                                    style={{ marginLeft: '10px', marginRight: '10px' }} 
                                    alt='' 
                                    onMouseEnter={() => setShowTooltipPurple(true)} 
                                    onMouseLeave={() => setShowTooltipPurple(false)} 
                                />
                                {showTooltipPurple && (
                                    <div className="tooltip"><ProccessStages isBase={false}/></div>
                                )}
                            </div>
                            {!isCopiedCleanedCode ?
                                <button className='whitePurpleButton' style={{ margin: '0px' }} onClick={copyCleanedCode}>Копировать код</button>
                                :
                                <button className='purpleButton' style={{ margin: '0px', padding: '4px 11.5px' }} onClick={copyCleanedCode}>Код скопирован!</button>
                            }
                        </div>
                        <pre id='purpleCode'>{cleanedCode}</pre>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DownloadCopyCode;