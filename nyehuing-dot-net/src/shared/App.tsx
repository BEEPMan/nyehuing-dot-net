import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from '../pages/MainPage'

import './App.css'

const App: React.FC = (props) => {
  return (
    <div>
      <MainPage />
    </div>
  )
};

export default App;