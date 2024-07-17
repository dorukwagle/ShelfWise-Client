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

const drawerWidth = 240;

interface Props {
  isOpen?: boolean;
}

const SideDrawer = ({isOpen=false}: Props) => {
  const publicPages = [
    {text: "Home", icon: <Home />}, 
    {text: "Online Books", icon: <BookOnline />},
    {text: "About", icon: <Info />}
  ];

const privatePages = [
    {text: "Home", icon: <Home />}, 
    {text: "Online Books", icon: <BookOnline />},
    {text: "About", icon: <Info />}
  ];


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
            {privatePages.map(({text, icon}, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton>
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
            {publicPages.map(({text, icon}, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton>
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