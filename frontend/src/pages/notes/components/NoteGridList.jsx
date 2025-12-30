import NotePreview from "./NotePreview";
import ActionBar from "./actionBar";

// list of notes
export const NoteGridList = ({notes, loading}) => {
    console.log("Notes in grid list:", notes);
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
                    title={note.title}
                    description={note.description}
                    lastModified={note.lastModified}
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