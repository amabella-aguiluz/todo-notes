import { useLocalTime } from "../../../hooks/localTime";

// the preview of a note
// TODO:
// to be previewed in note selection screen
// rotate when hovered over 
export const NotePreview = ({title, description, lastModified}) => {
    
    return (
        <div>
            <div>{/*  inner div with padding */}
                <h3>{title}</h3>
                <p>Last modified: {useLocalTime(lastModified)}</p>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default NotePreview;