import { createMuiTheme } from '@material-ui/core';
import amber from '@material-ui/core/colors/amber'

const theme = createMuiTheme({
    palette: {
        primary: {
          main: '#2e7d32',
        },
        secondary: amber,
      },
  });

export default theme;