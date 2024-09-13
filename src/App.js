import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./components/Home/HomePage";
import { ImportPage } from "./components/Import/ImportPage";
import { ExportPage } from "./components/Export/ExportPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/import" element={<ImportPage />} />
        <Route path="/export" element={<ExportPage />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </>
  );
}

export default App;
