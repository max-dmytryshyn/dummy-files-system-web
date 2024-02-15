import axios, { AxiosResponse } from "axios";
import { Item } from "types/items";

const baseUrl = `${process.env.REACT_APP_API_KEY}/item`;

export const getItemByPath = (
  path: string,
  calculateDirectoriesSize: boolean = false,
): Promise<AxiosResponse<Item>> => {
  return axios.get<Item>(`${baseUrl}/get-by-path`, {
    params: { path, calculateDirectoriesSize },
  });
};

export const renameItem = (
  path: string,
  name: string,
): Promise<AxiosResponse<Item>> => {
  return axios.put<Item>(
    `${baseUrl}/rename`,
    {
      name,
    },
    { params: { path } },
  );
};

export const deleteItem = (path: string): Promise<AxiosResponse<null>> => {
  return axios.delete<null>(`${baseUrl}/delete`, { params: { path } });
};
