import AppRoutes from "@constants/appRoutes";
import useAuth from "@context/useAuth";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AlertDialog from "./common/AlertDialog";
import RtlMui from "./common/RtlMui";

export default function AdminAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { user, logout } = useAuth();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClicked = () => {
    setAnchorEl(null);
    navigate(AppRoutes.Profile, {
      replace: location.pathname === AppRoutes.Profile,
    });
  };

  const handleLogout = () => {
    setLogoutDialogOpen(true);
  };

  return (
    <>
      <RtlMui>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                سامانه مانیتورینگ بار استان
              </Typography>
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleProfileClicked}>
                    {user?.name}
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>خروج</MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </AppBar>
        </Box>
      </RtlMui>
      <AlertDialog
        title={"خروج"}
        description={"آیا از حساب کاربری خود خارج میشوید؟"}
        action={logout}
        open={logoutDialogOpen}
        onCloseClicked={() => setLogoutDialogOpen(false)}
      />
    </>
  );
}
