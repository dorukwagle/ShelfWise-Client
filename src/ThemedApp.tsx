import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createContext, useMemo, useState } from "react";
import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

type ColorMode = "dark" | "light";

export const ColorModeContext = createContext({
  toggleColorMode: (_: ColorMode) => {},
  mode: "light" as ColorMode,
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
      toggleColorMode: (newMode: ColorMode) => {
        setMode(newMode);
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                primary: { main: "#0066cc" },
                secondary: { main: "#ff6600" },
                background: {
                  default: "#f5f5f5",
                  paper: "#ffffff",
                },
                text: {
                  primary: "#333333",
                  secondary: "#666666",
                },
              }
            : {
                primary: { main: "#4a90e2" },
                secondary: { main: "#ff8c00" },
                background: {
                  default: "#1a1a1a",
                  paper: "#26262a",
                },
                text: {
                  primary: "#e0e0e0",
                  secondary: "#b3b3b3",
                },
              }),
        },
        typography: {
          button: {
            textTransform: "none",
            fontWeight: "bold",
          },
          h1: {
            color: mode === "light" ? "#333333" : "#e0e0e0",
          },
          h2: {
            color: mode === "light" ? "#333333" : "#e0e0e0",
          },
          h3: {
            color: mode === "light" ? "#333333" : "#e0e0e0",
          },
        },
        shape: {
          borderRadius: 20,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                color: "#ffffff", // Button text color
                backgroundColor: mode === "light" ? "#0066cc" : "#4a90e2", // Primary button color
                "&:hover": {
                  backgroundColor: mode === "light" ? "#004c99" : "#357ab7", // Hover state
                },
              },
            },
          },
          MuiInputBase: {
            styleOverrides: {
              input: {
                color: mode === "light" ? "#333333" : "#e0e0e0", // Input text color
              },
            },
          },
          MuiInputLabel: {
            styleOverrides: {
              root: {
                color: mode === "light" ? "#333333" : "#e0e0e0", // Input label color
              },
            },
          },
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: mode === "light" ? "#cccccc" : "#444444", // Border color
                },
                "&:focus .MuiOutlinedInput-notchedOutline": {
                  borderColor: mode === "light" ? "#0066cc" : "#4a90e2", // Focus border color
                },
              },
            },
          },
          MuiTypography: {
            styleOverrides: {
              root: {
                color: mode === "light" ? "#333333" : "#e0e0e0", // General text color
              },
            },
          },
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
