import React, { MouseEvent } from "react";
import { Grid } from "@mui/material";
import {
  Directory as DirectoryType,
  File as FileType,
  ItemInList,
} from "types/items";
import { ItemType } from "types/constants";
import MenuItemInfo from "types/menuItemInfo";
import FullSpaceLoader from "uikit/FullSpaceLoader";
import File from "components/items/file/File";
import Directory from "components/items/directory/Directory";

interface DirectoryContentItemsProps {
  items: ItemInList[];
  isLoading: boolean;
  isNewItemLoading: boolean;
  handleContextMenu: (event: MouseEvent, menuItems: MenuItemInfo[]) => void;
  renameItemInDirectoryContent: (
    oldAbsolutePath: string,
    newName: string,
    newAbsolutePath: string,
  ) => void;
  removeItemFromDirectoryContent: (absolutePath: string) => void;
  handleCloseContextMenu: () => void;
}

const DirectoryContentItems: React.FC<DirectoryContentItemsProps> = ({
  items,
  handleContextMenu,
  isLoading,
  isNewItemLoading,
  renameItemInDirectoryContent,
  handleCloseContextMenu,
  removeItemFromDirectoryContent,
}) => {
  if (isLoading) {
    return <FullSpaceLoader />;
  }
  return (
    <Grid container spacing={2}>
      {isNewItemLoading && (
        <Grid
          item
          xs={3}
          sm={2}
          md={1.5}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FullSpaceLoader color={"success"} />
        </Grid>
      )}
      {items.map((item) => {
        let itemComponent;
        switch (item.type) {
          case ItemType.FILE:
            itemComponent = (
              <File
                handleContextMenu={handleContextMenu}
                handleCloseContextMenu={handleCloseContextMenu}
                renameItemInDirectoryContent={renameItemInDirectoryContent}
                removeItemFromDirectoryContent={removeItemFromDirectoryContent}
                {...(item as FileType)}
              />
            );
            break;

          case ItemType.DIRECTORY:
            itemComponent = (
              <Directory
                handleContextMenu={handleContextMenu}
                handleCloseContextMenu={handleCloseContextMenu}
                renameItemInDirectoryContent={renameItemInDirectoryContent}
                removeItemFromDirectoryContent={removeItemFromDirectoryContent}
                {...(item as DirectoryType)}
              />
            );
            break;
        }
        return (
          <Grid
            item
            xs={3}
            sm={2}
            md={1.5}
            key={item.absolutePath}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {itemComponent}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default DirectoryContentItems;
