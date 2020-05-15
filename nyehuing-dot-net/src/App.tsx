import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import MainFrame from './components/MainFrame';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={MainFrame} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
