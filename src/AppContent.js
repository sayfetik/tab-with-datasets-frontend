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

  if (!initialized) return <></>;
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/dataset/:id" element={<DatasetPage />} />
        <Route path="/upload" element={<Upload {...datasetRestrictions} />} />
        <Route path="/datasets" element={<Datasets />} />
        <Route path="/requestPreview/:request_id" element={<RequestPreview />} />
        <Route path="/uploadRequests" element={<UploadRequests />} />
        <Route path="error" element={<ErrorPage />} />
        <Route
          path="/editDataset"
          element={<EditPage {...datasetRestrictions} />}
        />
      </Routes>
    </Router>
  );
};

export default AppContent;
