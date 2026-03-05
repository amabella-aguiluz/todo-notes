import {register} from "../../services/auth.service";
import {useLogin} from "./useLogin";
import { useState } from "react";

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { handleLogin } = useLogin(); 

  const handleRegister = async (email, password, passwordConfirm) => {
    setLoading(true);
    setError(null);
    try {
      await register(email, password, passwordConfirm);
      // token is stored in localStorage by register function

      await handleLogin(email, password);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return { handleRegister, error, loading };
}