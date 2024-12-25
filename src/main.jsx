import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@fontsource/ibm-plex-mono";
import { createTheme, ThemeProvider } from "@mui/material";
import {
 
  deepOrange,

} from "@mui/material/colors";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: deepOrange,
    background: {
      default: "#111111",
    },
  },
  typography: {
    fontFamily: "IBM Plex Mono",
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <App />
      </LocalizationProvider>
    </ThemeProvider>
  </StrictMode>
);
