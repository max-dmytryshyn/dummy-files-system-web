import React from "react";
import { Box, CircularProgress } from "@mui/material";

interface FullSpaceLoaderProps {
  color?:
    | "inherit"
    | "error"
    | "success"
    | "warning"
    | "info"
    | "primary"
    | "secondary";
}

const FullSpaceLoader: React.FC<FullSpaceLoaderProps> = ({
  color = "inherit",
}) => {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress color={color} />
    </Box>
  );
};

export default FullSpaceLoader;
