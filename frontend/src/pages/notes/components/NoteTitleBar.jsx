// src/components/NoteTitleBar.jsx
import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

// edit title bar
const NoteTitleBar = ({ title, setTitle, onSave, onDelete }) => {
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
      <SaveIcon onClick={onSave}/>
      {/* delete on click */}
      <DeleteIcon onClick={onDelete}/>
    </div>
  );
};

export default NoteTitleBar;
