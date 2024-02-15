import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Directory } from "types/items";

interface DirectoryInfoProps
  extends Omit<Directory, "itemsList" | "type" | "byteSize"> {
  open: boolean;
  handleClose: () => void;
}

const DirectoryInfo: React.FC<DirectoryInfoProps> = ({
  open,
  handleClose,
  name,
  modifiedAt,
  createdAt,
  absolutePath,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        <Typography align={"center"} fontWeight={"bold"} fontSize={"1.5rem"}>
          {name} Details
        </Typography>
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant="body1">Name:</Typography>
            <Typography variant="body1">Modified At:</Typography>
            <Typography variant="body1">Created At:</Typography>
            <Typography variant="body1">Absolute Path:</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="body1">{name}</Typography>
            <Typography variant="body1">
              {new Date(modifiedAt).toUTCString()}
            </Typography>
            <Typography variant="body1">
              {new Date(createdAt).toUTCString()}
            </Typography>
            <Typography variant="body1">{absolutePath}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default DirectoryInfo;
