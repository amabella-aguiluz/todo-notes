import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

export const RegisterInput = ({ email, setEmail, password, setPassword, passwordConfirm, setPasswordConfirm, onSubmit, error }) => {
  return (
    <form onSubmit={onSubmit}>
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        label="Re-enter Password"
        type="password"
        variant="outlined"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />
      <Button type="submit" variant="contained">
        Register
      </Button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Already have an account? <Link component={RouterLink} to="/login">Login here</Link>
      </p>
    </form>
  );
};

export default RegisterInput;