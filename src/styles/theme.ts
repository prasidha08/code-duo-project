import { createTheme } from "@mui/material";

let theme = createTheme({
  palette: {
    primary: {
      main: "rgb(133, 179, 219)",
    },
  },

  typography: {
    h1: {
      fontSize: 20,
      letterSpacing: 1,
      fontWeight: "bolder",
    },
    h2: {
      fontSize: 16,
      wordSpacing: 2,
      letterSpacing: 1,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
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
