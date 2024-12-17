import { Button, Link, Menu, MenuItem, Typography} from "@mui/material";
import React from "react";
import { useState } from "react";
import { MenuPropsType } from "./MenuWithAuthorization";
import { useNavigate } from "react-router-dom";

export const MenuWithoutAuthorization = React.memo((props: MenuPropsType) => {

  return (
    <>
      <Menu
        anchorEl={props.anchorElMenu}
        open={Boolean(props.anchorElMenu)}
        onClose={props.handleMenuClose}
      >
        <MenuItem onClick={props.handleMenuClose}>About the project</MenuItem>
        <MenuItem onClick={props.handleMenuClose}>Login instructions</MenuItem>
        <MenuItem onClick={props.handleMenuClose}>Help</MenuItem>
      </Menu>
      <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
          textTransform={"uppercase"}
        >
          Menu
        </Typography>
        <Link href="/login" color="inherit">
          <Button color="inherit" onClick={(e: React.MouseEvent<HTMLElement>) => e.preventDefault()}>Login</Button>
        </Link>
    </>
  );
});
