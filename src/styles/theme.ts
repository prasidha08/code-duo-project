import { createTheme } from "@mui/material";

let theme = createTheme({
  palette: {
    primary: {
      main: "rgb(133, 179, 219)",
    },
  },

  typography: {
    allVariants: {
      letterSpacing: 0.2,
    },
    h1: {
      fontSize: 20,
      letterSpacing: 1,
      fontWeight: "bolder",
    },
    h2: {
      fontSize: 16,
      wordSpacing: 2,
      letterSpacing: 1,
      fontWeight: "bold",
    },
    h3: {
      fontSize: 14,
      fontWeight: "2px",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          minHeight: 300,
        },
      },
    },
  },
});

export default theme;

export const whitesmoke = "#F5F5F5";
