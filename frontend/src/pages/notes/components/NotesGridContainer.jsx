//notesgridcontainer.jsx 
import {React, useState} from "react";
import EditNote from "../EditNote";
import { useNoteList } from "../../../hooks/notes/useNotePreview";
import NotePreview from "./NotePreview";


const NotesGridContainer = () => {
  const { notes, loading } = useNoteList(); 
  const [openNoteId, setOpenNoteId] = useState(null);

  if (loading) return <p>Loading notes...</p>;

  return (
    <div>

      {/* // displays map of notes  */}
      <div style={{ display: "grid", gap: "1rem" }}>
        {notes.length > 0 ? (
          notes.map((note) => (
            <NotePreview
              key={note.note_id}
              id={note.note_id}
              title={note.title}
              description={note.description}
              updated_at={note.updated_at}
              created_at={note.created_at}
              onOpen={() => setOpenNoteId(note.note_id)}
            />
          ))
        ) : (
          <p>You don’t have any notes.</p>
        )}
      </div>

      {/* if a note is opened */}
      {openNoteId && (
        <div onClick={() => setOpenNoteId(null)}>
          <div onClick={(e) => e.stopPropagation()}>
            <EditNote note={notes.find(n => n.note_id === openNoteId)} onClose={() => setOpenNoteId(null)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesGridContainer;