import { Snackbar } from "@mui/material";
import React from "react";

const UploadLimitSnackbar = ({
  snackbarOpen,
  handleCloseSnackbar,
  snackbarMessage,
}) => {
  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
      message={snackbarMessage}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <div className="flex flex-col gap-3 dark:bg-[#1d1d1d] bg-[#e2e2e2] border-[#08090a] p-8 rounded-md">
        <div>{snackbarMessage}</div>
        <div className="flex items-end justify-end mt-4">
          <button
            className="bg-blue-600 text-white hover:bg-blue-800 py-1 w-14 px-2 text-sm rounded-md"
            onClick={handleCloseSnackbar}
          >
            OK
          </button>
        </div>
      </div>
    </Snackbar>
  );
};

export default UploadLimitSnackbar;
