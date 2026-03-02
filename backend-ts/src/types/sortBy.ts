
export const sort_fields = ["title", "created_at", "updated_at"] as const;
export const order = ["asc", "desc"] as const;
export type sortBy = (typeof sort_fields)[number];
export type orderBy = (typeof order)[number];
