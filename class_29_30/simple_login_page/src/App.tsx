import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllAuthPage from "./pages/auth/AllAuthPage";
import HomePage from "./pages/HomePage";
import { BackendProvider } from "./context/BackendContext";
import "./App.css";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const backendUrlVersions = import.meta.env.VITE_BACKEND_URL_VERSIONS;

function App() {
  return (
    <BackendProvider url={backendUrl} ves={backendUrlVersions}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/*"
            element={<AllAuthPage/>}
          />
        </Routes>
      </BrowserRouter>
    </BackendProvider>
  );
}

export default App;
