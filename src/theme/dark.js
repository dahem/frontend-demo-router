import { createMuiTheme } from '@material-ui/core/styles';
import colors from './colors';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
  },
  palette: {
    type: 'dark',
    ...colors.dark,
  },
});

export default theme;
