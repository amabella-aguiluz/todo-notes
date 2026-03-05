import React, { useState } from "react";
import RegisterInput from "./components/register_input";
import AuthPage from "./components/auth_page";
import { useRegister } from "../../hooks/auth/useRegister";

export const RegisterPage = () => {
  const { handleRegister, error, loading } = useRegister();;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleRegister(email, password, passwordConfirm);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthPage
      type="Register"
      typeInput={
        <RegisterInput
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          passwordConfirm={passwordConfirm}
          setPasswordConfirm={setPasswordConfirm}
          onSubmit={onSubmit}
          error={error}
          loading={loading}
        />
      }
    />
  );
};

export default RegisterPage;
