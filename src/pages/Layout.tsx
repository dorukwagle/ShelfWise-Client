import { Box, Button } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../ThemedApp";
import NavBar from "../components/NavBar";
import DemoCard from "../components/DemoCard";

const Layout = () => {
  const colorMode = useContext(ColorModeContext);

  return (
    <Box>
      <NavBar toggleOnChange={colorMode.toggleColorMode} />
      <Button variant="contained" color="primary" sx={{ mx: 5, my: 5 }}>
        Hello test
      </Button>
      <DemoCard />
    </Box>
  );
};

export default Layout;
