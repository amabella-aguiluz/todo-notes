//hooks/useNoteSave.js
import { useState } from "react";

export const useNoteSave = (noteId, saveNote) => {
  const [saving, setSaving] = useState(false);

  const onSave = async () => {
    const updated = saveNote();
    if (!updated) return;

    setSaving(true);

    try {
      const res = await fetch(`/api/notes/${noteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save note");
      }

      const data = await res.json();
      console.log("Saved:", data.updatedNote);

      return data.updatedNote;
    } catch (err) {
      console.error("Save failed:", err.message);
      alert(`Failed to save note: ${err.message}`);
      return null;
    } finally {
      setSaving(false);
    }
  };

  return { onSave, saving };
};
