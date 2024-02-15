import React, { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import MenuItemInfo from "types/menuItemInfo";
import { File as FileInterface } from "types/items";
import useItemContextMenuItemsInfo from "hooks/useItemContextMenuItemsInfo";
import FullSpaceLoader from "uikit/FullSpaceLoader";
import EditableItemName from "components/items/EditableItemName";
import FileInfo from "components/items/file/FileInfo";

interface FileProps extends Omit<FileInterface, "content" | "type"> {
  handleContextMenu: (event: MouseEvent, menuItems: MenuItemInfo[]) => void;
  handleCloseContextMenu: () => void;
  renameItemInDirectoryContent: (
    oldAbsolutePath: string,
    newName: string,
    newAbsolutePath: string,
  ) => void;
  removeItemFromDirectoryContent: (absolutePath: string) => void;
}

const File: React.FC<FileProps> = ({
  name,
  absolutePath,
  createdAt,
  modifiedAt,
  byteSize,
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
        <TextSnippetIcon sx={{ fontSize: 80 }} />
      </IconButton>
      <EditableItemName
        name={name}
        absolutePath={absolutePath}
        renameItemInDirectoryContent={renameItemInDirectoryContent}
      />
      <FileInfo
        open={isInfoOpen}
        handleClose={handleCloseInfo}
        name={name}
        absolutePath={absolutePath}
        createdAt={createdAt}
        modifiedAt={modifiedAt}
        byteSize={byteSize}
      />
    </>
  );
};

export default File;
