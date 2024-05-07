import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(133, 179, 219)",
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
