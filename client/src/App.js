import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';
import LogIn from './components/auth/login/login';
import Register from './components/auth/register/register';
import "semantic-ui-css/semantic.min.css";
import './App.scss';

function App(props) {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={LogIn} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/home" component={Register} />
        </Switch>
      </Router>
    </div>
  );
}


export default App;