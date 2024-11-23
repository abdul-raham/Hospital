const theme = createTheme({
  palette: {
    primary: { main: "#2c3e50", contrastText: "#ffffff" },
    secondary: { main: "#e74c3c", contrastText: "#ffffff" },
    background: {
      default: "#ecf0f1",
      paper: "#ffffff",
    },
    text: {
      primary: "#34495e",
      secondary: "#7f8c8d",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: { fontWeight: 600, color: "#2c3e50" },
    body1: { color: "#34495e" },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#2c3e50",
          color: "#ecf0f1",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});
