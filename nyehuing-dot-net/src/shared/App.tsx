import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../components/Header'
import { Home, Nyehuing } from '../containers'

import './App.css'

const App: React.FC = (props) => {
  return (
    <div>
      <Header />
      {}
      <div className='body'>
        <Switch>
          <Route path="/nyehuing_maker" component={Nyehuing} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </div>
  )
};

export default App;