//topbar.jsx
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

// app name + log out button
export const TopBar = () => {
    return(
        <div>
        <h1>Find Your Pages</h1>
        {/* TODO: aesthetically pleasing log out button */}
        <Link component={RouterLink} to="/login">Log Out</Link>      
        </div>  
    );
};

export default TopBar;