import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UnsuccessUpload, Search, Upload, DatasetPage, Back, Notification } from './components';
import { NotificationProvider } from './components/Notification/NotificationContext';

const App = () => {
    return (
      <NotificationProvider>
      <Router>
        <Notification />
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/dataset" element={<DatasetPage />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/unsuccessUpload" element={<UnsuccessUpload />} />
        </Routes>
      </Router>
    </NotificationProvider>
    );
  };

export default App;
