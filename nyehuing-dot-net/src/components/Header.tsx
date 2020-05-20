import React from 'react';
import { Link } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import './Header.css';

const headerStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      textAlign: 'center',
    },
    logo: {
      fontFamily: 'CookieRunBold',
      fontSize: '3.0rem',
      textAlign: 'center',
      color: 'white',
      lineHeight: '5.5rem',
    },
    menuItem: {
      display: 'inline-block',
      textAlign: 'center',
      lineHeight: '3.0rem',
      width: '33.33333%',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
    },
    menuTab: {
      fontFamily: 'CookieRunRegular',
      textAlign: 'center',
      fontSize: '1.5rem',
      color: 'white',
    },
    menu: {
      backgroundColor: 'peru',
      textAlign: 'left',
    },
  }),
);

interface Menu {
  to: string;
  value: string;
};

const MenuItem: React.FC<Menu> = (props: Menu) => {
  const style = headerStyles();
  return (
    <Link to={props.to} className={style.menuItem}>
      <Tab label={props.value} className={style.menuTab} />
    </Link>
  );
};

const Header: React.FC = () => {
  const style = headerStyles();
  return (
    <div className={style.header}>
      <Link to="/" className={style.logo}>
        <img src='./icon.png' id='icon' />
        녜힁 닷넷
      </Link>
      <div className={style.menu}>
        <MenuItem to='/' value='홈' />
        <MenuItem to='/nyehuing_maker' value='녜힁 제조기' />
        <MenuItem to='/cal' value='결정석 계산기' />
      </div>
    </div>
  );
};

export default Header;