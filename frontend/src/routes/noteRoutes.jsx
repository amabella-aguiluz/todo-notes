//noteroutes.js
import { Routes, Route } from "react-router-dom";
import NotePreview from "../pages/notes/components/NotePreview";
import EditNote from "../pages/notes/EditNote";
import NoteHome from "../pages/notes/noteHome";
// import {ProtectedRoute} from "./protectedRoutes";

export const NoteRoutes = () => {
  return (
    <Routes>
    <Route index element={<NoteHome />} />          {/* default /notes */}
    <Route path="new" element={<EditNote />} />     {/* /notes/new */}
    <Route path=":note_id" element={<EditNote />} /> {/* /notes/123 */}
    </Routes>
  );
};

export default NoteRoutes;
