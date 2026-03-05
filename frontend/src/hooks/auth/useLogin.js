import {login} from "../../services/auth.service";
import { useState } from "react";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      // token is stored in localStorage by login function
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, error, loading };
};