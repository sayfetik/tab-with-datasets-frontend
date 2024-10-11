import React, { useState } from 'react';
import { AutoResizeTextarea } from '.';

const InputMetadata = ({
    titleOfDataset,
    setTitleOfDataset,
    visibility,
    setVisibility,
    authors,
    setAuthors,
    dataSource,
    setDataSource,
    expectedUpdateFrequency,
    setExpectedUpdateFrequency,
    license,
    setLicense,
    doi,
    setDoi,
    titleLimit,
    authorsLimit,
    sourceLimit,
    doiLimit
}) => {
    const [warningDoi, setwarningDoi] = useState(false);

    const handleDoiChange = (value) => {
        setwarningDoi(false)
        setDoi(value);
        if (value && !value.startsWith('https://doi.org/')) setwarningDoi(true);
    };

    return (
        <div>
            <AutoResizeTextarea
                length='80%'
                label="Название *"
                placeholder="Введите название"
                value={titleOfDataset}
                setValue={setTitleOfDataset}
                textLimit={titleLimit}
            />
            <div className='metadataLabel'>Видимость *</div>
            <select className="selectionInput" style={{width: '80%'}} value={visibility} onChange={(e) => setVisibility(e.target.value)}>
                <option value="private">Приватный</option>
                <option value="public">Публичный</option>
            </select>
            <AutoResizeTextarea
                label="Авторы"
                length='80%'
                placeholder="Введите автора"
                value={authors}
                setValue={setAuthors}
                textLimit={authorsLimit}
            />
            <AutoResizeTextarea
                label="Источник"
                length='80%'
                placeholder="Введите источник"
                value={dataSource}
                setValue={setDataSource}
                textLimit={sourceLimit}
            />
            <div className='metadataLabel'>Частота обновлений</div>
            <select value={expectedUpdateFrequency} style={{width: '80%'}} onChange={(e) => setExpectedUpdateFrequency(e.target.value)} className="selectionInput">
                <option value="never">Никогда</option>
                <option value="onceWeek">Раз в неделю</option>
                <option value="twiceWeek">2 раза в неделю</option>
                <option value="threeAWeek">3 раза в неделю</option>
                <option value="onceMonth">Раз в месяц</option>
                <option value="twiceMonth">2 раза в месяц</option>
                <option value="threeAMonth">3 раза в месяц</option>
                <option value="onceYear">Раз в год</option>
                <option value="twiceYear">2 раза в год</option>
                <option value="threeAYear">3 раза в год</option>
                <option value="fourAYear">4 раза в год</option>
            </select>
            
            <div className='metadataLabel'>Лицензия</div>
            <select value={license} style={{width: '80%'}} onChange={(e) => setLicense(e.target.value)} className="selectionInput">
                <option value="Public Domain">Public Domain Mark - Public Domain</option>
                <option value="PDDL">Open Data Commons Public Domain Dedication and License - PDDL</option>
                <option value="CC-BY">Creative Commons Attribution 4.0 International CC-BY</option>
                <option value="CDLA Permissive-2.0">Community Data License Agreement – CDLA Permissive-2.0</option>
                <option value="ODC-BY">Open Data Commons Attribution License - ODC-BY</option>
                <option value="CC-BY-SA">Creative Commons Attribution-ShareAlike 4.0 International - CC-BY-SA</option>
                <option value="CDLA-Sharing-1.0">Community Data License Agreement – CDLA-Sharing-1.0</option>
                <option value="ODC-ODbL">Open Data Commons Open Database License - ODC-ODbL</option>
                <option value="Creative Commons Public Domain Dedication">Creative Commons Public Domain Dedication</option>
                <option value="CC BY-NC">Creative Commons Attribution-NonCommercial 4.0 International - CC BY-NC</option>
                <option value="CC BY-NC-SA">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International - CC BY-NC-SA</option>
                <option value="ODC-ODbL">Open Data Commons Open Database License - ODC-ODbL</option>
                <option value="Additional License Coverage Options">Additional License Coverage Options</option>
                <option value="No license specified">No license specified</option>
            </select>
            <AutoResizeTextarea
                length='80%'
                label="DOI"
                placeholder="Укажите doi"
                value={doi}
                setValue={handleDoiChange}
                textLimit={doiLimit}
            />
            {warningDoi && <p className='warning'>DOI должен содержать https://doi.org/</p>}
        </div>
    );
};

export default InputMetadata;