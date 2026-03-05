// src/components/NoteTitleBar.jsx
import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

// edit title bar
export const NoteTitleBar = ({ title, setTitle, onSave, onDelete }) => {
  return (
    <div>
      {/* input title */}
      <input
        type="text"
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* clickable icons */}
      {/* save on click */}
      <SaveIcon onClick={onSave} />
      {/* delete on click */}
      <DeleteIcon onClick={onDelete} />
    </div>
  );
};

// src/components/NoteBodyEditor.jsx
import { useEditor, EditorContent } from '@tiptap/react'
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'

// edit note body
export const NoteBodyEditor = ({ editor }) => {
  if(!editor) return null;
  return (
    <div>
      <>
        <TextMenu editor={editor}/>
        <EditorContent editor={editor} />
      </>
    </div>
  );
};

import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export const TextMenu = ({editor}) => {
  if(!editor) return null;

  // todo: make the buttons smaller
  return(
  <BubbleMenu editor={editor}>
    <button onClick={() => editor.chain().focus().toggleBold().run()}>
      <FormatBoldIcon />
    </button>
    <button onClick={() => editor.chain().focus().toggleItalic().run()}>
      <FormatItalicIcon />
    </button>
    <button onClick={() => editor.chain().focus().toggleStrike().run()}>
      <StrikethroughSIcon />
    </button>
    <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
      <FormatListBulletedIcon />
    </button>
  </BubbleMenu>);
};