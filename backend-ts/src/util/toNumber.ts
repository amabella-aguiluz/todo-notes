export const toNumber = (value: unknown) => {
  const n = Number(value);
  if (isNaN(n)) throw new Error("Invalid number");
  return n;
};
