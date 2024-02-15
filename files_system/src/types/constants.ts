export enum ItemType {
  FILE = "FILE",
  DIRECTORY = "DIRECTORY",
}

export enum GetItemByPathError {
  NOT_FOUND = "NOT_FOUND",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

export const SortableFields = [
  "name",
  "byteSize",
  "createdAt",
  "modifiedAt",
] as const;
export type SortableField = (typeof SortableFields)[number];
