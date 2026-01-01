//notegridlist.jsx
import NotePreview from "./NotePreview";
import { useNavigate } from "react-router-dom";


// list of notes
export const NoteGridList = ({notes, loading, onOpen}) => {
    const navigate = useNavigate();
    if (loading) return <p>Loading...</p>;
    const openNote = (id) => {
    navigate(`/notes/${id}`);
  };
    return(
        <div>
            {/* grid format */}
            <div>
                {/* map through notes, renders a notepreview for each*/}
                {notes && notes.length > 0 ? (
                notes.map((note) => (
                    <NotePreview
                    key={note.id}
                    id={note.id}
                    title={note.title}
                    description={note.description}
                    lastModified={note.lastModified}
                    lastCreated={note.lastCreated}
                    onOpen={() => onOpen(note)}
                    />
                ))
                // if have no notes
                ) : (
                <p>You don’t have any notes.</p>
                )}
      </div>
        </div>
    )
}

export default NoteGridList;