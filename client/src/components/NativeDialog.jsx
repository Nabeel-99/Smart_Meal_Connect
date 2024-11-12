import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import useTheme from "./UseTheme";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction={props.direction} ref={ref} {...props} />;
});
const NativeDialog = ({
  showModal,
  setShowModal,
  children,
  theme,
  direction = "up",
  title,
}) => {
  const handleClose = () => {
    setShowModal(false);
  };
  const modalTheme = useTheme(theme);

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={showModal}
        onClose={handleClose}
        TransitionComponent={Transition}
        TransitionProps={{ direction }}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: modalTheme === "dark" ? "#0c0c0c" : "#F7F7F8",
            color: modalTheme === "dark" ? "white" : "black",
          },
        }}
      >
        <AppBar
          sx={{
            position: "relative",
            backgroundColor: modalTheme === "dark" ? "#111111" : "#F7F7F8",
            color: modalTheme === "dark" ? "white" : "black",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        {children}
      </Dialog>
    </React.Fragment>
  );
};

export default NativeDialog;
