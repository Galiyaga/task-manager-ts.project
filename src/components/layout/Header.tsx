import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../state/store";
import { MenuWithAuthorization } from "./MenuWithAuthorization";
import { MenuWithoutAuthorization } from "./MenuWithoutAuthorization";
import React from "react";

export const Header = React.memo(() => {
  const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);
  const isLogged = useSelector(
    (state: AppRootStateType) => state.auth.auth.isLogged
  );

  const handleMenuClose = () => {
    setAnchorElMenu(null);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMenu(event.currentTarget);
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        {isLogged ? <MenuWithAuthorization anchorElMenu={anchorElMenu} handleMenuClose={handleMenuClose} /> : <MenuWithoutAuthorization anchorElMenu={anchorElMenu} handleMenuClose={handleMenuClose}/>}
      </Toolbar>
    </AppBar>
  );
})
