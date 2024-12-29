import { AppBar, IconButton, Link, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../state/store";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { logoutThunk } from "../../state/authThunk";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { useNavigate } from "react-router-dom";
export const Header = React.memo(() => {
  const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);
  const isLogged = useSelector(
    (state: AppRootStateType) => state.auth.auth.isLogged
  );
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

  const handleLogin = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      navigate("/login")
    },
    []
  );

  const handleMenuClose = () => {
    setAnchorElMenu(null);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleSectionClick = (path: string) => {
    navigate(path);
    handleMenuClose();
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
        <Menu
          anchorEl={anchorElMenu}
          open={Boolean(anchorElMenu)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleSectionClick('/about')}>About the project</MenuItem>
          {isLogged ? (
            <MenuItem onClick={() => handleSectionClick('/user-details')}>User details</MenuItem>
          ) : (
            <MenuItem onClick={() => handleSectionClick('/login/instructions')}>Login instructions</MenuItem>
          )}
          <MenuItem onClick={() => handleSectionClick('/help')}>Help</MenuItem>
        </Menu>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
          textTransform={"uppercase"}
        >
          Menu
        </Typography>{" "}
        {isLogged ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Link href="/login" color="inherit">
            <Button
              color="inherit"
              onClick={handleLogin}
            >
              Login
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
});
