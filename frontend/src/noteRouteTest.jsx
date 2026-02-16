// src/NotesRoutesTest.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotesPreview from "./pages/notes/notespreview";
import EditNote from "./pages/notes/EditNote";
import RegisterPage from "./pages/auth/register";
import LoginPage from "./pages/auth/login";

export const NotesRoutesTest = () => {
  return (
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/notes" element={<NotesPreview />} />
        <Route path="/notes/:noteId" element={<EditNote />} />
      </Routes>
  );
};
