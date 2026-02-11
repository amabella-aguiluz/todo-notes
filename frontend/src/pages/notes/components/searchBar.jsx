import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from "@mui/material/InputAdornment";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
// to search for notes by name
export const SearchBar = () => {
    return(
        <div>
            <TextField id="outlined-basic" label="Search..." variant="outlined" 
                // puts a search icon on the right side
                fullWidth InputProps={{ endAdornment: (
                <InputAdornment position="end"> <SearchIcon /> </InputAdornment>),
                }}/> <FilterAltIcon />
        </div>
    );
};

// filter window
// if click FilterAltIcon:
export const FilterButton = () =>
{
    return(
        <MenuList>
            <MenuItem> Ascending </MenuItem>
            <MenuItem> Descending </MenuItem>
            <Divider />
            <MenuItem> Name </MenuItem>
            <MenuItem> Date </MenuItem>
        </MenuList>
    )
}

export default SearchBar;