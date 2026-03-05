// AppRoutes.jsx
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import UserRoutes from "./userRoutes";
import NoteRoutes from "./noteRoutes";
// import ProtectedRoute from "./protectedRoutes";

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
