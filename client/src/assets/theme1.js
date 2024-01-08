import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins',
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      extraLight: '#FFFFFF',
      light: '#FFFFFF',
      main: '#FFFFFF',
      dark: 'black',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      //   light: '#0066ff',
      main: '#FFFFFF',
      // dark: will be calculated from palette.secondary.main,
      //   contrastText: '#ffcc00',
    },
  },
  components: {
    // Name of the component
  },
});

export default theme;