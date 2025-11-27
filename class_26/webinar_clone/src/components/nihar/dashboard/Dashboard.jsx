import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import BottomBar from "./BottomBar";
import WebinarPage from "./pages/WebinarPage";
import RecordingPage from "./pages/RecordingPage";
import ProfilePage from "./pages/ProfilePage";
import Homepage from "./pages/HomePage";
import { useState } from "react";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen flex">
      
      <Sidebar open={open} />


      <div className="flex-1 p-6 bg-gray-100">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/webinar" element={<WebinarPage />} />
          <Route path="/recordings" element={<RecordingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>

      <BottomBar />
    </div>
  );
}
