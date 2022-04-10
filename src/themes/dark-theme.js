import { grey, red, orange, blue, green } from "@mui/material/colors";

const { createTheme } = require("@mui/material");

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: grey[800],
    },
    primary: {
      main: "#ca562c",
    },
    secondary: {
      main: blue[200],
    },
    error: {
      main: red[400],
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: "#000",
        },
      },
    },
  },
});
