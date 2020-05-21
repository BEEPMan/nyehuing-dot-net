import React from 'react';
import { Title, Menu } from '../containers';
import arcana from '../arcana.jpg';
import eurel from '../eurel.jpg';

const Header: React.FC = () => {
  const themeValue: number = Math.floor(Math.random() * 2) + 1;
  let backgroundImage: string = '';
  switch (themeValue) {
    case 1:
      backgroundImage = arcana;
      break;
    case 2:
      backgroundImage = eurel;
    default:
      break;
  }
  console.log(themeValue);
  document.body.style.backgroundImage = `url(${backgroundImage})`;
  return (
    <div>
      <Title themeValue={themeValue} />
      <Menu />
    </div>
  );
};

export default Header;