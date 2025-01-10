"use client";
import { grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",

    text: {
      primary: grey[400],
    },
  },
});

export default theme;
