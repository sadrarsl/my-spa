import React, { createContext, useState, useContext, ReactNode } from "react";
import {
  createTheme,
  Direction,
  ThemeProvider as MuiThemeProvider,
  useTheme,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useTranslation } from "react-i18next";

interface ThemeContextType {
  mode: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Custom hook to use the ThemeContext.
 * @returns {ThemeContextType} The current theme context value.
 * @throws {Error} If used outside of a ThemeProvider.
 */
export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

/**
 * ThemeProvider component that provides theme state and toggle functionality to its children.
 * @param {Object} props - The props for the ThemeProvider.
 * @param {ReactNode} props.children - The children components.
 * @returns {JSX.Element} The ThemeProvider component.
 */
const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const { i18n } = useTranslation();

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#dc004e",
      },
    },
    direction: document.dir as Direction,
  });

  /**
   * Toggles the theme mode between light and dark.
   */
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
