import { GetItemByPathError, ItemType } from "types/constants";
import { Directory } from "types/items";

export interface DirectoryView {
  type: ItemType.DIRECTORY;
  data: Directory;
}

export interface FileView {
  type: ItemType.FILE;
  data: {
    content: string;
    name: string;
    absolutePath: string;
  };
}

export interface ErrorView {
  type: GetItemByPathError;
  data: {
    message: string;
  };
}
