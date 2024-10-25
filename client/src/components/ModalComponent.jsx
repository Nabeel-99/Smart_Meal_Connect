import React, { Children, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ReactPlayer from "react-player";
import { color, height, width } from "@mui/system";

const ModalComponent = ({ showModal, setShowModal, children, theme }) => {
  const [modalTheme, setModalTheme] = useState(theme);
  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    if (!theme) {
      setModalTheme(systemTheme);
    } else {
      setModalTheme(theme);
    }
  }, [theme]);
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
    boxShadow: 24,
  };
  return (
    <div>
      <Modal
        keepMounted
        open={showModal}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
};

export default ModalComponent;
