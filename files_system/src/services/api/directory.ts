import axios, { AxiosResponse } from "axios";
import { ItemInList, DirectoryNoItems } from "types/items";

const baseUrl = `${process.env.REACT_APP_API_KEY}/directory`;

export const searchInDirectory = (
  keyword: string,
  directoryPath: string,
  calculateDirectoriesSize: boolean = false,
): Promise<AxiosResponse<ItemInList[]>> => {
  return axios.get<ItemInList[]>(`${baseUrl}/search`, {
    params: { keyword, path: directoryPath, calculateDirectoriesSize },
  });
};

export const createDefaultDirectory = (
  path: string,
): Promise<AxiosResponse<DirectoryNoItems>> => {
  return axios.post<DirectoryNoItems>(
    `${baseUrl}/create-default`,
    {},
    {
      params: { path },
    },
  );
};
