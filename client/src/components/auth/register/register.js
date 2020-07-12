import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { registerUser } from '../../../redux/actions/user/actions';
import { Link } from "react-router-dom";
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
import './register.scss';

const Register = (props) => {
  const [ userData , setUserData ] = useState({
    name:null,
    email:null,
    password:null
  });

  const [localErrors, setLocalErrors] = useState(null)
  
  if(props.isAuthenticated){
    props.history.push('/posts');
  }

  const handleChange = event => {
    event.preventDefault();
    setUserData({
        ...userData,
        [event.target.name]: event.target.value
    });
  };

  const handleSubmit = () => {

    if (!userData.name || !userData.email || !userData.password ){
      let err = []
      for (let i in userData){
        if (!userData[i]){
          err.push(i)
        }
      }
      setLocalErrors(err);

    } else {
      setLocalErrors([]);
      props.registerUser(userData);
      props.history.push('/');
    }
      
  }

  const ErrorsAlerts = () => {

    if (!localErrors){
      return ''

    } else if(props.serverResponse.status == 'error') {
      let serverErrors = [{message: props.serverResponse.message , status:'error'}];
      return <MessageAlert alerts={serverErrors} />

    } else {
      let messageErrors = []
      localErrors.forEach(err => {
        messageErrors.push(
          {message: `${err} field is required`, status:'error'}
        )
      });

      return <MessageAlert alerts={messageErrors} />
      
    }
  }

    return(
        <>
        <Navbar />
        <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="violet" textAlign="center">
            <Icon name="users" color="violet" />

            Register
          </Header>
          <Form size="large">
            <Segment stacked>
              <input 
                type="text" 
                placeholder="Name" 
                name="name"
                onChange={handleChange}
              ></input>
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
                onClick={handleSubmit}
                color="violet"
                fluid
                size="large"
              >
                Submit
              </Button>
            </Segment>
          </Form>

          <ErrorsAlerts />

          <Message>
            Already have an account? <Link to="/">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
        </>
    )
}

const mapStateToProps = state => {
  return {
    registerSuccess: state.userReducer.registerSuccess,
    serverResponse: state.userReducer.response,
    isAuthenticated: state.userReducer.authenticated
  };
}

const mapDispatchToProps = {
  registerUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);