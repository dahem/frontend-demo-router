import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import ChooseThemeProvider, { ThemeContext } from 'store/contexts/theme';

import store from './store';
import Routes from './routes';
import darkTheme from './theme/dark';
import lightTheme from './theme/light';

function App() {
  return (
    <ChooseThemeProvider>
      <ThemeContext.Consumer>
        {(consumer) => (
          <ThemeProvider theme={consumer.theme === 'dark' ? darkTheme : lightTheme}>
            <Provider store={store}>
              <div>
                <Routes />
              </div>
            </Provider>
          </ThemeProvider>
        )}

      </ThemeContext.Consumer>
    </ChooseThemeProvider>
  );
}

export default App;
