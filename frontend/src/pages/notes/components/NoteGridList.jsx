//notegridlist.jsx
import NotePreview from "./NotePreview";


// list of notes
export const NoteGridList = ({notes, loading, onOpen}) => { 
    if (loading) return <p>Loading...</p>;
    return(
        <div>
            {/* grid format */}
            <div>
                {/* map through notes, renders a notepreview for each*/}
                {notes && notes.length > 0 ? (
                notes.map((note) => (
                    <NotePreview
                    key={note.id}
                    id={note.id}
                    title={note.title}
                    description={note.description}
                    updatedAt={note.updatedAt}
                    createdAt={note.createdAt}
                    onOpen={() => onOpen(note)}
                    />
                ))
                // if have no notes
                ) : (
                <p>You don’t have any notes.</p>
                )}
      </div>
        </div>
    )
}

export default NoteGridList;