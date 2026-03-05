//notehome.jsx
import TopBar from "./components/topbar";
import ActionBar from "./components/actionBar";
import NotesGridContainer from "./components/NotesGridContainer";

export const NoteHome = () => {
    return (
        <div id="noteHome">
            <TopBar />
            <ActionBar />
            <NotesGridContainer />
        </div>
    )
}

export default NoteHome;