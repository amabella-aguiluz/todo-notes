//loginpage

import React, { useState } from "react";
import LoginInput from "./components/login_input";
import AuthPage from "./components/auth_page";
import { useLogin } from "../../hooks/auth/useLogin";


export const LoginPage = () => {
  const { handleLogin } = useLogin(); // <- context must exist
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(email, password);
    } catch (err) {
      setError(err.message || "Invalid email or password");
    }
    console.log("SUBMIT FIRED");
  };

  return (
    <AuthPage
      type="Login"
      typeInput={
        <LoginInput
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onSubmit={onSubmit}
          error={error}
        />
      }
    />
  );
};

export default LoginPage;
