
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const ThemeContext = React.createContext();

function Theme(props) {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

Theme.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Theme;
