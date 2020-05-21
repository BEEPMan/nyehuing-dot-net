import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Title, Menu } from '../containers';
import background from '../arcana.jpg';

const Header: React.FC = () => {
  return (
    <div>
      <Title />
      <Menu />
    </div>
  );
};

export default Header;