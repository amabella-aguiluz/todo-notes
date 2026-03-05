//notespreview.jsx
import { useLocalTime } from "../../../util/localTime";
import { useNotePreviewContent } from "../../../hooks/notes/useNotePreview";

// the preview of a note
// TODO:
// to be previewed in note selection screen
// rotate when hovered over 
export const NotePreview = ({ id, title, description, updated_at, created_at, onOpen }) => {
    // Get the first paragraph block (or fallback)
    const firstParagraph = useNotePreviewContent(description);

    return (
        <div onClick={onOpen}>
            <div>{/*  inner div with padding */}
                <h3>{title}</h3>
                <p>Last modified: {useLocalTime(updated_at)}</p>
                <p>Created: {useLocalTime(created_at)}</p>
                {/* Show only first paragraph */}
                <p>{firstParagraph || "No content"}</p>
            </div>
        </div>
    );
};

export default NotePreview;