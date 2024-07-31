import { createTheme, Theme } from '@mui/material/styles';

/**
 * Creates a light theme using Material-UI's createTheme function.
 *
 * @returns {Theme} The light theme object.
 */
const lightTheme: Theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#ffffff',
      paper: '#f7f7f7',
    },
    text: {
      primary: '#000000',
      secondary: '#555555',
    },
  },
});

/**
 * Creates a dark theme using Material-UI's createTheme function.
 *
 * @returns {Theme} The dark theme object.
 */
const darkTheme: Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
    text: {
      primary: '#ffffff',
      secondary: '#bbbbbb',
    },
  },
});

export { lightTheme, darkTheme };
