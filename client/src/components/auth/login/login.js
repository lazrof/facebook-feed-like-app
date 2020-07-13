import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logIn, authenticateUser } from '../../../redux/actions/user/actions';
import Navbar from '../../navbar/navbar';
import MessageAlert from '../../message-alert/message-alert';
import {
    Grid,
    Form,
    Segment,
    Button,
    Header,
    Message,
    Icon
} from "semantic-ui-react";
import './login.scss';

const LogIn = (props) => {

  const [ userData , setUserData ] = useState({
    email:null,
    password:null
  });

  const [localErrors, setLocalErrors] = useState(null)

  useEffect(() => {
    props.authenticateUser();

    if(props.isAuthenticated){
      props.history.push('/posts');
    }

  });

  const handleChange = event => {
    event.preventDefault();
    setUserData({
        ...userData,
        [event.target.name]: event.target.value
    });
  };

  const handleSubmit = () => {

    if ( !userData.email || !userData.password ){
      let err = []
      for (let i in userData){
        if (!userData[i]){
          err.push(i)
        }
      }
      setLocalErrors(err);

    } else {
      setLocalErrors([]);
      props.logIn(userData);
    }
      
  }

  const Alerts = () => {

    if (localErrors != null && localErrors.length > 0){
      let messageErrors = []
      localErrors.forEach(err => {
        messageErrors.push(
          {message: `${err} field is required`, status:'error'}
        )
      });
      return <MessageAlert alerts={messageErrors} /> 

    } else if(props.serverResponse.status == "error") {
      let serverErrors = [{message: props.serverResponse.message , status:'error'}];
      return <MessageAlert alerts={serverErrors} />

    } else if (props.registerSuccess && props.serverResponse) {
      let registerAlert = [{message: props.serverResponse.message , status:'success'}]
      return <MessageAlert alerts={registerAlert} />

    } else {
      return ''
    }
  }

  return(
    <> 
      <Navbar />
      <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" icon color="violet" textAlign="center">
          <Icon name="users" color="violet" />

          Login
        </Header>
        <Form onSubmit={handleSubmit} size="large">
          <Segment stacked>
            <input 
              type="email" 
              placeholder="Email Address" 
              name="email"
              onChange={handleChange}
            ></input>
            <input 
              type="password" 
              placeholder="Password" 
              name="password"
              onChange={handleChange}
            ></input>
            <Button
              color="violet"
              fluid
              size="large"
            >
              Submit
            </Button>
          </Segment>
        </Form>

        <Alerts />

        <Message>
          Don't have an account? <Link to="/register">Register</Link>
        </Message>
      </Grid.Column>
    </Grid>
  </>
  )
}

const mapStateToProps = state => {
  return {
    serverResponse: state.userReducer.response,
    isAuthenticated: state.userReducer.authenticated,
    registerSuccess: state.userReducer.registerSuccess
  };
}

const mapDispatchToProps = {
  logIn,
  authenticateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);