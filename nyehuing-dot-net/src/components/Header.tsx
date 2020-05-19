import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import './Header.css';

interface Menu {
  to: string;
  value: string;
};

const MenuItem: React.FC<Menu> = (props) => {
  return (
    <Link to={props.to} className={`menu-item`}>
      {props.value}
    </Link>
  );
};

const Header: React.FC = () => {
  return (
    <div className='header'>
      <Link to="/" className='logo'>
        <img src='./icon.png' id='icon' />
        녜힁 닷넷
      </Link>
      <div className='menu'>
        <MenuItem to='/' value='홈' />
        <MenuItem to='/nyehuing_maker' value='녜힁 제조기' />
        <MenuItem to='/cal' value='결정석 계산기' />
      </div>
    </div>
  );
};

export default Header;