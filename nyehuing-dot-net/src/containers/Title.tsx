import React from 'react';
import { Link as RouterLink, } from 'react-router-dom';
import { styled, makeStyles } from '@material-ui/core/styles';
import { Typography, Link } from '@material-ui/core';
import eurel_icon from './eurel_icon.png';

interface TitleProps {
  children?: React.ReactNode;
  themeValue: number;
};

const useStyles = makeStyles({
  title: {
    textDecoration: 'none',
  },
  img: {
    verticalAlign: 'middle',
    paddingRight: '4px',
  },
});

const TitleTypography = styled(Typography)({
  fontFamily: 'CookieRunBold',
  fontSize: '45px',
  color: 'white',
  verticalAlign: 'middle',
  paddingTop: '10px',
});

const Title: React.FC<TitleProps> = (props) => {
  const styles = useStyles();
  return (
    <Link component={RouterLink} to='/' underline='none' className={styles.title}>
      <TitleTypography variant='inherit' paragraph={true}>
        <img src={eurel_icon} alt='노력의 산물' className={styles.img} />
        녜힁 닷넷
      </TitleTypography>
    </Link>
  );
};

export default Title;