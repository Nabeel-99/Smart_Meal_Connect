import { Snackbar } from "@mui/material";
import React, { useState } from "react";

const AutoHideSnackbar = ({
  message,
  openSnackbar,
  setSnackbar,
  positionX = "bottom",
  positionY = "left",
}) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar(false);
  };

  return (
    <div>
      <Snackbar
        ContentProps={{
          sx: {
            backgroundColor: "white",
            color: "black",
          },
        }}
        anchorOrigin={{ vertical: `${positionX}`, horizontal: `${positionY}` }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
      />
    </div>
  );
};

export default AutoHideSnackbar;
