import { ItemType } from "types/constants";

export type Item = File | Directory;
export type ItemInList = File | DirectoryNoItems;

interface BaseItem {
  name: string;
  modifiedAt: string;
  createdAt: string;
  absolutePath: string;
  type: ItemType;
  byteSize: number;
}
export interface File extends BaseItem {
  content: string;
}

export interface DirectoryNoItems extends BaseItem {}

export interface Directory extends BaseItem {
  itemsList: ItemInList[];
}
