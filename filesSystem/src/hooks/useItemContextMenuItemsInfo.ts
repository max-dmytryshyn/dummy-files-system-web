import React from "react";
import { useSnackbar } from "notistack";
import MenuItemInfo from "types/menuItemInfo";
import getErrorDetails from "utils/getErrorDetails";
import { deleteItem } from "services/api/item";

interface useItemContextMenuItemsProps {
  name: string;
  absolutePath: string;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  setIsInfoOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpen: () => void;
  handleCloseContextMenu: () => void;
  removeItemFromDirectoryContent: (absolutePath: string) => void;
}

const useItemContextMenuItemsInfo = ({
  name,
  absolutePath,
  setIsDeleting,
  setIsInfoOpen,
  handleOpen,
  handleCloseContextMenu,
  removeItemFromDirectoryContent,
}: useItemContextMenuItemsProps): MenuItemInfo[] => {
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = () => {
    handleCloseContextMenu();
    setIsDeleting(true);
    deleteItem(absolutePath)
      .then(() => {
        removeItemFromDirectoryContent(absolutePath);
        enqueueSnackbar(`"${name}" deleted successfully`, {
          variant: "success",
        });
      })
      .catch((error) => {
        enqueueSnackbar(getErrorDetails(error), { variant: "error" });
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };
  const handleOpenInfo = () => {
    handleCloseContextMenu();
    setIsInfoOpen(true);
  };
  return [
    {
      name: "open",
      label: "Open",
      action: handleOpen,
    },
    {
      name: "info",
      label: "Info",
      action: handleOpenInfo,
    },
    {
      name: "delete",
      label: "Delete",
      action: handleDelete,
    },
  ];
};

export default useItemContextMenuItemsInfo;
