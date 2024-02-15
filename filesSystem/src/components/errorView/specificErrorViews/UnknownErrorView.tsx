import React from "react";
import { Box, Typography } from "@mui/material";

const UnknownErrorView: React.FC = () => {
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
        Unexpected error occurred
      </Typography>
      <Typography align={"center"} sx={{ fontSize: "1.5rem" }}>
        Please try again
      </Typography>
    </Box>
  );
};

export default UnknownErrorView;
