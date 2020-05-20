import React from 'react';
import { Link } from 'react-router-dom';
import { Title, Menu } from '../containers';
import './Header.css';

const Header: React.FC = () => {
  return (
    <div>
      <Title />
      <Menu />
    </div>
  );
};

export default Header;