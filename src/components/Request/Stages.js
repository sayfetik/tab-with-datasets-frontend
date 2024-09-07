import React from 'react';
import { Stage, RequestReport, AnonReport } from '../../components';

const Stages = ({ request, statusImages }) => {
    const [isSecuringReportOpen, setisSecuringReportOpen] = React.useState(false);
    const [isMetadataSecuringReportOpen, setisMetadataSecuringReportOpen] = React.useState(false);
    const [isAnonymizingReportOpen, setisAnonymizingReportOpen] = React.useState(false);
    const [isImage_securingReportOpen, setisImage_securingReportOpen] = React.useState(false);
  
    return (
      <div className='stages'>
        {request.sending && (
          <Stage
            stage={request.sending}
            stageName="На проверке"
            statusImages={statusImages}
          />
        )}
        {request.metadata_securing && (
          <Stage
            stage={request.metadata_securing}
            stageName="Сканирование метаданных"
            statusImages={statusImages}
            setisReportOpen={setisMetadataSecuringReportOpen}
            reportOpen={isMetadataSecuringReportOpen}
            reportComponent={<RequestReport />}
            label='Файлы с подозрениями на нарушение заполненных метаданных'
          />
        )}
        {request.image_securing && (
          <Stage
            stage={request.image_securing}
            stageName="Сканирование обложки на безопасность"
            statusImages={statusImages}
            setisReportOpen={setisImage_securingReportOpen}
            reportOpen={isImage_securingReportOpen}
            reportComponent={<RequestReport />}
            label='Файлы с подозрениями на нарушение заполненных метаданных'
          />
        )}
        {request.files_securing && (
          <Stage
            stage={request.files_securing}
            stageName="Сканирование датасета на безопасность"
            statusImages={statusImages}
            setisReportOpen={setisSecuringReportOpen}
            reportOpen={isSecuringReportOpen}
            reportComponent={<RequestReport />}
            label='Файлы с подозрениями на нарушение безопасности'
          />
        )}
        {request.anonymizing && (
          <Stage
            stage={request.anonymizing}
            stageName="Анонимизация датасета, защита персональных данных"
            statusImages={statusImages}
            setisReportOpen={setisAnonymizingReportOpen}
            reportOpen={isAnonymizingReportOpen}
            reportComponent={<AnonReport />}
            label='Изменённые файлы'
          />
        )}
        {request.cleaning && (
          <Stage
            stage={request.cleaning}
            stageName="Подготовка датасета к использованию, предобработка данных"
            statusImages={statusImages}
          />
        )}
        {request.uploading && (
          <Stage
            stage={request.uploading}
            stageName="Датасет загружен"
            statusImages={statusImages}
          />
        )}
      </div>
    );
  };
  
  export default Stages;