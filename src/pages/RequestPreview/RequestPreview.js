import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import "katex/dist/katex.min.css";
import { marked } from "marked";
import katex from "katex";

import { Back, BackendConnector, Files, DeleteVerification } from '../../components'

const RequestPreview = () => {
    const [dataset, setDataset] = React.useState({
        id: "",
        title: "",
        description: "",
        small_description: "",
        tags: [],
        geography_and_places: [],
        language: [],
        data_type: [],
        task: [],
        technique: [],
        subject: [],
        owner: "",
        authors: "",
        data_source: "",
        license: "",
        number_of_files: 0,
        doi: "",
        expected_update_frequency: "",
        last_change_date: "",
        last_change_time: "",
        downloads_number: 0,
        visibility: "",
        usability_rating: 0,
        size: "",
        size_bytes: 0,
        rating: 0,
        files_structure: {},
        user_reaction: "",
        likes_amount: 0,
        dislikes_amount: 0,
        isOwner: false,
      });
    const { request_id } = useParams();
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const [isDeleteVerification, setisDeleteVerification] = useState(false);

    const renderMarkdownWithKaTeX = (text) => {
        marked.setOptions({
          gfm: true,
          breaks: true,
          sanitize: false,
        });
    
        // Заменяем \[...\] на $$...$$
        text = text.replace(/\\\[(.*?)\\\]/g, (match, formula) => `$$${formula}$$`);
    
        // Преобразуем Markdown в HTML
        let html = marked(text);
    
        // Преобразуем блочные формулы $$...$$
        html = html.replace(/\$\$([^\$]+)\$\$/g, (match, formula) => {
          try {
            return `<div class="katex-block">${katex.renderToString(formula, {
              displayMode: true,
              throwOnError: false,
            })}</div>`;
          } catch (error) {
            return match; // Возвращаем исходный текст, если есть ошибка
          }
        });
    
        // Преобразуем встроенные формулы $...$
        html = html.replace(/\$([^\$]+)\$/g, (match, formula) => {
          try {
            return katex.renderToString(formula, { throwOnError: false });
          } catch (error) {
            return match; // Возвращаем исходный текст, если есть ошибка
          }
        });
    
        return html;
      };

    useEffect(() => {
        const fetchData = async () => {
            try {
              const dataPreview = await BackendConnector.previewUploadRequest(request_id);
              setDataset(dataPreview);
      
              const imageData = await BackendConnector.getImage(request_id);
              setImage(imageData.imageUrl);
            } catch (error) {
              console.error("Error fetching data: ", error);
              navigate("/error");
            }
        }
      
        fetchData();
    }, [request_id]);

    const getFileCountString = (files_structure) => {
        const getFilesAndFoldersCount = (files_structure) => {
          const folderCount = Object.keys(files_structure).filter(
            (key) =>
              typeof files_structure[key] === "object" &&
              files_structure[key] !== null
          ).length;
    
          let totalFileCount = 0;
          Object.entries(files_structure).forEach(([key, value]) => {
            // Изменено, добавлен 'key'
            if (typeof value === "object" && value !== null) {
              totalFileCount += Object.keys(value).length;
            } else {
              totalFileCount += 1;
            }
          });
          return { folders: folderCount, files: totalFileCount };
        };
    
        const getFolderWord = (count) => {
          if (count % 10 === 1 && count % 100 !== 11) return "папка";
          else if (
            count % 10 >= 2 &&
            count % 10 <= 4 &&
            (count % 100 < 10 || count % 100 >= 20)
          )
            return "папки";
          else return "папок";
        };
    
        const getFileWord = (count) => {
          if (count % 10 === 1 && count % 100 !== 11) return "файл";
          else if (
            count % 10 >= 2 &&
            count % 10 <= 4 &&
            (count % 100 < 10 || count % 100 >= 20)
          )
            return "файла";
          else return "файлов";
        };
    
        const counts = getFilesAndFoldersCount(files_structure);
        if (counts.folders === 0)
          return `${counts.files} ${getFileWord(counts.files)}`;
        return `${counts.folders} ${getFolderWord(counts.folders)}, ${
          counts.files
        } ${getFileWord(counts.files)}`;
      };
    
      const update_frequency_dict = {
        "never": "Никогда",
        "onceWeek": "Раз в неделю",
        "twiceWeek": "2 раза в неделю",
        "threeAWeek": "3 раза в неделю",
        "onceMonth": "Раз в месяц",
        "twiceMonth": "2 раза в месяц",
        "threeAMonth": "3 раза в месяц",
        "onceYear": "Раз в год",
        "twiceYear": "2 раза в год",
        "threeAYear": "3 раза в год",
        "fourAYear": "4 раза в год"
    }

    const handleDeleteClick = () => {
        setisDeleteVerification(true);
      };

    return (
        <div>
            {dataset ?
                <div id='datasetPage'>
                    <Back />
                    <div id='datasetInfoHeader'>
                        <img id="datasetCoverImage" src={image} alt="Dataset cover"></img>

                        <div id='mainInfo'>
                            <div style={{marginBottom: '7px'}}>
                                <p className='author'>{dataset.owner}</p>
                                {dataset.visibility === "private" ?
                                    <div id='visibilityLabel'>Приватный</div>
                                    : <div id='visibilityLabel'>Публичный</div>
                                }
                            </div>
                            <h1 id='datasetTitle'>{dataset.title}</h1>
                            {dataset.tags && dataset.tags.length > 0 && 
                            <div id='tags'>
                                {dataset.geography_and_places.length >0 && dataset.geography_and_places.map((tag, index) => ( 
                                    tag !== "" && <span key={index} className='datasetTag capitalize'>{tag}</span>
                                ))}
                                {dataset.language.length > 0 && dataset.language.map((tag, index) => ( 
                                    tag !== "" && <span key={index} className='datasetTag'>{tag}</span>
                                ))}
                                {dataset.data_type.length > 0 && dataset.data_type.map((tag, index) => ( 
                                    tag !== "" && <span key={index} className='datasetTag'>{tag}</span>
                                ))}
                                {dataset.task.length > 0 && dataset.task.map((tag, index) => ( 
                                    tag !== "" && <span key={index} className='datasetTag'>{tag}</span>
                                ))}
                                {dataset.technique.length > 0 && dataset.technique.map((tag, index) => ( 
                                    tag !== "" && <span key={index} className='datasetTag'>{tag}</span>
                                ))}
                                {dataset.subject.length > 0 && dataset.subject.map((tag, index) => ( 
                                    tag !== "" && <span key={index} className='datasetTag'>{tag}</span>
                                ))}
                            </div>}
                            <button
                                className="whiteRedButton"
                                onClick={handleDeleteClick}
                                style={{ padding: "8px 16px", width: 'fit-content', marginLeft: '0px' }}
                            >
                                Удалить
                            </button>
                            <DeleteVerification
                                onClose={() => {
                                setisDeleteVerification(false);
                                }}
                                isOpen={isDeleteVerification}
                                id={request_id}
                                back={true}
                            />
                        </div>
                    </div>
                        
                    <div id='datasetInfo'>
                        <div id='section'>
                            <h3 id='descriptionLabel'>Краткое описание</h3>
                            <div
                                id="textarea"
                                style={{
                                margin: "20px 0px",
                                padding: "0",
                                border: "none",
                                backgroundColor: "transparent",
                                }}
                                dangerouslySetInnerHTML={{
                                __html: renderMarkdownWithKaTeX(dataset.small_description),
                                }}
                            />
                            <h3 id='descriptionLabel'>Описание</h3>
                            <div
                                id="textarea"
                                style={{
                                margin: "20px 0px",
                                padding: "0",
                                border: "none",
                                backgroundColor: "transparent",
                                }}
                                dangerouslySetInnerHTML={{
                                __html: renderMarkdownWithKaTeX(dataset.description),
                                }}
                            />
                            <div id="filesSection">
                                <div
                                id={
                                    dataset.number_of_files === 0
                                    ? "filesHeader"
                                    : "filesHeaderWithBottomDivider"
                                }
                                className="rowSpaceBetween"
                                >
                                <p className="author">
                                    Данные ({getFileCountString(dataset.files_structure)})
                                </p>
                                <p className="author">{dataset.size}</p>
                                </div>
                                <Files filesStructure={dataset.files_structure} />
                            </div>
                        </div>
                        
                        <div id='metainfo'>
                            <div className='infoContainer'>
                                <h4 className='metaWhite'>Владельцы</h4>
                                <p className='metaWhite'>{dataset.owner}</p>
                            </div>
                            <div className='infoContainer'>
                                <h4 className='metaWhite'>Авторы</h4>
                                <p className='metaWhite'>{dataset.authors}</p>
                            </div>
                            <div className='infoContainer'>
                                <h4 className='metaWhite'>Источник</h4>
                                <p className='metaWhite'>{dataset.data_source}</p>
                            </div>
                            <div className='infoContainer'>
                                <h4 className='metaWhite'>Лицензия</h4>
                                <p className='metaWhite'>{dataset.license}</p>
                            </div>
                            <div className='infoContainer'>
                                <h4 className='metaWhite'>Ожидаемая частота обновления</h4>
                                <p className='metaWhite'>{update_frequency_dict[dataset.expected_update_frequency]}</p>
                            </div>
                            <div className='infoContainer'>
                                <h4 className='metaWhite'>Последнее изменение</h4>
                                <p className='metaWhite'>{dataset.last_change_date}</p>
                            </div>
                            <div className='infoContainer'>
                                <h4 className='metaWhite'>DOI</h4>
                                <p className='metaWhite'>{dataset.doi}</p>
                            </div>
                            <div className='infoContainer'>
                                <h4 className='metaWhite'>Количество скачиваний</h4>
                                <p className='metaWhite'>{dataset.downloads_number}</p>
                            </div>
                            <div className='infoContainer'>
                                <h4 className='metaWhite'>Размер</h4>
                                <p className='metaWhite'>{dataset.size}</p>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div style={{marginLeft: '100px'}}>
                    <Back />
                    <h3 style={{margin: '50px 0px 0px 0px'}}>Не удалось получить информацию о датасете. Повторите попытку позже</h3>
                </div>}
        </div>
    );
}


export default RequestPreview;