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
import { Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState, MouseEvent } from "react";
import DarkModeToggle from "./DarkModeToggle";
import Logo from "../assets/shelfwise-logo-fancy.png";
import useMe from "../hooks/useMe";
import useUserRoles from "../hooks/useUserRoles";
import { EUserRoles } from "../entities/constants";

interface Props {
  toggleOnChange?: (theme: "light" | "dark") => void;
  onMenuBtnClick?: () => void;
}

let settings = ["Profile", "Account", "Logout"];

const NavBar = ({ toggleOnChange, onMenuBtnClick }: Props) => {
  const { data: user } = useMe();
  
  const { data: userRoles } = useUserRoles();

  if (
    user?.role &&
    userRoles &&
    user.role.precedence >= userRoles[EUserRoles.Manager]
  )
    settings = ["Profile", "Account", "Dashboard", "Logout"];

  // if (userRoles.)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
    console.log(event.target);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" color="secondary" enableColorOnDark>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={onMenuBtnClick}
          >
            <MenuIcon />
          </IconButton>
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
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ShelfWise
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              size="large"
              color="inherit"
              sx={{ pr: 0, display: { xs: "none", md: "inline" } }}
            >
              <DarkModeToggle
                lightColor="white"
                darkColor="white"
                onChange={toggleOnChange}
              />
            </IconButton>
            {user?.userId && (
              <>
                <IconButton size="large" color="inherit" sx={{ pr: 0 }}>
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon fontSize="large" />
                  </Badge>
                </IconButton>
                <Tooltip title="User Info">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    size="large"
                    sx={{ pr: 0 }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
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
                <MenuItem key={setting} onClick={handleCloseUserMenu} hidden>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
              <MenuItem>
                <IconButton
                  size="large"
                  color="inherit"
                  sx={{ pr: 0, display: { xs: "inline", md: "none" } }}
                >
                  <DarkModeToggle
                    lightColor="white"
                    darkColor="white"
                    onChange={toggleOnChange}
                  />
                </IconButton>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
