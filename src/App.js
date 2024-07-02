import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UnsuccessUpload, Search, Upload, DatasetPage, Datasets, Notification } from './components';
import { NotificationProvider } from './components/Notification/NotificationContext';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
    return (
      <NotificationProvider>
      <Router>
        <ScrollToTop />
        <Notification />
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/dataset" element={<DatasetPage />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/unsuccessUpload" element={<UnsuccessUpload />} />
          <Route path='/datasets' element={<Datasets />} />
        </Routes>
      </Router>
    </NotificationProvider>
    );
  };

export default App;
