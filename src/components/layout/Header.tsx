import {
  AppBar,
  Button,
  IconButton,
  Menu,
  Toolbar,
  Typography,
  MenuItem,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from "react";

export default function Header() {
  const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElMenu(null);
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
          <MenuItem onClick={handleMenuClose}>Пункт 1</MenuItem>
          <MenuItem onClick={handleMenuClose}>Пункт 2</MenuItem>
          <MenuItem onClick={handleMenuClose}>Пункт 3</MenuItem>
        </Menu>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>News</Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}
