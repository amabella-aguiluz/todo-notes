// src/components/NoteBodyEditor.jsx
import React from "react";
import { BlockNoteView } from "@blocknote/mantine";

// edit note body
const NoteBodyEditor = ({ editor }) => {
  return (
    <div>
      <BlockNoteView editor={editor} />
    </div>
  );
};

export default NoteBodyEditor;
