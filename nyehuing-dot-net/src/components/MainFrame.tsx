import React from 'react';
import {
  Link,
} from 'react-router-dom';
import {
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import MainMenu from './MainMenu';
import MainPage from './MainPage';
import './public/Style.css';

const useStyle = makeStyles((theme: Theme) => 
  createStyles({
    MainTitle: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'CookieRunBold',
      color: '#fff',
      fontSize: 45,
    },
  }),
);

const MainFrame: React.FC = () => {

  const classes = useStyle();

  return (
    <div>
      <Link to="/" className={classes.MainTitle}>
        <img src='./icon.png' id='icon'/>
        녜읭 닷넷
      </Link>
      <MainMenu></MainMenu>
      <MainPage></MainPage>
    </div>
  )
};

export default MainFrame;
