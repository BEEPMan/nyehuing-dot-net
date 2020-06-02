import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { Router } from 'react-router-dom';
import theme from '@src/theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>

      </Router>
    </ThemeProvider>
  );
}

export default App;
