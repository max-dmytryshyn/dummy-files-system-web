import React from "react";
import { Container } from "@mui/material";
import FilesSystemContent from "components/FilesSystemContent";

const FilesSystem: React.FC = () => {
  return (
    <Container
      maxWidth={"lg"}
      sx={{
        height: "100vh",
        paddingTop: "16px",
        borderLeft: 1,
        borderRight: 1,
        borderColor: "lightgrey",
      }}
    >
      <FilesSystemContent />
    </Container>
  );
};

export default FilesSystem;
