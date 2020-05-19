import React from 'react';
import { Link } from 'react-router-dom';

const MainMenu: React.FC = () => {
  return (
    <div className='MainMenu'>
      <div className='MainMenuLink'>
        <Link to="/">홈</Link>
        <Link to="/nyehuing_maker">녜힁</Link>
      </div>
    </div>
  );
};

export default MainMenu;
