import {
  Popper,
  Button,
  ClickAwayListener,
  MenuItem,
  MenuList,
} from "@mui/material";
import React from "react";
import { CiGrid41 } from "react-icons/ci";
import { HiBars3 } from "react-icons/hi2";

const PopperComponent = ({
  viewPopper,
  setViewPopper,
  anchorRef,
  children,
  isNotification = false,
}) => {
  const handleClose = () => {
    setViewPopper(false);
  };

  return (
    <Popper open={viewPopper} anchorEl={anchorRef.current} placement="bottom">
      <ClickAwayListener
        onClickAway={(e) => {
          if (anchorRef.current && anchorRef.current.contains(e.target)) return;
          handleClose();
        }}
      >
        <div
          className={`dark:text-white text-black ${
            isNotification ? "w-96 xl:hidden" : ""
          }  `}
        >
          {" "}
          {children}
        </div>
      </ClickAwayListener>
    </Popper>
  );
};

export default PopperComponent;
