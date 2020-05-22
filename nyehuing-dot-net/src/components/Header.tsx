import React from 'react';
import { Menu } from '../containers';
import arcana from '../arcana.jpg';
import eurel from '../eurel.jpg';

const SetBackground = (themeValue: number) => {
  let backgroundImage: string = '';
  switch (themeValue) {
    case 1:
      backgroundImage = arcana;
      break;
    case 2:
      backgroundImage = eurel;
      break;
    default:
      break;
  }
  console.log(themeValue);
  document.body.style.backgroundImage = `url(${backgroundImage})`;
}

const Header: React.FC = () => {
  const themeValue: number = Math.floor(Math.random() * 2) + 1;
  SetBackground(themeValue);
  return (
    <div>
      <Menu />
    </div>
  );
};

export default Header;