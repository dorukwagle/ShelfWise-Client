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
        localStorage.setItem("theme", newMode);
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
                primary: { main: "#3B82F6" }, // Bright Blue
                secondary: { main: "#10B981" }, // Emerald Green
                extra: { main: "#F59E0B" }, // Amber
                background: {
                  default: "#F9FAFB", // Light Gray
                  paper: "#FFFFFF", // Pure White
                },
                text: {
                  primary: "#1F2937", // Dark Gray
                  secondary: "#666666",
                },
              }
            : {
                primary: { main: "#3B82F6" }, // Bright Blue
                secondary: { main: "#10B981" }, // Emerald Green
                extra: { main: "#F59E0B" }, // Amber
                background: {
                  default: "#111827", // Dark Gray-Black
                  paper: "#1F2937", // Dark Gray
                },
                text: {
                  primary: "#F9FAFB", // Almost White
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
            color: mode === "light" ? "#1F2937" : "#F9FAFB", // Dark Gray or Almost White
          },
          h2: {
            color: mode === "light" ? "#1F2937" : "#F9FAFB",
          },
          h3: {
            color: mode === "light" ? "#1F2937" : "#F9FAFB",
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
                backgroundColor: mode === "light" ? "#3B82F6" : "#3B82F6", // Primary button color
                "&:hover": {
                  backgroundColor: mode === "light" ? "#2563EB" : "#2563EB", // Hover state
                },
              },
            },
          },
          MuiInputBase: {
            styleOverrides: {
              input: {
                color: mode === "light" ? "#1F2937" : "#F9FAFB", // Input text color
              },
            },
          },
          MuiInputLabel: {
            styleOverrides: {
              root: {
                color: mode === "light" ? "#1F2937" : "#F9FAFB", // Input label color
              },
            },
          },
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: mode === "light" ? "#E5E7EB" : "#444444", // Border color
                },
                "&:focus .MuiOutlinedInput-notchedOutline": {
                  borderColor: mode === "light" ? "#3B82F6" : "#3B82F6", // Focus border color
                },
              },
            },
          },
          MuiTypography: {
            styleOverrides: {
              root: {
                color: mode === "light" ? "#1F2937" : "#F9FAFB", // General text color
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