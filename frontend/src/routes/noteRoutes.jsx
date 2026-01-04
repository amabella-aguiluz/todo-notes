//noteroutes.js
import { Routes, Route } from "react-router-dom";
import NotePreview from "../pages/notes/components/NotePreview";
import EditNote from "../pages/notes/EditNote";
import NoteHome from "../pages/notes/noteHome";

export const NoteRoutes = () => {
  return (
    <Routes>
      <Route index element={<NotePreview />} />
      <Route path="noteHome" element={<NoteHome />} />
      <Route path="new" element={<EditNote />} />
      <Route path=":noteId" element={<EditNote />} />
    </Routes>
  );
};

export default NoteRoutes;
