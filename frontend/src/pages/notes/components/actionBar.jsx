import NoteActions from "./noteActions";
import SearchBar from "./searchbar";

export const ActionBar = () => {
    return(
        <div>
            <SearchBar />
            <NoteActions />
        </div>
    )
}

export default ActionBar;