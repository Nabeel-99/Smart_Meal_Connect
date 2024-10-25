import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import React from "react";

const DialogComponent = ({
  showDialog,
  setShowDialog,
  handleAction,
  title,
  theme,
}) => {
  const handleClose = () => setShowDialog(false);
  return (
    <div>
      <Dialog
        open={showDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        PaperProps={{
          style: {
            backgroundColor: "#444444",
            color: "white",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogActions>
          <button
            onClick={handleAction}
            className="rounded-md py-2 px-3 bg-[#2c2c2c] text-white hover:bg-[#646464] transition-all duration-150"
          >
            Yes
          </button>
          <button
            onClick={handleClose}
            className="rounded-md py-2 px-3 bg-[#2c2c2c] text-white hover:bg-[#646464] transition-all duration-150"
          >
            No
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogComponent;
