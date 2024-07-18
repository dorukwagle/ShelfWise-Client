import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { BookOnline, Home, Info } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

interface Props {
  isOpen?: boolean;
  onNavigate?: () => void;
}

const SideDrawer = ({isOpen=false, onNavigate}: Props) => {
  const navigate = useNavigate();

  const publicPages = [
    {text: "Home", link: "/", icon: <Home /> }, 
    {text: "Online Books", link: "/online-books", icon: <BookOnline />},
    {text: "About", link: "/about", icon: <Info />}
  ];

const privatePages = [
    {text: "Home", link: "", icon: <Home />}, 
    {text: "Online Books", link: "", icon: <BookOnline />},
    {text: "About", link: "", icon: <Info />}
  ];

  const onLinkClick = (link: string) => {
    navigate(link);
    onNavigate && onNavigate();
  }

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
          },
          zIndex: 0
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {privatePages.map(({text, icon, link}, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton  onClick={() => onLinkClick(link)}>
                  <ListItemIcon>
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {publicPages.map(({text, icon, link}, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={() => onLinkClick(link)} >
                  <ListItemIcon>
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
  );
}

export default SideDrawer;