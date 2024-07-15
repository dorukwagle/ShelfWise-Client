import { ThemeProvider, createTheme } from "@mui/material/styles";
import App from "./App";
import { createContext, useMemo, useState } from "react";
import { PaletteMode } from "@mui/material";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });


const getStoredTheme = () => {
  const storedTheme = localStorage.getItem("theme");
  const theme = (storedTheme && storedTheme  === "light") ? "light" : "dark";

  localStorage.setItem("theme", theme);
  return theme;  
}

export default function ThemedApp() {
  const [mode, setMode] = useState<"light" | "dark">(getStoredTheme());
  const colorMode = useMemo(
    () => ({
      toggleColorMode: (mode: "light" | "dark") => {
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
