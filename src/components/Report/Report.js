import React, { useState } from 'react';
import './Report.css';
import { AutoResizeTextarea } from '../../components';
import { MultiSelect } from '@mantine/core';
import { MantineProvider } from '@mantine/core';

const Report = ({isOpen, onClose}) => {
    const [filesViolations, setfilesViolations] = useState([]);
    const [imageReport, setimageReport] = useState('');
    const [comment, setcomment] = useState('');

    if (!isOpen) {
        return null;
    }

    const violations = [
        "Упоминание запрещённой организации",
        "Политическое сообщение",
        "Неэтичный текст",
        "Незаконный текст",
        "Несоответствие ожидаемой смысловой нагрузке"
    ]

  return (
    <MantineProvider>
    <div className="modal-overlay">
      <div className="modal-content modal-report">
        <div className="modal-header">
            <h3>Репорт о нарушении</h3>
            <button className="modal-close-button" onClick={onClose}>&times;</button>
        </div>
        <div>
            <div className='reportField'>
                <p className='reportLabel'>Обложка</p>
                <AutoResizeTextarea length="400px" placeholder="Опишите нарушение" value={imageReport} setValue={setimageReport} label='' textLimit={0}/>
            </div>
            <div className='reportField'>
                <p className='reportLabel'>Файлы</p>
                <MultiSelect
                    size='lg'
                    classNames={{input: 'multiselectInput', pill: 'multiselectPill', option: 'multiselectOption', dropdown: 'multiselectDropdown' }}
                    placeholder="Выберите нарушение"
                    data={violations}
                    searchable
                    radius={10}
                    value={filesViolations} onChange={setfilesViolations}
                    nothingFoundMessage="Nothing found..."
                    hidePickedOptions
                    className='multiselect'
                    comboboxProps={{ width: 460, zIndex: 1000, middlewares: { flip: false, shift: false }, offset: 0 }}
                />
            </div>
            <div className='reportField'>
                <p className='reportLabel'>Другое</p>
                <AutoResizeTextarea length="400px" placeholder="Опишите нарушение" value={imageReport} setValue={setimageReport} label='' textLimit={0}/>
            </div>
            <div className='reportField'>
                <p className='reportLabel'>Комментарий</p>
                <AutoResizeTextarea height='150px' length="400px" placeholder="Опишите проблему" value={comment} setValue={setcomment} label='' textLimit={0}/>
            </div>
        </div>

        <div className='reportButtons'>
            <button className='whiteBlueButton' id='submitReportButton'>Отменить</button>
            <button className='lightBlueButton' id='submitReportButton'>Отправить</button>
        </div>
      </div>
    </div>
    </MantineProvider>
  );
}

export default Report;
