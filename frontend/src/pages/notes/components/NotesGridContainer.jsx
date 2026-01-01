// NotesGridContainer.jsx
import React from "react";
import NoteGridList from "./NoteGridList";
import EditNote from "../EditNote";
import { useNotePreview } from "../../../hooks/useNotePreview";
import { useOpenNote } from "../../../hooks/openNote";

const NotesGridContainer = () => {
  const { notes, loading } = useNotePreview();
  const { openNote, open, close } = useOpenNote();

  return (
    <div>
      <NoteGridList
        notes={notes}
        loading={loading}
        onOpen={open} // pass the open function to each note
      />

      {openNote && (
        <div onClick={close}>
          <div onClick={(e) => e.stopPropagation()}>
            <EditNote note={openNote} />
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesGridContainer;
