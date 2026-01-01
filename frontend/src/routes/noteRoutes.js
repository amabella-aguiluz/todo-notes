import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotesPreview from "../../pages/notes/NotesPreview";
import EditNote from "../pages/notes/EditNote";

export const NoteRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/notes" element={<NotesPreview />} />
        <Route path="/notes/new" element={<EditNote />} />
        <Route path="/notes/:noteId" element={<EditNote />} />
      </Routes>
    </BrowserRouter>
  );
};
