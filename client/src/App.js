import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';
import LogIn from './components/auth/login/login';
import Register from './components/auth/register/register';
import {logIn, logOut } from './redux/actions/user/actions';
import "semantic-ui-css/semantic.min.css";
import './App.scss';

function App(props) {

  // componentDidMount
  //useEffect(() => console.log('mounted'), []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={LogIn} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

// const mapStateToProps = state => {
//   return {
//     currentUser: state.userReducer.currentUser,
//   }
// };

// const mapDispatchToProps = {
//   logIn,
//   logOut
// }

//export default connect(mapStateToProps, mapDispatchToProps)(App);

export default App;