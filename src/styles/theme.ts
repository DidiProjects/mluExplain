"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2D2D2D",
      light: "#4A4A4A",
      dark: "#1A1A1A",
    },
    secondary: {
      main: "#E85D3A",
      light: "#FF7F5C",
      dark: "#C44425",
    },
    background: {
      default: "#FDF9F3",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#2D2D2D",
      secondary: "#6B6B6B",
    },
  },
  typography: {
    fontFamily: '"Caveat", "Patrick Hand", "Inter", sans-serif',
    h1: {
      fontFamily: '"Caveat", cursive',
      fontSize: "3rem",
      fontWeight: 700,
      letterSpacing: "0.01em",
    },
    h2: {
      fontFamily: '"Caveat", cursive',
      fontSize: "2rem",
      fontWeight: 700,
    },
    h3: {
      fontFamily: '"Caveat", cursive',
      fontSize: "1.6rem",
      fontWeight: 600,
    },
    body1: {
      fontFamily: '"Inter", sans-serif',
      fontSize: "1.05rem",
      lineHeight: 1.7,
      color: "#6B6B6B",
    },
    body2: {
      fontFamily: '"Inter", sans-serif',
      fontSize: "0.95rem",
      lineHeight: 1.6,
    },
    button: {
      fontFamily: '"Inter", sans-serif',
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: "2px solid #2D2D2D",
          boxShadow: "4px 4px 0px #2D2D2D",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          "&:hover": {
            transform: "translate(-2px, -2px)",
            boxShadow: "6px 6px 0px #2D2D2D",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 4,
          border: "2px solid #2D2D2D",
          boxShadow: "3px 3px 0px #2D2D2D",
          "&:hover": {
            transform: "translate(-1px, -1px)",
            boxShadow: "4px 4px 0px #2D2D2D",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          border: "1.5px solid #2D2D2D",
          borderRadius: 4,
        },
      },
    },
  },
});

export default theme;
