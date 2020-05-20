import React from 'react';
import { Link as RouterLink, } from 'react-router-dom';
import { styled, makeStyles } from '@material-ui/core/styles';
import { Typography, Link } from '@material-ui/core';

interface LinkProps {
  children?: React.ReactNode;
  to: string;
}

const useStyles = makeStyles({
  title: {
    textDecoration: 'none',
  },
});

const TitleTypography = styled(Typography)({
  fontFamily: 'CookieRunBold',
  fontSize: '45px',
  color: 'white',
});

const Title: React.FC = () => {
  const styles = useStyles();
  return (
    <Link component={RouterLink} to='/' underline='none' className={styles.title}>
      <TitleTypography variant='inherit' paragraph={true}>
        <img src='./icon.png' alt='노력의 산물' />
        녜힁 닷넷
      </TitleTypography>
    </Link>
  );
};

export default Title;