import React from 'react';
import { AppBar, Tabs, Tab, makeStyles } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { pink } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: pink[300],
    },
    secondary: {
      main: '#FFD700'
    }
  },
});

const useStyle = makeStyles({
  Tab: {
    fontFamily: 'CookieRunBold',
    fontSize: '20px',
    color: 'white'
  },
  Bar: {
    textAlign: 'center',
  }
});

const Menu: React.FC = () => {
  const style = useStyle()
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppBar position='static'>
          <Tabs value={value} onChange={handleChange} centered={true}>
            <Tab label='홈' component={Link} to='/' className={style.Tab} />
            <Tab label='녜힁 제조기' component={Link} to='/nyehuing' className={style.Tab} />
            <Tab label='결정석 계산기' component={Link} to='/calculator' className={style.Tab} />
          </Tabs>
        </AppBar>
      </ThemeProvider>
    </div>
  );
};

export default Menu;