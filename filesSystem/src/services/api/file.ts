import axios, { AxiosResponse } from "axios";
import { File } from "types/items";

const baseUrl = `${process.env.REACT_APP_API_KEY}/file`;

export const updateFileContent = (
  path: string,
  content: string,
): Promise<AxiosResponse<File>> => {
  return axios.put<File>(
    `${baseUrl}/update-content`,
    {
      content,
    },
    { params: { path } },
  );
};

export const createDefaultFile = (
  path: string,
): Promise<AxiosResponse<File>> => {
  return axios.post<File>(
    `${baseUrl}/create-default`,
    {},
    {
      params: { path },
    },
  );
};
