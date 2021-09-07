import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows.js';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    
    background: {
      default: 'white',
      paper: colors.common.white
    },
    primary: {
      contrastText: '#ffffff',
      main: '#5664d2'
    },
    text: {
      primary: '#172b4d',
      secondary: '#6b778c'
    }
  },
  
  shadows,
  typography
});

export default theme;