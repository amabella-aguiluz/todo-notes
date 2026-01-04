// AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import UserRoutes from "./userRoutes";
import NoteRoutes from "./noteRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Default redirect to register */}
      <Route path="/" element={<Navigate to="/register" replace />} />

      {/* Public routes */}
      <Route path="/*" element={<UserRoutes />} />

      {/* Notes routes */}
      <Route path="/notes/*" element={<NoteRoutes />} />
    </Routes>
  );
};

export default AppRoutes;
