import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createContext, useMemo, useState } from "react";
import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

type ColorMode = "dark" | "light";

export const ColorModeContext = createContext({
  toggleColorMode: (_: ColorMode) => {},
});

const getStoredTheme = () => {
  const storedTheme = localStorage.getItem("theme");
  const theme = storedTheme && storedTheme === "light" ? "light" : "dark";

  localStorage.setItem("theme", theme);
  return theme;
};

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
      main: "#0229d4",
    },
    secondary: {
      main: "#191970",
    },
    background: {
      default: "#0e161a",
      paper: "#26262a",
    },
    text: {
      primary: "#fff",
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
      hint: "rgba(255, 255, 255, 0.5)",
    },
    divider: "rgba(128, 128, 128, 1)",
  };

  const light = {
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#304ffe",
    },
    background: {
      default: "#d0d0d0",
      paper: "#e0e0e0",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
    divider: "rgba(0, 0, 0, 0.22)",
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light" ? light : dark),
        },
        typography: {
          button: {
            textTransform: "none",
            fontWeight: "bold",
          },
        },
        shape: {
          borderRadius: 20,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
