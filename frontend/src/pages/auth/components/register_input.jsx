import React from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";



export const RegisterInput = () => {
    return (
    <div>
        <TextField label="Email" variant="outlined" />
        <TextField label="Password" variant="outlined" />
        <TextField label="Re-enter password" variant="outlined" />
        <Button variant="contained">Register</Button>
        <p>Already have an account? <Link href="#login">Login here</Link> </p>
    </div>
    );
};

export default RegisterInput;