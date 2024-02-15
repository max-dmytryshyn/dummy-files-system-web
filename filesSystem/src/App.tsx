import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { closeSnackbar, SnackbarProvider } from "notistack";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FilesSystem from "components/FilesSystem";

function App() {
  return (
    <Router>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        autoHideDuration={3000}
        action={(snackbarId) => (
          <IconButton onClick={() => closeSnackbar(snackbarId)}>
            <CloseIcon />
          </IconButton>
        )}
      >
        <FilesSystem />
      </SnackbarProvider>
    </Router>
  );
}

export default App;
