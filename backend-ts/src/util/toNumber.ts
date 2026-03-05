export const toNumber = (value: unknown) => {
  const n = Number(value);
  return isNaN(n) ? null : n;
};
