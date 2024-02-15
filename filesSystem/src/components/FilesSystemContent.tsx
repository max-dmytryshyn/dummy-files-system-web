import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Directory, File, ItemInList } from "types/items";
import { GetItemByPathError, ItemType } from "types/constants";
import {
  DirectoryView,
  ErrorView as ErrorViewType,
  FileView,
} from "types/filesSystemContent";
import getErrorDetails from "utils/getErrorDetails";
import { getItemByPath } from "services/api/item";
import FullSpaceLoader from "uikit/FullSpaceLoader";
import FileContent from "components/items/file/FileContent";
import DirectoryContent from "components/items/directory/directoryContent/DirectoryContent";
import ErrorView from "components/errorView/ErrorView";

const FilesSystemContent: React.FC = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [content, setContent] = useState<
    DirectoryView | FileView | ErrorViewType | null
  >(null);

  useEffect(() => {
    handleUrlChange(location.pathname);
  }, [location.pathname]);

  const handleUrlChange = (newUrl: string) => {
    setIsLoading(true);
    getItemByPath(decodeURI(newUrl))
      .then((response) => {
        const data = response.data;
        switch (data.type) {
          case ItemType.DIRECTORY:
            const directoryData = data as Directory;
            setContent({
              type: ItemType.DIRECTORY,
              data: directoryData,
            });
            break;
          case ItemType.FILE:
            const fileData = data as File;
            setContent({
              type: ItemType.FILE,
              data: {
                content: fileData.content,
                name: fileData.name,
                absolutePath: fileData.absolutePath,
              },
            });
        }
      })
      .catch((error) => {
        switch (error?.response?.status) {
          case 404:
            setContent({
              type: GetItemByPathError.NOT_FOUND,
              data: {
                message: getErrorDetails(error),
              },
            });
            break;
          default:
            setContent({
              type: GetItemByPathError.UNKNOWN_ERROR,
              data: {
                message: getErrorDetails(error),
              },
            });
            break;
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const renameItemInDirectoryContent = (
    oldAbsolutePath: string,
    newName: string,
    newAbsolutePath: string,
  ): void => {
    setContent((prevState) => {
      if (prevState?.type !== ItemType.DIRECTORY) {
        return prevState;
      }
      return {
        ...prevState,
        data: {
          ...prevState.data,
          itemsList: prevState.data.itemsList.reduce<ItemInList[]>(
            (previousValue, currentValue) => {
              if (currentValue.absolutePath === oldAbsolutePath) {
                return [
                  ...previousValue,
                  {
                    ...currentValue,
                    name: newName,
                    absolutePath: newAbsolutePath,
                  },
                ];
              }
              return [...previousValue, currentValue];
            },
            [],
          ),
        },
      };
    });
  };

  const addItemToDirectoryContent = (item: ItemInList): void => {
    setContent((prevState) => {
      if (prevState?.type !== ItemType.DIRECTORY) {
        return prevState;
      }
      return {
        ...prevState,
        data: {
          ...prevState.data,
          itemsList: [...prevState.data.itemsList, item],
        },
      };
    });
  };

  const removeItemFromDirectoryContent = (absolutePath: string): void => {
    setContent((prevState) => {
      if (prevState?.type !== ItemType.DIRECTORY) {
        return prevState;
      }
      return {
        ...prevState,
        data: {
          ...prevState.data,
          itemsList: prevState.data.itemsList.reduce<ItemInList[]>(
            (previousValue, currentValue) => {
              if (currentValue.absolutePath === absolutePath) {
                return [...previousValue];
              }
              return [...previousValue, currentValue];
            },
            [],
          ),
        },
      };
    });
  };

  if (isLoading) {
    return <FullSpaceLoader />;
  }

  if (content?.type === ItemType.DIRECTORY) {
    return (
      <DirectoryContent
        {...content.data}
        renameItemInDirectoryContent={renameItemInDirectoryContent}
        addItemToDirectoryContent={addItemToDirectoryContent}
        removeItemFromDirectoryContent={removeItemFromDirectoryContent}
      />
    );
  }
  if (content?.type === ItemType.FILE) {
    return <FileContent {...content.data} />;
  }

  if (content?.type) {
    return <ErrorView type={content.type} message={content.data.message} />;
  }

  return <></>;
};

export default FilesSystemContent;
