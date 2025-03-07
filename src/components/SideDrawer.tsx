import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { BookOnline, Home, Info, Category, School } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ColorModeContext } from "../ThemedApp";
import useMe from "../hooks/useMe";
const drawerWidth = 240;

interface Props {
  isOpen?: boolean;
  onNavigate?: () => void;
}

const SideDrawer = ({ isOpen = false, onNavigate }: Props) => {
  const navigate = useNavigate();
  const { mode } = useContext(ColorModeContext); // Get the current theme mode
  const { data: user } = useMe();
  console.log(user);
  

  const publicPages = [
    { text: "Home", link: "/dashboard", icon: <Home /> },
    { text: "Online Books", link: "/online-books", icon: <BookOnline /> },
    { text: "About", link: "/about", icon: <Info /> },
  ];

  const privatePages = [
    { text: "Home", link: "/dashboard", icon: <Home /> },
    { text: "Online Books", link: "/online-books", icon: <BookOnline /> },
    { text: "Attributes", link: "/attributes", icon: <Category /> },
    { text: "Enrollments", link: "/enrollments", icon: <School /> },
    { text: "Request List", link: "/enrollments-request", icon: <School /> },
    { text: "About", link: "", icon: <Info /> },
  ];

  const onLinkClick = (link: string) => {
    navigate(link);
    onNavigate && onNavigate();
  };

  return (
    <Drawer
      variant="temporary"
      open={isOpen}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: mode === "light" ? "#ADD8E6" : "#001f3f",
          color: "text.primary",
        },
        zIndex: 0,
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        {user?.role?.role !== "Member" ? (
          <List>
            {privatePages.map(({ text, icon, link }, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={() => onLinkClick(link)}>
                  <ListItemIcon sx={{ color: "text.primary" }}>
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <List>
            {publicPages.map(({ text, icon, link }, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={() => onLinkClick(link)}>
                  <ListItemIcon sx={{ color: "text.primary" }}>
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Drawer>
  );
};

export default SideDrawer;
