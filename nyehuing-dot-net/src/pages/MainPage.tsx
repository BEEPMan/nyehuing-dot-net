import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Header, Body } from '../components';

const useStyles = makeStyles({
  title: {
    textAlign: 'center',
  }
});

const MainPage: React.FC = () => {
  const style = useStyles();
  return (
    <div className={style.title}>
      <Header />
      <Body />
    </div>
  );
};

export default MainPage;