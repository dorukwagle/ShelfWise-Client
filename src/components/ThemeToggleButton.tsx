import React, { useContext } from "react";
import { IconButton } from "@mui/material";
import { ColorModeContext } from "../ThemedApp";
import LightModeIcon from "@mui/icons-material/WbSunny"; // Light mode icon
import DarkModeIcon from "@mui/icons-material/NightsStay"; // Dark mode icon

const ThemeToggleButton: React.FC = () => {
  const colorMode = useContext(ColorModeContext);
  
  const handleToggle = () => {
    colorMode.toggleColorMode(colorMode.mode === "dark" ? "light" : "dark");
    localStorage.setItem("theme", colorMode.mode === "dark" ? "light" : "dark");
  };

  return (
    <IconButton onClick={handleToggle} color="inherit">
      {colorMode.mode === "dark" ? (
        <LightModeIcon sx={{ color: "text.primary" }} /> // Light mode icon
      ) : (
        <DarkModeIcon sx={{ color: "text.primary" }} /> // Dark mode icon
      )}
    </IconButton>
  );
};

export default ThemeToggleButton;