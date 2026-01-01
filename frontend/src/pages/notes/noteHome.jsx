import TopBar from "./components/topbar";
import NotePreview from "./components/NotePreview";
import ActionBar from "./components/actionBar";
import NotesGridContainer from "./components/NotesGridContainer";

export const noteHome = () => {
    return (
        <div id="#home">
            <TopBar />
            <ActionBar />
            <NotesGridContainer />
        </div>
    )
}

export default noteHome;