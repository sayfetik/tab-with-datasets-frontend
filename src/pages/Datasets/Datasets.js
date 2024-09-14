import React, { useState, useEffect } from 'react'
import { DatasetCard, Back, Header, Filters, BackendConnector, Alert } from '../../components'
import './Datasets.css'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import searchIcon from '../../img/search.png'
import _ from 'lodash';
import { IconButton } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

const Datasets = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const {
        searchString: searchQuery,
        geography_and_places: initialGeography,
        language: initialLanguage,
        data_type: initialDataType,
        task: initialTask,
        technique: initialTechnique,
        subject: initialSubject,
    } = state;
    const [datasets, setDatasets] = useState([]);
    const [searchString, setSearchString] = useState(searchQuery || '');
    const [sortedData, setSortedData] = useState([]);
    const [selectedOption, setSelectedOption] = useState('byRelevance');
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [geography_and_places, setGeography] = useState(initialGeography || []);
    const [language, setLanguage] = useState(initialLanguage || []);
    const [data_type, setData_type] = useState(initialDataType || []);
    const [task, setTask] = useState(initialTask || []);
    const [technique, setTechnique] = useState(initialTechnique || []);
    const [subject, setSubject] = useState(initialSubject || []);

    const [warningSearch, setwarningSearch] = useState(false);
    const [alertState, setalertState] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [noDatasets, setnoDatasets] = useState(false);
    const [blueButton, setblueButton] = useState('');
    const [lightBlueButton, setlightBlueButton] = useState('');

    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        setnoDatasets(false);
        if (!(searchString.length > 0 || geography_and_places.length > 0 || language.length > 0 || data_type.length > 0 || task.length > 0 || technique.length > 0 || subject.length > 0)) {
            setwarningSearch(true);
            return;
        }
        try {
            const filters = {
                geography_and_places: geography_and_places,
                language: language,
                data_type: data_type,
                task: task,
                technique: technique,
                subject: subject
            };

            const data = await BackendConnector.search(searchString, filters);

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

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') handleSearch(event);
    };

    useEffect(() => {
        handleSearch();
    }, [])

    useEffect(() => {
        let sorted = [...datasets];
        switch(selectedOption) {
            case 'byRelevance':
                sorted = [...datasets];
                break;
            case 'byRating':
                sorted = _.orderBy(datasets, ['rating'], ['desc']);
                break;
            case 'byUsabilityRating':
                sorted = _.orderBy(datasets, ['usability_rating'], ['desc']);
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
    }, [selectedOption]);

        return (
            <div>
                <Header />
                <div id='datasets'>
                    <Back />
                    <div className='searchFiltersSort'>
                        <form id='inputSearchDatasets' onSubmit={handleSearch} onKeyDown={handleKeyDown}>
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
                                applyChanges={handleSearch}
                                />
                                <select className="selectionInput" id='sort' value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                                    <option value="byRelevance">По релевантности</option>
                                    <option value="byRating">По рейтингу</option>
                                    <option value="byUsabilityRating">По подробности описания</option>
                                    <option value="largeFirst">Сначала большие</option>
                                    <option value="smallFirst">Сначала маленькие</option>
                                </select>
                            <button type='submit' id='searchButton'>Найти</button>
                            <button type='submit' id='searchIcon'><img id='searchIcon' src={searchIcon} alt='search'/></button>
                        </form>
                        <Alert message={"Ошибка: " + errorMessage} blueButton={blueButton} blueButtonFunc={()=>{setalertState(false)}} lightBlueButtonFunc={()=>{navigate('/')}} lightBlueButton={lightBlueButton} isOpen={alertState} onClose={()=>{setalertState(false)}}/>
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
                                    />))}
                            </div>
                            :
                            <h3>Ничего не удалось найти по Вашему запросу</h3>
                        }
                    </div>
                    
                </div>
            </div>
        );
}

export default Datasets;