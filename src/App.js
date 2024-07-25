import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UnsuccessUpload, Search, Upload, DatasetPage, Datasets, EditPage } from './pages';
import { Notification, NotificationProvider, ScrollToTop } from './components';

const App = () => {
    return (
      <NotificationProvider>
      <Router>
        <ScrollToTop />
        <Notification />
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/dataset/:id" element={<DatasetPage />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/unsuccessUpload" element={<UnsuccessUpload />} />
          <Route path='/datasets' element={<Datasets />} />
          <Route path='/editDataset' element={<EditPage />} />
        </Routes>
      </Router>
    </NotificationProvider>
    );
  };

export default App;
