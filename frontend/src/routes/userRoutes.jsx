// userRoutes.jsx
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/login";
import RegisterPage from "../pages/auth/register";

const UserRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage key="login" />}
      />
      <Route
        path="/register"
        element={<RegisterPage key="register" />}
      />
    </Routes>
  );
};

export default UserRoutes;
