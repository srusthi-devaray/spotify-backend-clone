import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Albums from "./pages/Albums";
import AlbumDetails from "./pages/AlbumDetails";
import Upload from "./pages/Upload";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/albums/:albumId" element={<AlbumDetails />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
