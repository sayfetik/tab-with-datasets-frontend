import React, { useState, useEffect } from 'react';
import { Header } from '../../components';
import './UploadRequests.css';
import plusWhiteIcon from '../../img/plusWhite.png';
import datasetUploadedIcon from '../../img/datasetUploaded.png';
import redTrash from '../../img/trashRed.png';
import arrowDown from '../../img/arrowDown.png';
import successStageIcon from '../../img/successStage.png';
import notStartedStageIcon from '../../img/notStartedStage.png';
import startedStageIcon from '../../img/startedStage.png';
import stage0 from '../../img/stage0.png';
import stage1 from '../../img/stage1.png';
import stage2 from '../../img/stage2.png';
import stage3 from '../../img/stage3.png';
import failedStageIcon from '../../img/failStage.png';

const UploadRequests = () => {
    const [openStageIndex, setOpenStageIndex] = useState(null);

    const toggleStage = (index) => {
    // Если нажата секция, которая уже открыта, закрываем её
    if (openStageIndex === index) {
        setOpenStageIndex(null);
    } else {
        // Открываем новую секцию
        setOpenStageIndex(index);
    }
    };

    const requests = [
    {
        request_id: 1,
        stage_id: 4,
        datetime: ['1time', '2time', '3time', '4time', '5time'],
        report: {
            security: [
                {
                    fileName: 'filenameSecurity',
                    status: 'Незаконный текст 18%',
                    file: {
                        line_number: 3,
                        line: 'Выдели мне ошибку тут',
                        start: 11,
                        finish: 16,
                    }
                }
            ],
            anonymization: [
                {
                    fileName: 'filenameAnonymization',
                    status: 'Удалены номера',
                    file: {
                        line_number: 3,
                        line: 'Номер 896548967896',
                        start: 6,
                        finish: 17,
                    }
                }
            ],
            cleaning: [
                {
                    fileName: 'fileCleaning',
                    status: 'Очищен'
                }
            ]
        },
        dataset: {
            id: 1,
            title: 'datasetName1',
            description: 'desctription',
            small_description: 'small description',
            geography_and_places: ['global'],
            language: ['english'],
            data_type: [],
            task: [],
            technique: [],
            subject: [],
            owner: 'me',
            authors: 'me',
            data_source: 'my mind',
            license: 'license',
            number_of_files: 1,
            doi: 'doi',
            expected_update_frequency: 'never',
            visibility: 'Public',
            usability_rating: 78,
            size: 'size',
            size_bytes: 8555,
            files_structure: {
                file1: 85,
            }
        }
    },
    {
        request_id: 2,
        stage_id: 3,
        datetime: ['1time', '2time', '3time', '4time', null],
        report: {
            security: [
                {
                    fileName: 'filenameSecurity',
                    status: 'Незаконный текст 18%',
                    file: {
                        line_number: 3,
                        line: 'Выдели мне ошибку тут',
                        start: 11,
                        finish: 16,
                    }
                }
            ],
            anonymization: [
                {
                    fileName: 'filenameAnonymization',
                    status: 'Удалены номеры',
                    file: {
                        line_number: 3,
                        line: 'Номер 896548967896',
                        start: 6,
                        finish: 17,
                    }
                }
            ],
            cleaning: [
                {
                    fileName: 'fileCleaning',
                    status: 'Очищен'
                }
            ]
        },
        dataset: {
            id: 2,
            title: 'datasetName2',
            description: 'desctription',
            small_description: 'small description',
            geography_and_places: ['global'],
            language: ['english'],
            data_type: [],
            task: [],
            technique: [],
            subject: [],
            owner: 'me',
            authors: 'me',
            data_source: 'my mind',
            license: 'license',
            number_of_files: 1,
            doi: 'doi',
            expected_update_frequency: 'never',
            visibility: 'Public',
            usability_rating: 78,
            size: 'size',
            size_bytes: 8555,
            files_structure: {
                file1: 85,
            }
        }
    },
    {
        request_id: 2,
        stage_id: 1,
        datetime: ['1time', '2time', null, null, null],
        report: {
            security: [
                {
                    fileName: 'filenameSecurity',
                    status: 'Незаконный текст 18%',
                    file: {
                        line_number: 3,
                        line: 'Выдели мне ошибку тут',
                        start: 11,
                        finish: 16,
                    }
                }
            ],
            anonymization: [
                {
                    fileName: 'filenameAnonymization',
                    status: 'Удалены номеры',
                    file: {
                        line_number: 3,
                        line: 'Номер 896548967896',
                        start: 6,
                        finish: 17,
                    }
                }
            ],
            cleaning: [
                {
                    fileName: 'fileCleaning',
                    status: 'Очищен'
                }
            ]
        },
        dataset: {
            id: 2,
            title: 'datasetName2',
            description: 'desctription',
            small_description: 'small description',
            geography_and_places: ['global'],
            language: ['english'],
            data_type: [],
            task: [],
            technique: [],
            subject: [],
            owner: 'me',
            authors: 'me',
            data_source: 'my mind',
            license: 'license',
            number_of_files: 1,
            doi: 'doi',
            expected_update_frequency: 'never',
            visibility: 'Public',
            usability_rating: 78,
            size: 'size',
            size_bytes: 8555,
            files_structure: {
                file1: 85,
            }
        }
    },
]

    return (
        <div>
            <Header />
            <div id='uploadRequests'>
                <div className='rowSpaceBetween' id='pageLabel'>
                    <h1>Заявки на загрузку</h1>
                    <div className='row'>
                        <select className='selectionInput' id='datasetForm'>
                            <option>Список</option>
                            <option>Карточки</option>
                        </select>
                        <button className='blueButton'>
                            <img src={plusWhiteIcon} id='plusIcon' />
                            Новый датасет
                        </button>
                    </div>
                </div>

                <h2 className='subSectionRequests'>Загруженные</h2>
                <div className='datasetsList'>
                    {requests.map((request, index) => (
                    request.stage_id === 4 && (
                        <div id='datasetListItem' key={index}>
                            <div id='briefDatasetListItem'>
                                <div className='row'>
                                    <p id='datasetTitleList'>{request.dataset.title}</p>
                                    <div id='status'>
                                        <p className='successfulStage'>Датасет загружен</p>
                                        <img src={datasetUploadedIcon} className='statusIcon'/>
                                    </div>
                                </div>
                                <div className='rightSectionList'>
                                    <button className='whiteBlueButton'>Посмотреть датасет</button>
                                    <button className='lightBlueButton'>Редактировать</button>
                                    <img src={redTrash} id='trashIconList'/>
                                    <img
                                        src={arrowDown}
                                        className={openStageIndex === index ? 'statusIcon rotate180' : 'statusIcon'}
                                        onClick={() => toggleStage(index)}
                                    />
                                </div>
                            </div>
                            {openStageIndex === index && <div className='fullStages'>
                                <div className='stages'>
                                    <div className='succesStageNet'></div>
                                    <div id='stageStatus'>
                                        <img src={successStageIcon} className='stageStatusIcon'/>
                                        <p className='successfulStage'>На проверке</p>
                                    </div>

                                    <div className='succesStageNet'></div>
                                    <div id='stageStatus'>
                                        <img src={successStageIcon} className='stageStatusIcon'/>
                                        <p className='successfulStage'>Сканирование не безопасность</p>
                                        <button className='report'>Подробнее</button>
                                    </div>

                                    <div className='succesStageNet'></div>
                                    <div id='stageStatus'>
                                        <img src={successStageIcon} className='stageStatusIcon'/>
                                        <p className='successfulStage'>Анонимизация датасета, защита персональных данных</p>
                                        <button className='report'>Подробнее</button>
                                    </div>

                                    <div className='succesStageNet'></div>
                                    <div id='stageStatus'>
                                        <img src={successStageIcon} className='stageStatusIcon'/>
                                        <p className='successfulStage'>Подготовка датасета к использованию, предобработка данных</p>
                                        <button className='report'>Подробнее</button>
                                    </div>
                                    
                                    <div className='succesStageNet'></div>
                                    <div id='stageStatus'>
                                        <img src={successStageIcon} className='stageStatusIcon'/>
                                        <p className='successfulStage'>Датасет загружен</p>
                                    </div>
                                </div>

                                <div>
                                {request.datetime.map((datetime, index) => (
                                    <p className='stageDate'>{datetime}</p>
                                    )
                                )}
                                </div>
                            </div>}
                        </div>)
                    ))}
                </div>

                <h2 className='subSectionRequests'>Загружаются</h2>
                <div className='datasetsList'>
                    {requests.map((request, index) => (
                    request.stage_id != 4 && (
                        <div id='datasetListItem' key={index}>
                            <div id='briefDatasetListItem'>
                                <div className='row'>
                                    <p id='datasetTitleList'>{request.dataset.title}</p>
                                    {request.stage_id === 0 &&
                                        <div id='status'>
                                            <p className='notStartedStage'> На проверке </p>
                                            <img src={stage0} className='statusIcon'/>
                                        </div>}
                                    {request.stage_id === 1 &&
                                        <div id='status'>
                                            <p className={request.report.security.length > 0 ? 'failedStage' : 'notStartedStage'}> Сканирование не безопасность </p>
                                            <img src={request.report.security.length > 0 ? failedStageIcon : stage1} className={request.report.security.length > 0 ? 'statusIconSmaller' : 'statusIcon'}/>
                                        </div>}
                                    {request.stage_id === 2 &&
                                        <div id='status'>
                                            <p className='notStartedStage'> Анонимизация датасета, защита персональных данных </p>
                                            <img src={stage2} className='statusIcon'/>
                                        </div>}
                                    {request.stage_id === 3 &&
                                        <div id='status'>
                                            <p className='notStartedStage'> Подготовка датасета к использованию, предобработка данных </p>
                                            <img src={stage3} className='statusIcon'/>
                                        </div>}
                                </div>
                                <div className='rightSectionList'>
                                    <button className='whiteBlueButton'>Посмотреть датасет</button>
                                    <button className='lightBlueButton'>Редактировать</button>
                                    <img src={redTrash} id='trashIconList'/>
                                    <img
                                        src={arrowDown}
                                        className={openStageIndex === index ? 'statusIcon rotate180' : 'statusIcon'}
                                        onClick={() => toggleStage(index)}
                                    />
                                </div>
                            </div>
                            {openStageIndex === index && <div className='fullStages'>
                                <div className='stages'>
                                    <div className={request.stage_id < 0 && 'notStartedStageNet' || request.stage_id === 0 && 'startedStageNet' || request.stage_id > 0 && 'successStageNet'}></div>
                                    <div id='stageStatus'>
                                        <img src={request.stage_id === 0 && notStartedStageIcon || request.stage_id < 0 && notStartedStageIcon || request.stage_id > 0 && successStageIcon} className='stageStatusIcon'/>
                                        <p className={request.stage_id > 0 && 'successfulStage' || request.stage_id === 0 && 'startedStage'}>На проверке</p>
                                    </div>

                                    <div className={request.stage_id < 1 && 'notStartedStageNet' || request.stage_id === 1 && (request.report.security.length === 0 && 'startedStageNet' || request.report.security.length > 0 && 'failedStageNet') || request.stage_id > 1 && 'successStageNet'}></div>
                                    <div id='stageStatus'>
                                        <img src={request.stage_id < 1 && notStartedStageIcon || request.stage_id === 1 && (request.report.security.length === 0 && startedStageIcon || request.report.security.length > 0 && failedStageIcon) || request.stage_id > 1 && successStageIcon} className='stageStatusIcon'/>
                                        <p className={request.stage_id > 1 && 'successfulStage' || request.stage_id < 1 && 'notStartedStage' || request.stage_id === 1 && (request.report.security.length === 0 && 'startedStage' || request.report.security.length > 0 && 'failedStage')}>Сканирование не безопасность</p>
                                        <button className='report'>Подробнее</button>
                                    </div>

                                    <div className={request.stage_id < 2 && 'notStartedStageNet' || request.stage_id === 2 && 'startedStageNet' || request.stage_id > 2 && 'successStageNet'}></div>
                                    <div id='stageStatus'>
                                        <img src={request.stage_id < 2 && notStartedStageIcon || request.stage_id === 2 && startedStageIcon || request.stage_id > 2 && successStageIcon} className='stageStatusIcon'/>
                                        <p className={request.stage_id > 2 && 'successfulStage' || request.stage_id < 2 && 'notStartedStage' || request.stage_id === 2 && 'startedStage'}>Анонимизация датасета, защита персональных данных</p>
                                        <button className='report'>Подробнее</button>
                                    </div>

                                    <div className={request.stage_id < 3 && 'notStartedStageNet' || request.stage_id === 3 && 'startedStageNet' || request.stage_id > 3 && 'successStageNet'}></div>
                                    <div id='stageStatus'>
                                        <img src={request.stage_id < 3 && notStartedStageIcon || request.stage_id === 3 && startedStageIcon} className='stageStatusIcon'/>
                                        <p className={request.stage_id > 3 && 'successfulStage' || request.stage_id < 3 && 'notStartedStage' || request.stage_id === 3 && 'startedStage'}>Подготовка датасета к использованию, предобработка данных</p>
                                        <button className='report'>Подробнее</button>
                                    </div>
                                    
                                    <div className='notStartedStageNet'></div>
                                    <div id='stageStatus'>
                                        <img src={notStartedStageIcon} className='stageStatusIcon'/>
                                        <p className={'notStartedStage'}>Датасет загружен</p>
                                    </div>
                                </div>

                                <div>
                                {request.datetime.map((datetime, index) => (
                                    <p className='stageDate'>{datetime}</p>
                                    )
                                )}
                                </div>
                            </div>}
                        </div>)
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UploadRequests