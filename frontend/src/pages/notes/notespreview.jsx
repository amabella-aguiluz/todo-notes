
import SearchBar from "./components/searchbar";
import TopBar from "./components/topbar";
import EditNote from "./EditNote";
import NotePreview from "./components/NotePreview";
import ActionBar from "./components/actionBar";
import NotesGridContainer from "./components/NotesGridContainer";

export const NotesPreview = () => {
    return(
    <div>
        <TopBar />
        <ActionBar />
        <NotesGridContainer />
    </div>
    )
}

export default NotesPreview;