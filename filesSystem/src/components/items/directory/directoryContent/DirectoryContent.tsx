import React, { MouseEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Box } from "@mui/material";
import VirtualElement from "types/virtualElement";
import MenuItemInfo from "types/menuItemInfo";
import { ItemInList, Directory } from "types/items";
import getParentPath from "utils/getParentPath";
import getErrorDetails from "utils/getErrorDetails";
import { createDefaultDirectory } from "services/api/directory";
import { createDefaultFile } from "services/api/file";
import DirectoryNavbar from "components/items/directory/directoryContent/directoryNavbar/DirectoryNavbar";
import DirectoryContentItems from "components/items/directory/directoryContent/DirectoryContentItems";
import DirectoryContentContextMenu from "components/items/directory/directoryContent/DirectoryContentContextMenu";

interface DirectoryContentProps extends Directory {
  renameItemInDirectoryContent: (
    oldAbsolutePath: string,
    newName: string,
    newAbsolutePath: string,
  ) => void;
  addItemToDirectoryContent: (item: ItemInList) => void;
  removeItemFromDirectoryContent: (absolutePath: string) => void;
}

const DirectoryContent: React.FC<DirectoryContentProps> = ({
  itemsList,
  name,
  absolutePath,
  renameItemInDirectoryContent,
  addItemToDirectoryContent,
  removeItemFromDirectoryContent,
}) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [rearrangedItems, setRearrangedItems] = useState<ItemInList[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNewItemLoading, setIsNewItemLoading] = useState<boolean>(false);
  const [isSearchView, setIsSearchView] = useState<boolean>(false);

  const anchorRef = useRef<VirtualElement | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState<boolean>(false);
  const [contextMenuItems, setContextMenuItems] = useState<MenuItemInfo[]>([]);

  const handleContextMenu = (
    event: MouseEvent,
    menuItems: MenuItemInfo[],
  ): void => {
    if (isSearchView) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    const rect = {
      width: 0,
      height: 0,
      top: event.clientY,
      right: event.clientX,
      bottom: event.clientY,
      left: event.clientX,
    } as DOMRect;
    anchorRef.current = {
      getBoundingClientRect: () => rect,
    };
    setContextMenuItems(menuItems);
    setIsContextMenuOpen(true);
  };
  const handleCloseContextMenu = () => {
    setIsContextMenuOpen(false);
  };
  const onGoBack = () => {
    navigate(getParentPath(absolutePath));
  };

  const handleCreateFile = () => {
    handleCloseContextMenu();
    setIsNewItemLoading(true);
    createDefaultFile(absolutePath)
      .then((response) => {
        addItemToDirectoryContent(response.data);
        enqueueSnackbar(`File "${response.data.name}" created successfully`, {
          variant: "success",
        });
      })
      .catch((error) => {
        enqueueSnackbar(getErrorDetails(error), { variant: "error" });
      })
      .finally(() => {
        setIsNewItemLoading(false);
      });
  };

  const handleCreateDirectory = () => {
    handleCloseContextMenu();
    setIsNewItemLoading(true);
    createDefaultDirectory(absolutePath)
      .then((response) => {
        addItemToDirectoryContent(response.data);
        enqueueSnackbar(
          `Directory "${response.data.name}" created successfully`,
          {
            variant: "success",
          },
        );
      })
      .catch((error) => {
        enqueueSnackbar(getErrorDetails(error), { variant: "error" });
      })
      .finally(() => {
        setIsNewItemLoading(false);
      });
  };

  const contextMenuItemsInfo: MenuItemInfo[] = [
    {
      name: "createFile",
      label: "Create File",
      action: handleCreateFile,
    },
    {
      name: "createDirectory",
      label: "Create Directory",
      action: handleCreateDirectory,
    },
  ];

  return (
    <Box
      sx={{ height: "100%" }}
      onContextMenu={(e) => handleContextMenu(e, contextMenuItemsInfo)}
      ref={boxRef}
    >
      <DirectoryNavbar
        name={name}
        absolutePath={absolutePath}
        onGoBack={onGoBack}
        goBackDisabled={absolutePath === "/"}
        setItems={setRearrangedItems}
        directoryItems={itemsList}
        items={rearrangedItems.length !== 0 ? rearrangedItems : itemsList}
        isSearchView={isSearchView}
        setIsSearchView={setIsSearchView}
        setIsLoading={setIsLoading}
      />
      <DirectoryContentItems
        items={rearrangedItems}
        isLoading={isLoading}
        isNewItemLoading={isNewItemLoading}
        renameItemInDirectoryContent={renameItemInDirectoryContent}
        removeItemFromDirectoryContent={removeItemFromDirectoryContent}
        handleContextMenu={handleContextMenu}
        handleCloseContextMenu={handleCloseContextMenu}
      />
      <DirectoryContentContextMenu
        anchorRef={anchorRef}
        isOpen={isContextMenuOpen}
        handleClose={handleCloseContextMenu}
        menuItems={contextMenuItems}
      />
    </Box>
  );
};

export default DirectoryContent;
