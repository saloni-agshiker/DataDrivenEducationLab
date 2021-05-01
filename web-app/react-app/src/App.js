import './App.css';
import {HomePage} from './components/pages/HomePage';
import {Dashboard} from './components/pages/Dashboard';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

function App() {
  return (
    <Router>
          <Switch>
              <Route exact path='/' component={HomePage}/>
              <Route path='/dashboard/' component={Dashboard}/>
          </Switch>
    </Router>
  );
}

export default App;
