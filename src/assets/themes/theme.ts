import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#272633",
      light: "#5A5568",
      dark: "#131215",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#5A5568",
      light: "#7A748A",
      dark: "#2C2933",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#D14343",
      light: "#E47575",
      dark: "#942F2F",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#E6A23C",
      light: "#F0BB6C",
      dark: "#B7862C",
      contrastText: "#1A1620",
    },
    info: {
      main: "#3B82F6",
      light: "#8BB7FF",
      dark: "#245EC7",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#22C55E",
      light: "#6EE3A4",
      dark: "#158248",
      contrastText: "#1A1620",
    },
    background: {
      default: "#F8F9FB",
      paper: "#ececf3",
    },
    text: {
      primary: "#1A1A1A",
      secondary: "#040404",
      disabled: "#9CA3AF",
    },
    divider: "#a5b70e",
    action: {
      active: "#272633",
      hover: "rgba(39, 38, 51, 0.08)",
      selected: "rgba(39, 38, 51, 0.14)",
      disabled: "rgba(39, 38, 51, 0.26)",
      disabledBackground: "rgba(39, 38, 51, 0.08)",
    },
  },
  typography: {
    fontFamily: [
      '"Inter","DM Sans","Playwrite GB J", "Roboto", "Helvetica", "Arial", sans-serif',
    ].join(","),
    fontSize: 14,
    htmlFontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
      lineHeight: 1.25,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.35,
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.75,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.57,
    },
    body1: {
      fontSize: "0.9rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.8rem",
      fontWeight: 400,
      lineHeight: 1.43,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 600,
      textTransform: "uppercase",
    },
  },
  shape: {
    borderRadius: 8,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 768,
      lg: 1024,
      xl: 1440,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: "8px 20px",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
        variant: "outlined",
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 1px 4px rgba(0,0,0,0.06)",
          borderRadius: 4,
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderBottom: "1px solid #E5E7EB",
          backgroundColor: "#FFFFFF",
          color: "#1A1A1A",
        },
      },
    },
  },
});

export default theme;
