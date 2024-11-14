import ScrollToTop from "./components/ScrollToTop";
import { Header } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Search,
  Upload,
  DatasetPage,
  Datasets,
  EditPage,
  UploadRequests,
  RequestPreview,
  ErrorPage,
} from "./pages";
import { useKeycloak } from "./keycloak";
import { useEffect, useState } from "react";

const datasetRestrictions = {
  doiLimit: 100,
  descriptionLimit: 5000,
  smallDescriptionLimit: 500,
  titleLimit: 200,
  authorsLimit: 500,
  sourceLimit: 100,
  frequencyLimit: 100,
  descriptionFieldsLimit: 3000,
};

const AppContent = () => {
  const { initialized } = useKeycloak();

  const [historyStack, setHistoryStack] = useState(() => {
    const storedHistory = localStorage.getItem('navigationHistory');
    return storedHistory ? JSON.parse(storedHistory) : [];
  });

  const addToHistory = (path) => {
    setHistoryStack(prevHistory => {
      const updatedHistory = [...prevHistory, path];
      localStorage.setItem('navigationHistory', JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  }

  const goBackInHistory = () => {
    if (historyStack.length > 1) {
      let lastIndex = historyStack.length - 2;
      let previousPath = historyStack[lastIndex];
      if (previousPath === '/editDataset') {
        const prevIndex = lastIndex;
        lastIndex = prevIndex - 1;
        previousPath = historyStack[lastIndex];
      }
      const updatedHistory = historyStack.slice(0, lastIndex + 1);
      setHistoryStack(updatedHistory);
      localStorage.setItem('navigationHistory', JSON.stringify(updatedHistory));
      return previousPath;
    } else {
      return '/';
    }
  };

  // useEffect(()=>{
  //   console.log(historyStack);
  // }, [historyStack])

  if (!initialized) return <></>;
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Search addToHistory={addToHistory}/>} />
        <Route path="/dataset/:id" element={<DatasetPage addToHistory={addToHistory} back={goBackInHistory} />} />
        <Route path="/upload" element={<Upload {...datasetRestrictions} addToHistory={addToHistory} back={goBackInHistory} />} />
        <Route path="/datasets" element={<Datasets addToHistory={addToHistory} back={goBackInHistory} />} />
        <Route path="/requestPreview/:request_id" element={<RequestPreview addToHistory={addToHistory} back={goBackInHistory} />} />
        <Route path="/uploadRequests" element={<UploadRequests addToHistory={addToHistory} back={goBackInHistory} />} />
        <Route path="error" element={<ErrorPage />} />
        <Route
          path="/editDataset"
          element={<EditPage {...datasetRestrictions} addToHistory={addToHistory} back={goBackInHistory} />}
        />
      </Routes>
    </Router>
  );
};

export default AppContent;
