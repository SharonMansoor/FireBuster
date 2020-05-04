import { createMuiTheme } from '@material-ui/core';
import amber from '@material-ui/core/colors/amber'

const theme = createMuiTheme({
    palette: {
        primary: {
          main: '#43a047',
        },
        secondary: amber,
      },
  });

export default theme;