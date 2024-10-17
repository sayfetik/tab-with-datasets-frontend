import {React, useEffect, useState } from 'react';
import './Download.css';
import downloadBlue from '../../img/downloadBlue.png';
import downloadPurple from '../../img/downloadPurple.png';
import blueLoading from '../../img/blueLoadingLine.gif';
import purpleLoading from '../../img/purpleLoadingLine.gif';
import { ProccessStages, BackendConnector } from '..';

const Download = ({ isOpen, onClose, id }) => {
  const [loadingBase, setloadingBase] = useState(false);
  const [loadingAdvanced, setloadingAdvanced] = useState(false);
  const [errorBase, seterrorBase] = useState(false);
  const [errorAdvanced, seterrorAdvanced] = useState(false);

  useEffect(()=>{
    seterrorBase(false);
    seterrorAdvanced(false);
  })

  if (!isOpen) {
    return null;
  }

  const handleDownloadInitialDsClick = async () => {
    setloadingBase(true);
    try {
        const blob = await BackendConnector.download_initial_dataset(id);
        if (blob) {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'dataset_base.zip'); // Specify the filename here
          document.body.appendChild(link);
          link.click();
          link.remove();
        }
    } catch (error) {
      seterrorBase(true);
      console.error('Error downloading file:', error);
    }
    setloadingBase(false);
};

const handleDownloadCleanedDsClick = async () => {
  try {
    setloadingAdvanced(true);
    const blob = await BackendConnector.download_cleaned_dataset(id);
    if (blob) {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'dataset_cleaned.zip'); // Specify the filename here
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  } catch (error) {
    console.error('Error downloading file:', error);
    seterrorAdvanced(true);
  }
  setloadingAdvanced(false);
};

  return (
    <div className="modal-overlay">
      <div className="modal-content-download">
          <div className="modal-header-download">
            <button className="modal-close-button" onClick={onClose}>&times;</button>
          </div>
          <div id='modalWindowDownload'>
                <div style={{marginRight: '50px'}}>
                  <div className='row typeDatasetLabel'>
                    <img src={downloadBlue} className='downloadDatasetIcon' alt=''/>
                    <p id='datasetBaseClean'>Датасет с базовой обработкой</p>
                  </div>
                  <ProccessStages isBase={true}/>
                  <div className='center' style={{marginTop: '30px'}}>
                    <button className='lightBlueButton' id='downloadDataset' onClick={handleDownloadInitialDsClick}>Скачать</button>
                    {loadingBase && <img src={blueLoading} width='30px' height='30px' alt=''/>}
                  </div>
                  {errorBase && <p className='warning'>Произошла ошибка. Повторите попытку позже</p>}
                </div>

                <div>
                  <div className='row typeDatasetLabel'>
                    <img src={downloadPurple} className='downloadDatasetIcon' alt=''/>
                    <p id='datasetAdvanced'>Датасет с продвинутой обработкой</p>
                  </div>
                  <ProccessStages isBase={false}/>
                  <div className='center' style={{marginTop: '30px'}}>
                    <button className='lightPurpleButton' id='downloadDataset' onClick={handleDownloadCleanedDsClick}>Скачать</button>
                    {loadingAdvanced && <img src={purpleLoading} width='30px' height='30px' alt=''/>}
                  </div>
                  {errorAdvanced && <p className='warning'>Произошла ошибка. Повторите попытку позже</p>}
                </div>
              </div>
          <div>
        </div>
      </div>
    </div>
  );
}

export default Download;
