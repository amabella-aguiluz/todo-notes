//login_input.jsx
import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

export const LoginInput = ({
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  error,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p>
        <Link component={RouterLink} to="/register">Forgot password?</Link>
      </p>

      <Button type="submit" variant="contained">
        Login
      </Button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Dont have an account yet? <Link component={RouterLink} to="/register">Register here</Link>
      </p>
    </form>
  );
};


export default LoginInput;
