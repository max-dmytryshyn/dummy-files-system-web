import React, { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import MenuItemInfo from "types/menuItemInfo";
import { DirectoryNoItems } from "types/items";
import useItemContextMenuItemsInfo from "hooks/useItemContextMenuItemsInfo";
import FullSpaceLoader from "uikit/FullSpaceLoader";
import EditableItemName from "components/items/EditableItemName";
import DirectoryInfo from "components/items/directory/DirectoryInfo";

interface DirectoryProps extends DirectoryNoItems {
  handleContextMenu: (event: MouseEvent, menuItems: MenuItemInfo[]) => void;
  handleCloseContextMenu: () => void;
  renameItemInDirectoryContent: (
    oldAbsolutePath: string,
    newName: string,
    newAbsolutePath: string,
  ) => void;
  removeItemFromDirectoryContent: (absolutePath: string) => void;
}

const Directory: React.FC<DirectoryProps> = ({
  name,
  absolutePath,
  modifiedAt,
  createdAt,
  handleContextMenu,
  handleCloseContextMenu,
  renameItemInDirectoryContent,
  removeItemFromDirectoryContent,
}) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);
  const handleOpen = () => {
    navigate(encodeURI(absolutePath));
  };
  const handleCloseInfo = () => {
    setIsInfoOpen(false);
  };
  const handleIconDoubleClick = () => {
    handleCloseContextMenu();
    handleOpen();
  };

  const contextMenuItemsInfo = useItemContextMenuItemsInfo({
    name,
    absolutePath,
    setIsDeleting,
    setIsInfoOpen,
    handleOpen,
    handleCloseContextMenu,
    removeItemFromDirectoryContent,
  });
  if (isDeleting) {
    return <FullSpaceLoader color={"error"} />;
  }
  return (
    <>
      <IconButton
        sx={{ borderRadius: 0 }}
        onDoubleClick={handleIconDoubleClick}
        onContextMenu={(e) => handleContextMenu(e, contextMenuItemsInfo)}
      >
        <FolderIcon sx={{ fontSize: 80 }} />
      </IconButton>
      <EditableItemName
        name={name}
        absolutePath={absolutePath}
        renameItemInDirectoryContent={renameItemInDirectoryContent}
      />
      <DirectoryInfo
        open={isInfoOpen}
        handleClose={handleCloseInfo}
        name={name}
        modifiedAt={modifiedAt}
        createdAt={createdAt}
        absolutePath={absolutePath}
      />
    </>
  );
};

export default Directory;
