import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import useTheme from "../UseTheme";

const ModalComponent = ({ showModal, setShowModal, children, theme }) => {
  const modalTheme = useTheme(theme);

  const handleClose = () => setShowModal(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      sm: 500,
      md: 720,
      lg: 960,
      xl: 1080,
    },
    bgcolor: modalTheme === "dark" ? "black" : "#F7F7F8",
    border: modalTheme === "dark" ? "2px solid #1f1f1f" : "2px solid #E0E0E0",
    color: modalTheme === "dark" ? "white" : "black",
    boxShadow: 2,
  };

  const backdropStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  };

  return (
    <div>
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        slotProps={{
          backdrop: {
            style: backdropStyle,
          },
        }}
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
};

export default ModalComponent;
