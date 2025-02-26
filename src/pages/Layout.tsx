import { Box } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext } from "../ThemedApp";
import NavBar from "../components/NavBar";
import SideDrawer from "../components/SideDrawer";
import { Outlet } from "react-router-dom";
import NetErrorDialog from "../components/NetErrorDialog";

const Layout = () => {
  const colorMode = useContext(ColorModeContext);
  const [isDrawserOpen, setDrawerOpen] = useState<boolean>(false);

  return (
    <Box>
      <NavBar
        toggleOnChange={colorMode.toggleColorMode}
        onMenuBtnClick={() => setDrawerOpen(!isDrawserOpen)}
      />
      <SideDrawer isOpen={isDrawserOpen} onNavigate={() => setDrawerOpen(false)} />
      <Outlet />
      <NetErrorDialog />
    </Box>
  );
};

export default Layout;
