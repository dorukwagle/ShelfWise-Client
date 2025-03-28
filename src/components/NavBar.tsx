import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Badge, Button } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState, MouseEvent, useContext } from "react";
import Logo from "../assets/shelfwise-logo-fancy.png";
import useMe from "../hooks/useMe";
import useUserRoles from "../hooks/useUserRoles";
import { EUserRoles } from "../entities/constants";
import useLogout from "../auth/hooks/useLogout";
import { useNavigate } from "react-router-dom";

import ThemeToggleButton from "./ThemeToggleButton";
import { ColorModeContext } from "../ThemedApp";
import fetchNotificationCount from "../notification/hooks/getCountNotifications";

interface Props {
  toggleOnChange?: (theme: "light" | "dark") => void;
  onMenuBtnClick?: () => void;
}

let settings = ["Profile", "Account", "Logout"];

const NavBar = ({ onMenuBtnClick }: Props) => {
  const { data: notificationCount, error } = fetchNotificationCount();
  const { data: user } = useMe();
  const { mode } = useContext(ColorModeContext);
  const { data: userRoles } = useUserRoles();
  const navigate = useNavigate();

  if (
    user?.role &&
    userRoles &&
    user.role.precedence >= userRoles[EUserRoles.Manager]
  )
    settings = ["Profile", "Account", "Logout"];

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutMutation = useLogout(() => {
    navigate("/sign-in"); // Redirect user after logout
  });

  const handleLogout = () => {
    logoutMutation.mutate(); // Call logout mutation
  };

  const handleNotificationClick = () => {
    navigate("/notifications");
  };

  const menuActions: Record<string, () => void> = {
    Profile: () => navigate("/profile"),
    Account: () => navigate("/account"),
    Logout: handleLogout,
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: mode === "light" ? "#ADD8E6" : "#001f3f",
      }}
      enableColorOnDark
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {user?.userId && <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={onMenuBtnClick}
          >
            <MenuIcon sx={{ color: "text.primary" }} />
          </IconButton>}
          <IconButton size="large" sx={{ p: 0 }}>
            <Avatar src={Logo} />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 500,
              letterSpacing: ".1rem",
              color: "text.primary",
              textDecoration: "none",
            }}
          >
            ShelfWise
          </Typography>
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
          {!(user?.userId) && <Button size="small" variant="contained" onClick={() => navigate("/sign-in")}>
           Sign In
          </Button>}
            <ThemeToggleButton />
            {user?.userId && (
              <>
                <IconButton size="large" color="inherit" sx={{ pr: 0 }} onClick={handleNotificationClick}>
                  <Badge badgeContent={error ? 0 : notificationCount?.count || 0} color="error">
                    <NotificationsIcon sx={{ color: "text.primary" }} fontSize="large" />
                  </Badge>
                </IconButton>
                <Tooltip title="User Info">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    size="large"
                    sx={{ pr: 0 }}
                  >
                    <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
              </>
            )}
            
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={menuActions[setting]}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
