import React, { useState, useEffect } from 'react'
import { DatasetCard, Back, Header, Filters, BackendConnector, Alert } from '../../components'
import './Datasets.css'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import searchIcon from '../../img/search.png'
import _ from 'lodash';
import { IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

const Datasets = ({addToHistory, back}) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const navigate = useNavigate();
    const [sortedData, setSortedData] = useState([]);
    const [selectedOption, setSelectedOption] = useState('byRelevance');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [datasets, setDatasets] = useState([]);
    
    const [searchString, setSearchString] = useState(queryParams.get('searchString') || '');
    const [geography_and_places, setGeography] = useState(queryParams.get('geography_and_places') ? queryParams.get('geography_and_places').split(',') : []);
    const [language, setLanguage] = useState(queryParams.get('language') ? queryParams.get('language').split(',') : []);
    const [data_type, setData_type] = useState(queryParams.get('data_type') ? queryParams.get('data_type').split(',') : []);
    const [task, setTask] = useState(queryParams.get('task') ? queryParams.get('task').split(',') : []);
    const [technique, setTechnique] = useState(queryParams.get('technique') ? queryParams.get('technique').split(',') : []);
    const [subject, setSubject] = useState(queryParams.get('subject') ? queryParams.get('subject').split(',') : []);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const newSearchString = queryParams.get('searchString') || '';
        const newGeography = queryParams.get('geography_and_places') ? queryParams.get('geography_and_places').split(',') : [];
        const newLanguage = queryParams.get('language') ? queryParams.get('language').split(',') : [];
        const newDataType = queryParams.get('data_type') ? queryParams.get('data_type').split(',') : [];
        const newTask = queryParams.get('task') ? queryParams.get('task').split(',') : [];
        const newTechnique = queryParams.get('technique') ? queryParams.get('technique').split(',') : [];
        const newSubject = queryParams.get('subject') ? queryParams.get('subject').split(',') : [];
    
        setSearchString(newSearchString);
        setGeography(newGeography);
        setLanguage(newLanguage);
        setData_type(newDataType);
        setTask(newTask);
        setTechnique(newTechnique);
        setSubject(newSubject);
        document.title = `Поиск: ${newSearchString}`;
        search();
    }, [location.search]);

    const [warningSearch, setwarningSearch] = useState(false);
    const [alertState, setalertState] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [noDatasets, setnoDatasets] = useState(false);
    const [blueButton, setblueButton] = useState('');
    const [lightBlueButton, setlightBlueButton] = useState('');

    const handleClick = async (e) => {
        if (e?.preventDefault) e.preventDefault();
        if (!(searchString.length > 0 || geography_and_places.length > 0 || language.length > 0 || data_type.length > 0 || task.length > 0 || technique.length > 0 || subject.length > 0)) {
            setwarningSearch(true);
            return;
        }
        
        const queryParams = new URLSearchParams({
            searchString: searchString,
            geography_and_places: geography_and_places.join(','),
            language: language.join(','),
            data_type: data_type.join(','),
            task: task.join(','),
            technique: technique.join(','),
            subject: subject.join(',')
        }).toString();
        addToHistory(`/datasets/${queryParams}`);
        navigate(`/datasets?${queryParams}`);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') handleClick(event);
    };

    const search = async (e) => {
        if (e) e.preventDefault();
        setnoDatasets(false);
        try {
            const filters = {
                geography_and_places: geography_and_places,
                language: language,
                data_type: data_type,
                task: task,
                technique: technique,
                subject: subject
            };

            const data = await BackendConnector.search(searchString, filters, 100);

            if (data && data.length > 0) {
                setDatasets(data);
                setSortedData(data);
            } else setnoDatasets(true);
        } catch (error) {
            setalertState(true);
            setErrorMessage(error);
            setblueButton('Подождать')
            setlightBlueButton('Попробовать ещё раз');
        }
    };

    useEffect(() => {
        let sorted = [...datasets];
        switch (selectedOption) {
            case 'byRating':
                sorted = _.orderBy(datasets, ['rating'], ['desc']);
                break;
            case 'largeFirst':
                sorted = _.orderBy(datasets, ['size_bytes'], ['desc']);
                break;
            case 'smallFirst':
                sorted = _.orderBy(datasets, ['size_bytes'], ['asc']);
                break;
            default:
                sorted = [...datasets];
        }
        setSortedData(sorted);
    }, [datasets, selectedOption]);
    

    return (
        <div id='datasets'>
            <Back back={back}/>
            <div className='searchFiltersSort'>
                <form id='inputSearchDatasets' onSubmit={handleClick} onKeyDown={handleKeyDown}>
                    <input
                        style={{width: '90%'}}
                        type='text'
                        id={warningSearch ? 'wrongInput' : 'correctInput'}
                        placeholder='Поиск по каталогу датасетов'
                        value={warningSearch? 'Введите запрос в поле или укажите фильтры' : searchString}
                        onChange={(e) => setSearchString(e.target.value)}
                        onClick={()=>{setwarningSearch(false)}}
                    />
                    <div id='filterIcon'>
                        <IconButton aria-controls="filter-menu" aria-haspopup="true" onClick={() => setIsModalOpen(true)}><FilterListIcon /></IconButton>
                    </div>
                    <Filters
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        geography_and_places={geography_and_places}
                        setGeography={setGeography}
                        language={language}
                        setLanguage={setLanguage}
                        data_type={data_type}
                        setData_type={setData_type}
                        task={task}
                        setTask={setTask}
                        technique={technique}
                        setTechnique={setTechnique}
                        subject={subject}
                        setSubject={setSubject}
                        applyChanges={handleClick}
                        />
                        <select className="selectionInput" id='sort' value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                            <option value="byRelevance">По релевантности</option>
                            <option value="byRating">По рейтингу</option>
                            <option value="largeFirst">Сначала большие</option>
                            <option value="smallFirst">Сначала маленькие</option>
                        </select>
                    <button type='submit' id='searchButton'>Найти</button>
                    <button type='submit' id='searchIcon'><img id='searchIcon' src={searchIcon} alt='search'/></button>
                </form>
                <Alert message={"Ошибка: " + errorMessage} blueButton={blueButton} blueButtonFunc={()=>{setalertState(false)}} lightBlueButtonFunc={()=>{handleClick()}} lightBlueButton={lightBlueButton} isOpen={alertState} onClose={()=>{setalertState(false)}}/>
            </div>
            <div id='cardsContainer'>
                {!noDatasets ?
                    <div id='cards'>
                        {sortedData.map(dataset => (
                            <DatasetCard
                                key={dataset.id}
                                id={dataset.id}
                                title={dataset.title}
                                authors={dataset.authors}
                                numberOfFiles={dataset.number_of_files}
                                lastChangeDate={dataset.last_change_date}
                                downloadsNumber={dataset.downloads_number}
                                size={dataset.size}
                                smallDescription={dataset.small_description}
                                addToHistory={addToHistory}
                            />))}
                    </div>
                    :
                    <h3>Ничего не удалось найти по Вашему запросу</h3>
                }
            </div>
        </div>
    );
}

export default Datasets;