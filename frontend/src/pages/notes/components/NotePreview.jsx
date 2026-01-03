//notespreview.jsx
import { useLocalTime } from "../../../hooks/localTime";
import { useNotePreviewContent } from "../../../hooks/useNotePreview";

// the preview of a note
// TODO:
// to be previewed in note selection screen
// rotate when hovered over 
export const NotePreview = ({ id, title, description, updatedAt, createdAt, onOpen }) => {
    // Get the first paragraph block (or fallback)
    const firstParagraph = useNotePreviewContent(description);

    return (
        <div onClick={onOpen}>
            <div>{/*  inner div with padding */}
                <h3>{title}</h3>
                <p>Last modified: {useLocalTime(updatedAt)}</p>
                <p>Created: {useLocalTime(createdAt)}</p>
                {/* Show only first paragraph */}
                {firstParagraph ? (
                    <p>{firstParagraph.content}</p>
                ) : (
                    <p>No content</p>
                )}
            </div>
        </div>
    );
};

export default NotePreview;