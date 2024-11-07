import "katex/dist/katex.min.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import downloadIconWhite from "../../img/downloadWhite.png";
import "./DatasetPage.css";
import copyBlue from "../../img/copyBlue.png";
import {
  Back,
  DownloadCopyCode,
  DatasetCard,
  BackendConnector,
  Download,
  DeleteVerification,
  LikeDislike,
  Files,
} from "../../components";
import { marked } from "marked";
import katex from "katex";
import { useKeycloak } from "../../keycloak";

const DatasetPage = () => {
  const navigate = useNavigate();
  const { keycloak } = useKeycloak();
  const auth = keycloak.authenticated;
  const { id } = useParams();
  const [datasets, setDatasets] = useState([]);
  const [image, setImage] = useState(null);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isCopyCodeOpen, setIsCopyCodeOpen] = useState(false);
  const [isDeleteVerification, setisDeleteVerification] = useState(false);
  const [downloaded, setdownloaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataPreview = await BackendConnector.preview(id);
        setDataset(dataPreview);

        const imageData = await BackendConnector.getImage(id);
        setImage(imageData.imageUrl);

        const recommendations = await BackendConnector.recommend(id);
        if (recommendations && recommendations.length > 0) {
          setDatasets(recommendations);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        navigate("/error");
      }
    };

    fetchData();
  }, [keycloak.authenticated, downloaded]);

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

  const handleEditClick = () => {
    navigate("/editDataset", { state: dataset });
  };

  const handleDeleteClick = () => {
    setisDeleteVerification(true);
  };

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

  const handleCopyCodeClick = () => {
    setIsCopyCodeOpen(true);
  };

  useEffect(() => {
    document.title = dataset.title;
  }, [dataset]);

  return (
    <div>
      {dataset ? (
        <div id="datasetPage">
          <Back />
          <div id="datasetInfoHeader">
            <img id="datasetCoverImage" src={image} alt="Dataset cover"></img>

            <div id="mainInfo">
              <div>
                <p className="author">{dataset.owner}</p>
                {dataset.visibility === "private" ? (
                  <div id="visibilityLabel">Приватный</div>
                ) : (
                  <div id="visibilityLabel">Публичный</div>
                )}
              </div>
              <h2 id="datasetTitle">{dataset.title}</h2>
              <div id="tags">
                {dataset.geography_and_places.length > 0 &&
                  dataset.geography_and_places.map(
                    (tag, index) =>
                      tag !== "" && (
                        <span key={index} className="datasetTag capitalize">
                          {tag}
                        </span>
                      )
                  )}
                {dataset.language.length > 0 &&
                  dataset.language.map(
                    (tag, index) =>
                      tag !== "" && (
                        <span key={index} className="datasetTag">
                          {tag}
                        </span>
                      )
                  )}
                {dataset.data_type.length > 0 &&
                  dataset.data_type.map(
                    (tag, index) =>
                      tag !== "" && (
                        <span key={index} className="datasetTag">
                          {tag}
                        </span>
                      )
                  )}
                {dataset.task.length > 0 &&
                  dataset.task.map(
                    (tag, index) =>
                      tag !== "" && (
                        <span key={index} className="datasetTag">
                          {tag}
                        </span>
                      )
                  )}
                {dataset.technique.length > 0 &&
                  dataset.technique.map(
                    (tag, index) =>
                      tag !== "" && (
                        <span key={index} className="datasetTag">
                          {tag}
                        </span>
                      )
                  )}
                {dataset.subject.length > 0 &&
                  dataset.subject.map(
                    (tag, index) =>
                      tag !== "" && (
                        <span key={index} className="datasetTag">
                          {tag}
                        </span>
                      )
                  )}
              </div>
              <div id="downloadSection">
                <div id="downloadButtons">
                  <button
                    className="blueButton"
                    id="downloadButton"
                    onClick={() => setIsDownloadOpen(true)}
                  >
                    <span id="downloadLabel">Скачать</span>
                    <img src={downloadIconWhite} id="downloadIcon" alt="" />
                  </button>
                  <button
                    className="lightBlueButton"
                    id="copyCodeButton"
                    onClick={handleCopyCodeClick}
                  >
                    <span id="copyCodeLabel">Код для скачивания</span>
                    <img src={copyBlue} id="copyCodeIcon" alt="" />
                  </button>
                </div>
                {/* <div id='numOfDownloads'>{dataset.downloads_number} скачиваний</div> */}
              </div>
              {!dataset.isOwner ? (
                <div>
                  <Download
                    auth={auth}
                    isOpen={isDownloadOpen}
                    onClose={() => setIsDownloadOpen(false)}
                    id={dataset.id}
                    setdownloaded={setdownloaded}
                  />
                  <DownloadCopyCode
                    auth={auth}
                    isOpen={isCopyCodeOpen}
                    onClose={() => setIsCopyCodeOpen(false)}
                    id={dataset.id}
                  />
                  <LikeDislike
                    auth={auth}
                    dataset_id={dataset.id}
                    previousReaction={dataset.user_reaction}
                    likes_amount={dataset.likes_amount}
                    dislikes_amount={dataset.dislikes_amount}
                  />
                </div>
              ) : (
                <div className="row">
                  <button
                    className="whiteBlueButton"
                    style={{ margin: "0", padding: "8px 16px" }}
                    onClick={handleEditClick}
                  >
                    Редактировать
                  </button>
                  <button
                    className="whiteRedButton"
                    onClick={handleDeleteClick}
                    style={{ padding: "8px 16px" }}
                  >
                    Удалить
                  </button>
                  <DeleteVerification
                    onClose={() => {
                      setisDeleteVerification(false);
                    }}
                    isOpen={isDeleteVerification}
                    id={dataset.id}
                    back={true}
                  />
                </div>
              )}
            </div>
          </div>

          <div id="datasetInfo">
            <div id="section">
              <h3 id="descriptionLabel">Описание</h3>
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

            <div id="metainfo">
              {dataset.owner && (
                <div className="infoContainer">
                  <h4 className="metaWhite">Владельцы</h4>
                  <p className="metaWhite">{dataset.owner}</p>
                </div>
              )}
              {dataset.authors && (
                <div className="infoContainer">
                  <h4 className="metaWhite">Авторы</h4>
                  <p className="metaWhite">{dataset.authors}</p>
                </div>
              )}
              {dataset.data_source && (
                <div className="infoContainer">
                  <h4 className="metaWhite">Источник</h4>
                  <p className="metaWhite">{dataset.data_source}</p>
                </div>
              )}
              {dataset.license && (
                <div className="infoContainer">
                  <h4 className="metaWhite">Лицензия</h4>
                  <p className="metaWhite">{dataset.license}</p>
                </div>
              )}
              {dataset.expected_update_frequency && (
                <div className="infoContainer">
                  <h4 className="metaWhite">Ожидаемая частота обновления</h4>
                  <p className="metaWhite">
                    {dataset.expected_update_frequency}
                  </p>
                </div>
              )}
              {dataset.last_change_date && (
                <div className="infoContainer">
                  <h4 className="metaWhite">Последнее изменение</h4>
                  <p className="metaWhite">{dataset.last_change_date}</p>
                </div>
              )}
              {dataset.doi && (
                <div className="infoContainer">
                  <h4 className="metaWhite">DOI</h4>
                  <p className="metaWhite">{dataset.doi}</p>
                </div>
              )}
            </div>
          </div>

          {datasets.length > 0 && (
            <div id="cardsRowSection">
              <div className="topicCardsInRow">
                <h2>Похожее</h2>
                {/*<div id='seeAllIcon'>
                            <p id='seeAll'>Смотреть все</p>
                            <img src={arrowsIcon} width={"19px"} alt=''/>
                            </div>*/}
              </div>

              <div id="cards">
                {datasets.map((dataset) => (
                  <DatasetCard
                    key={dataset.id}
                    id={dataset.id}
                    title={dataset.title}
                    authors={dataset.authors}
                    numberOfFiles={dataset.number_of_files}
                    lastChangeDatetime={dataset.last_change_date}
                    downloadsNumber={dataset.downloads_number}
                    size={dataset.size}
                    smallDescription={dataset.small_description}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <h3 style={{ margin: "50px 0px 0px 80px" }}>
          Не удалось получить информацию о датасете. Повторите попытку позже
        </h3>
      )}
    </div>
  );
};

export default DatasetPage;
