import React from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

export const LoginInput = () => {
    return (
    <div>
        <TextField label="Email" variant="outlined" />
        <TextField label="Password" variant="outlined" />
        <Link href="forgot-password">Forgot password?</Link>
        <Button variant="contained">Login</Button>
        <p>Not a member yet? <Link href="#register">Register here</Link></p>
    </div>
    );
};

export default LoginInput;