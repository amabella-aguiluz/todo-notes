import { login } from "../../services/auth.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();


  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      // token is stored in localStorage by login function

      // navigate to notes page after successful login
      navigate("/notes");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, error, loading };
};