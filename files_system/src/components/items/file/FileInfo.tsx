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
import { File } from "types/items";

interface FileInfoProps extends Omit<File, "content" | "type"> {
  open: boolean;
  handleClose: () => void;
}

const FileInfo: React.FC<FileInfoProps> = ({
  open,
  handleClose,
  name,
  modifiedAt,
  createdAt,
  absolutePath,
  byteSize,
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
            <Typography variant="body1">Byte Size:</Typography>
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
            <Typography variant="body1">{byteSize}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default FileInfo;
