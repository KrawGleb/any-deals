import { createTheme } from "@mui/material";
import { ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#efecca",
    },
    secondary: {
      main: "#a9cbb7",
    },
    success: {
      main: "#abe188",
    },
    error: {
      main: "#f78e69",
    },
    warning: {
      main: "#ed6c02",
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
