//notespreview.jsx
import { useLocalTime } from "../../../hooks/localTime";

// the preview of a note
// TODO:
// to be previewed in note selection screen
// rotate when hovered over 
export const NotePreview = ({ id, title, description, lastModified, lastCreated, onOpen }) => {
    // Get the first paragraph block (or fallback)
    const firstParagraph = description?.find(block => block.type === "paragraph");

    return (
        <div onClick={onOpen}>
            <div>{/*  inner div with padding */}
                <h3>{title}</h3>
                <p>Last modified: {useLocalTime(lastModified)}</p>
                <p>Created: {useLocalTime(lastCreated)}</p>
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