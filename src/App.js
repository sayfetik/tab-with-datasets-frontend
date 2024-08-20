import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UnsuccessUpload, Search, Upload, DatasetPage, Datasets, EditPage } from './pages';
import { Notification, NotificationProvider, ScrollToTop } from './components';

const App = () => {
  const descriptionLimit = 1000;
  const authorsLimit = 500;
  const smallDescriptionLimit = 600;
  const titleLimit = 100;
  const sourceLimit = 500;
  const frequencyLimit = 80;
  const descriptionFieldsLimit = 500;
  const doiLimit = 300;

    return (
      <NotificationProvider>
      <Router>
        <ScrollToTop />
        <Notification />
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/dataset/:id" element={<DatasetPage />} />
          <Route path="/upload" element={<Upload doiLimit={doiLimit} descriptionLimit={descriptionLimit} smallDescriptionLimit={smallDescriptionLimit} titleLimit={titleLimit} authorsLimit={authorsLimit} sourceLimit={sourceLimit} frequencyLimit={frequencyLimit} descriptionFieldsLimit={descriptionFieldsLimit}/>} />
          <Route path="/unsuccessUpload" element={<UnsuccessUpload />} />
          <Route path='/datasets' element={<Datasets />} />
          <Route path='/editDataset' element={<EditPage doiLimit={doiLimit} descriptionLimit={descriptionLimit} smallDescriptionLimit={smallDescriptionLimit} titleLimit={titleLimit} authorsLimit={authorsLimit} sourceLimit={sourceLimit} frequencyLimit={frequencyLimit} descriptionFieldsLimit={descriptionFieldsLimit}/>} />
        </Routes>
      </Router>
    </NotificationProvider>
    );
  };

export default App;
