import { Box, Button } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext } from "../ThemedApp";
import NavBar from "../components/NavBar";
import DemoCard from "../components/DemoCard";
import SideDrawer from "../components/SideDrawer";

const Layout = () => {
  const colorMode = useContext(ColorModeContext);
  const [isDrawserOpen, setDrawerOpen] = useState<boolean>(false);

  return (
    <Box>
      <NavBar 
      toggleOnChange={colorMode.toggleColorMode} 
      onMenuBtnClick={() => setDrawerOpen(!isDrawserOpen)}
      />
      <SideDrawer isOpen={isDrawserOpen}/>
      <Button variant="contained" color="primary" sx={{ mx: 5, my: 5 }}>
        Hello test
      </Button>
      <DemoCard />
    </Box>
  );
};

export default Layout;
