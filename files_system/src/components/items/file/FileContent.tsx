import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
  Box,
  LinearProgress,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import getParentPath from "utils/getParentPath";
import getErrorDetails from "utils/getErrorDetails";
import { updateFileContent } from "services/api/file";

interface FileContentProps {
  content: string;
  name: string;
  absolutePath: string;
}

const FileContent: React.FC<FileContentProps> = ({
  content,
  name,
  absolutePath,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [text, setText] = useState(content);
  const [rowsCount, setRowsCount] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onClose = () => {
    navigate(getParentPath(absolutePath));
  };
  const handleSave = () => {
    setIsLoading(true);
    updateFileContent(absolutePath, text)
      .then(() => {
        enqueueSnackbar(`File "${name}" saved successfully`, {
          variant: "success",
        });
        onClose();
      })
      .catch((error) => {
        enqueueSnackbar(getErrorDetails(error), { variant: "error" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setRowsCount(Math.floor(window.innerHeight / 30));
  }, []);
  return (
    <Box>
      <Typography variant={"h5"} textAlign={"center"}>
        {name}
      </Typography>
      <TextField
        multiline
        rows={rowsCount}
        fullWidth
        value={text}
        disabled={isLoading}
        sx={{ marginBottom: "4px" }}
        onChange={(e) => setText(e.target.value)}
      />
      {isLoading && <LinearProgress />}
      <Box
        sx={{
          paddingTop: "16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="contained"
          size={"large"}
          disabled={isLoading}
          color={"inherit"}
          sx={{ width: "47%" }}
          onClick={onClose}
        >
          Close
        </Button>
        <Button
          variant="contained"
          size={"large"}
          disabled={isLoading}
          sx={{ width: "47%" }}
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default FileContent;
