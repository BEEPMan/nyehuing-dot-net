import React from 'react';
import MainMenu from './MainMenu';
import MainPage from './MainPage';
import './public/Style.css';

function MainFrame() {
  return (
    <div>
      <a href="/">
        <div className='MainTitle'>
          <img src='./icon.png' id='icon'></img>
          녜힁 닷넷
        </div>
      </a>
      <MainMenu></MainMenu>
      <MainPage></MainPage>
    </div>
  )
}

export default MainFrame;