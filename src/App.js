import { Layout } from "./components/Layout";
import { AppRouter } from "./routers/AppRouter";
import { ContextAuthProvider } from "./context/authContext";
import { ThemeProvider } from "@emotion/react";
import { darkTheme } from "./themes/dark-theme";
import { CssBaseline } from "@mui/material";
import { ContextUIProvider } from "./context/UIContext";
import { ContextCartProvider } from "./context/cartContext";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ContextUIProvider>
        <ContextAuthProvider>
          <ContextCartProvider>
            <SnackbarProvider maxSnack={3}>
              <AppRouter />
            </SnackbarProvider>
          </ContextCartProvider>
        </ContextAuthProvider>
      </ContextUIProvider>
    </ThemeProvider>
  );
}

export default App;
