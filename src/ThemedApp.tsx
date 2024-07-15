import { ThemeProvider, createTheme } from "@mui/material/styles";
import App from "./App";
import { createContext, useMemo, useState } from "react";


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

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
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
