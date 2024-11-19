import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',  // Customize the primary color
    },
    secondary: {
      main: '#d32f2f',  // Customize the secondary color
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <DoctorDashboard />
    </ThemeProvider>
  );
}
