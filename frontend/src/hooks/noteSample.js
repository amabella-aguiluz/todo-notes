// src/hooks/noteSample.js
export const noteSample = async () => {
  // pretend API call
  return [
    { id: 1,
      title: "Note 1",
      description: [
        {type: "paragraph", content: "Lorem ipsum"}],
      lastModified: "2025-01-10T14:30:00Z",
      lastCreated: "2025-01-10T14:30:00Z" },
    { id: 2,
      title: "Note 2",
      description: [
        {type: "paragraph", content: "Lorem ipsum"}],
      lastModified: "2025-02-15T09:45:00Z",
      lastCreated: "2025-01-10T14:30:00Z" },
  ];
};

export default noteSample;
