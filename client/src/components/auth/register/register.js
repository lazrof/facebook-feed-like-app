import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { registerUser } from '../../../redux/actions/user/actions';
import { Link } from "react-router-dom";
import Navbar from '../navbar/navbar';
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

  if(props.serverResponseStatus){
    props.history.push('/');
  }


  const handleChange = event => {
    event.preventDefault();
    setUserData({
        ...userData,
        [event.target.name]: event.target.value
    });

  };

  const displayErrors = errors =>{
    return errors.map((error) => <p key={error}>Fill {error} field.</p>);
  }


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
    }
      
  }
    if (!props.serverResponseStatus){
    return(
        <>
        <Navbar />
        <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="grey" textAlign="center">
            <Icon name="users" color="grey" />

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
                placeholder="Password Confirmation" 
                name="password"
                onChange={handleChange}
              ></input>

              <Button
                /* disabled={false}
                className={false ? "loading" : ""} */
                onClick={handleSubmit}
                color="grey"
                fluid
                size="large"
              >
                Submit
              </Button>
            </Segment>
          </Form>

          { localErrors ?  <Message error> {displayErrors(localErrors)} </Message> : '' }

          <Message>
            Already have an account? <Link to="/register">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
        </>
    )
    } else {
      return ''
    }
}

const mapStateToProps = state => {
  return {
    serverResponseStatus: state.userReducer.responseStatus,
    serverResponseMessage: state.userReducer.responseMessage,
    isAuthenticated: state.userReducer.authenticated
  };
}

const mapDispatchToProps = {
  registerUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);

//export default Register;