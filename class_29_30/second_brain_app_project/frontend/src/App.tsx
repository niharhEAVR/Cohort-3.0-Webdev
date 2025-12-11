import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllAuthPages from "./pages/auth/AllAuthPages";
import DashboardPage from "./pages/DashboardPage";
import IntroPage from "./pages/IntroPage";
import SharedBrainPage from "./pages/SharedBrainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/brain/share/:shareId" element={<SharedBrainPage />} />

        <Route path="/auth/*" element={<AllAuthPages />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;