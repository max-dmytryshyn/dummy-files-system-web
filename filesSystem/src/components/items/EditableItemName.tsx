import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { ClickAwayListener, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import getErrorDetails from "utils/getErrorDetails";
import { renameItem } from "services/api/item";

interface EditableItemNameProps {
  name: string;
  absolutePath: string;
  renameItemInDirectoryContent: (
    oldAbsolutePath: string,
    newName: string,
    newAbsolutePath: string,
  ) => void;
}

const EditableItemName: React.FC<EditableItemNameProps> = ({
  name,
  absolutePath,
  renameItemInDirectoryContent,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isRenaming, setIsRenaming] = useState<boolean>(false);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);
  const [itemName, setItemName] = useState(name);

  const handleRename = () => {
    if (itemName === name) {
      setIsRenaming(false);
      return;
    }
    setIsInputDisabled(true);
    renameItem(absolutePath, itemName)
      .then((response) => {
        renameItemInDirectoryContent(
          absolutePath,
          response.data.name,
          response.data.absolutePath,
        );
      })
      .catch((error) => {
        enqueueSnackbar(getErrorDetails(error), { variant: "error" });
      })
      .finally(() => {
        console.log(name);
        setIsInputDisabled(false);
        setItemName(name);
        setIsRenaming(false);
      });
  };
  if (isRenaming) {
    return (
      <ClickAwayListener onClickAway={handleRename}>
        <TextField
          value={itemName}
          disabled={isInputDisabled}
          autoFocus
          InputProps={{
            inputProps: {
              sx: {
                fontSize: "0.75rem",
                padding: "2px",
                textAlign: "center",
              },
            },
          }}
          sx={{ width: "70%" }}
          onChange={(e) => {
            setItemName(e.target.value);
          }}
          onFocus={(event) => {
            event.target.select();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleRename();
            }
          }}
        />
      </ClickAwayListener>
    );
  } else {
    return (
      <Typography
        noWrap
        variant="caption"
        component="span"
        onDoubleClick={(e) => {
          e.preventDefault();
          setIsRenaming(true);
        }}
        sx={{ width: "70%", textAlign: "center" }}
      >
        {name}
      </Typography>
    );
  }
};

export default EditableItemName;
