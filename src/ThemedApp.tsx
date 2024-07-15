import { ThemeProvider, createTheme } from "@mui/material/styles";
import App from "./App";
import { createContext, useMemo, useState } from "react";
import { amber, deepOrange, grey } from "@mui/material/colors";


type ColorMode = "dark" | "light";

export const ColorModeContext = createContext({ toggleColorMode: (_: ColorMode) => {} });


const getStoredTheme = () => {
  const storedTheme = localStorage.getItem("theme");
  const theme = (storedTheme && storedTheme  === "light") ? "light" : "dark";

  localStorage.setItem("theme", theme);
  return theme;  
}

export default function ThemedApp() {
  const [mode, setMode] = useState<ColorMode>(getStoredTheme());
  const colorMode = useMemo(
    () => ({
      toggleColorMode: (mode: ColorMode) => {
        setMode(mode);
      },
    }),
    []
  );

  const dark = {
    primary: {
      main: "#3f51bf",
    },
    secondary: {
      main: "#2196f3",
    },
    text: {
      primary: "#fff",
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
    },
    background: {
      default: "#0e161a",
      paper: "#26262a",
    },
    divider: ""
  };

  const light = {
    primary: {
      main: "#304ffe",
    },
    secondary: {
      main: "#7c4dff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.6)",
      disabled: "rgba(0, 0, 0, 0.38)",
    },
    background: {
      default: "#d0d0d0",
      paper: "#e0e0e0",
    },
    divider: "rgba(0, 0, 0, 0.22)"
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light" ? light : dark),
          text: {
            primary: "#fff",
            secondary: grey[500],
          },
        },
        typography: {
          button: {
            textTransform: "none",
            fontWeight: "bold"
          },
        }
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}