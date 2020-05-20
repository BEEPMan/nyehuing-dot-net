import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, Nyehuing } from '../containers';

const Body: React.FC = () => {
  return (
    <div className='body'>
      <Switch>
        <Route path="/nyehuing_maker" component={Nyehuing} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
};

export default Body;