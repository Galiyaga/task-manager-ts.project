import { Button, Menu, MenuItem, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { logoutThunk } from "../../state/authThunk";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { useNavigate } from "react-router-dom";

export type MenuPropsType = {
  anchorElMenu: HTMLElement | null;
  handleMenuClose: () => void;
};

export const MenuWithAuthorization = React.memo((props: MenuPropsType) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      dispatch(logoutThunk());
      navigate("/login");
    },
    [dispatch]
  );

  return (
    <>
      <Menu
        anchorEl={props.anchorElMenu}
        open={Boolean(props.anchorElMenu)}
        onClose={props.handleMenuClose}
      >
        <MenuItem onClick={props.handleMenuClose}>About the project</MenuItem>
        <MenuItem onClick={props.handleMenuClose}>User details</MenuItem>
        <MenuItem onClick={props.handleMenuClose}>Help</MenuItem>
      </Menu>
      <Typography variant="h6" sx={{ flexGrow: 1 }} textTransform={"uppercase"}>
        Menu
      </Typography>{" "}
      <Button color="inherit" onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
});
