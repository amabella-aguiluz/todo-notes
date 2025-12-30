import React from "react";
import NoteGridList from "./NoteGridList";
import { useNotePreview } from "../../../hooks/useNotePreview";

const NotesGridContainer = () => {
  const { notes, loading } = useNotePreview();

  return <NoteGridList notes={notes} loading={loading} />;
};

export default NotesGridContainer;
