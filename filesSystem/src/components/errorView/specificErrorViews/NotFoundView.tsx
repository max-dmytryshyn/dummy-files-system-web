import React from "react";
import { Box, Typography } from "@mui/material";

interface NotFoundViewProps {
  message: string;
}

const NotFoundView: React.FC<NotFoundViewProps> = ({ message }) => {
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
      <Typography align={"center"} sx={{ fontSize: "2rem" }}>
        404 NOT FOUND
      </Typography>
      <Typography align={"center"} sx={{ fontSize: "1.5rem" }}>
        {message}
      </Typography>
    </Box>
  );
};

export default NotFoundView;
