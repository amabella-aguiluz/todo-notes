import Link from "@mui/material/Link";

// app name + log out button
export const TopBar = () => {
    return(
        <div>
        <h1>Find Your Pages</h1>
        {/* TODO: aesthetically pleasing log out button */}
        <Link href="login">Log Out</Link>      
        </div>  
    );
};

export default TopBar;