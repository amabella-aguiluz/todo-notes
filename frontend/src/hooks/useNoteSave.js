//hooks/useNoteSave.js
import { useState } from "react";

export const useNoteSave = (noteId, saveNote) => {
  const [saving, setSaving] = useState(false);

  const onSave = async () => {
    const updated = saveNote();
    if (!updated) return;

    setSaving(true);

    try {
      // fetch note id
      // put {new id content} into json
      // update json string
      const res = await fetch(`/api/notes/${noteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        description: JSON.stringify(updated),
      });

      //error
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save note");
      }

      // save updated json
      const data = await res.json();
      console.log("Saved:", data.updatedNote);

      return data.updatedNote;
    }

    // error catch
    catch (err) {
      console.error("Save failed:", err.message);
      alert(`Failed to save note: ${err.message}`);
      return null;
    }
    // end saving state
    finally {
      setSaving(false);
    }
  };

  return { onSave, saving };
};
