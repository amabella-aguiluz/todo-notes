// src/hooks/useLocalTime.js
export const useLocalTime = (isoString) => {
  if (!isoString) return "—";
  const date = new Date(isoString.replace(" ", "T")); // converts date to ISO string
  const datePart = date.toLocaleDateString(); // "1/11/2025"
  const timePart = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); 

  return `${datePart} ${timePart}`;
};
